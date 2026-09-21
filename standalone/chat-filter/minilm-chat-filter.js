const FILTER_LEVELS = {
  off: null,
  low: {
    serious: 0.75,
    toxic: 0.95,
    insult: Number.POSITIVE_INFINITY,
    obscene: Number.POSITIVE_INFINITY,
  },
  medium: {
    serious: 0.60,
    toxic: 0.90,
    insult: Number.POSITIVE_INFINITY,
    obscene: Number.POSITIVE_INFINITY,
  },
  high: {
    serious: 0.45,
    toxic: 0.70,
    insult: 0.80,
    obscene: 0.80,
  },
};

// numeric index so callers can use 0=off, 1=low, 2=medium, 3=high
const FILTER_LEVELS_BY_NUM = [FILTER_LEVELS.off, FILTER_LEVELS.low, FILTER_LEVELS.medium, FILTER_LEVELS.high];

export class MiniLMChatFilter {
  constructor() {
    this.worker = new Worker(new URL('./minilm-classifier.worker.js', import.meta.url), { type: 'module' });
    this.pending = new Map();
    this.queue = [];
    this.activeRequestId = null;
    this.nextRequestId = 1;
    this.filterReady = false;
    this.state = 'loading';
    this.error = null;
    this.ready = new Promise((resolve, reject) => {
      this.resolveReady = resolve;
      this.rejectReady = reject;
    });

    this.worker.addEventListener('message', ({ data }) => {
      if (data.type === 'ready') {
        this.filterReady = true;
        this.state = 'ready';
        this.resolveReady();
        this.processQueue();
        return;
      }

      if (data.type === 'init-error') {
        this.fail(new Error(data.message));
        return;
      }

      const request = this.pending.get(data.id);
      if (!request) return;
      this.pending.delete(data.id);
      this.activeRequestId = null;
      clearTimeout(request.timeout);
      if (data.type === 'result') {
        request.resolve(data.scores);
      } else {
        request.reject(new Error(data.message));
      }
      this.processQueue();
    });

    this.worker.addEventListener('error', ({ message }) => {
      this.fail(new Error(message));
    });
  }

  fail(error) {
    if (this.state === 'terminated' || this.state === 'error') return;
    const wasLoading = this.state === 'loading';
    this.filterReady = false;
    this.state = 'error';
    this.error = error;
    if (wasLoading) this.rejectReady(error);
    this.rejectAll(error);
  }

  rejectAll(error) {
    this.queue.splice(0).forEach(({ reject }) => reject(error));
    this.pending.forEach((request) => {
      clearTimeout(request.timeout);
      request.reject(error);
    });
    this.pending.clear();
    this.activeRequestId = null;
  }

  processQueue() {
    if (!this.filterReady || this.activeRequestId !== null || this.queue.length === 0) return;

    const request = this.queue.shift();
    this.activeRequestId = request.id;
    request.timeout = setTimeout(() => {
      if (!this.pending.has(request.id)) return;
      this.fail(new Error('MiniLM chat filtering timed out.'));
      this.worker.terminate();
    }, 15000);
    this.pending.set(request.id, request);
    this.worker.postMessage({ type: 'classify', id: request.id, message: request.message });
  }

  shouldBlock(scores, filterLevel = 2) {
    const thresholds = typeof filterLevel === 'number'
      ? FILTER_LEVELS_BY_NUM[filterLevel]
      : FILTER_LEVELS[filterLevel];

    if (thresholds === undefined) {
      throw new Error(`Unknown chat filter level: ${filterLevel}`);
    }

    if (!thresholds) return false;

    return scores.some(({ category, score }) =>
      (
        ['threat', 'identity hate', 'severe toxic'].includes(category) &&
        score >= thresholds.serious
      ) ||
      (category === 'toxic' && score >= thresholds.toxic) ||
      (category === 'insult' && score >= thresholds.insult) ||
      (category === 'obscene' && score >= thresholds.obscene)
    );
  }

  // returns 0-3 severity in one pass: 0=clean, 1=low, 2=medium, 3=high
  getSeverity(scores) {
    if (!scores?.length) return 0;
    if (this.shouldBlock(scores, 1)) return 3;
    if (this.shouldBlock(scores, 2)) return 2;
    if (this.shouldBlock(scores, 3)) return 1;
    return 0;
  }

  classify(message) {
    if (this.state === 'error') return Promise.reject(this.error);
    if (this.state === 'terminated') return Promise.reject(new Error('MiniLM chat filter terminated.'));

    const id = this.nextRequestId;
    this.nextRequestId += 1;
    return new Promise((resolve, reject) => {
      this.queue.push({ id, message, resolve, reject, timeout: null });
      this.processQueue();
    });
  }

  terminate() {
    if (this.state === 'terminated') return;
    const error = new Error('MiniLM chat filter terminated.');
    this.filterReady = false;
    const wasLoading = this.state === 'loading';
    this.state = 'terminated';
    if (wasLoading) this.rejectReady(error);
    this.rejectAll(error);
    this.worker.terminate();
  }
}
