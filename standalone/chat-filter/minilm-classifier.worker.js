const MODEL_ID = 'minuva/MiniLMv2-toxic-jigsaw-onnx';
const MODEL_OPTIONS = {
  model_file_name: 'model_optimized',
  subfolder: '',
};
const MAX_MESSAGE_LENGTH = 500;
let classifierPromise;

async function getClassifier() {
  if (!classifierPromise) {
    classifierPromise = (async () => {
      const { env, pipeline } = await import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.2.0/dist/transformers.web.min.js');
      env.allowLocalModels = false;
      env.useBrowserCache = true;
      return pipeline('text-classification', MODEL_ID, MODEL_OPTIONS);
    })();
  }
  return classifierPromise;
}

async function classifyChatMessage(message) {
  const classifier = await getClassifier();
  const input = String(message || '').slice(0, MAX_MESSAGE_LENGTH);
  const scores = await classifier(input, { top_k: 6 });
  return scores
    .map(({ label, score }) => ({
      category: String(label).replaceAll('_', ' ').toLowerCase(),
      score: Number(score),
    }))
    .sort((left, right) => right.score - left.score);
}

getClassifier()
  .then(() => self.postMessage({ type: 'ready' }))
  .catch((error) => self.postMessage({ type: 'init-error', message: error.message }));

self.addEventListener('message', async ({ data }) => {
  if (data.type !== 'classify') return;

  try {
    const scores = await classifyChatMessage(data.message);
    self.postMessage({ type: 'result', id: data.id, scores });
  } catch (error) {
    self.postMessage({ type: 'error', id: data.id, message: error.message });
  }
});
