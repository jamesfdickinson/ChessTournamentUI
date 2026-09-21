# Small Chat Filter Reliability Fix

## Goal
Keep the current chat UI exactly unchanged while making MiniLM filtering stable on older phones and bad internet. Filtering must never block tournament chat, navigation, SignalR, or other tournament features.

## Decisions
- Fail open on model load, inference error, or timeout.
- Keep filtering enabled by default, the current thresholds/model/runtime, current audio behavior, 200-message history cap, and `chatFilterCacheV3` single-key cache.
- No template or CSS changes.
- No automatic worker restart. The existing Retry control is the only retry path.
- Prefer cached results first. History rendering never awaits MiniLM.
- Uncached work starts only after the initial history render and runs serially with browser yields so it does not create CPU spikes.

## Display Rules
### History Batch (`onMessages`)
1. Normalize the newest 200 messages in server order and apply cached levels synchronously.
2. Show cached clean messages immediately and hide cached blocked messages immediately.
3. Show all uncached history immediately. The cache is the only filter applied before first render; never wait for the model before loading history.
4. Complete the array replacement, render, and scroll first. Schedule uncached classification after `$nextTick` plus a short idle/yield delay.
5. Classify uncached history newest-first, one request at a time. Yield between messages. When each result arrives, update visibility without reordering or rebuilding the list.
6. If a newly classified history message is blocked, hide it at that time. Accept that uncached blocked content can be briefly visible because responsiveness and availability take priority.
7. If the filter is unavailable or fails, leave all still-pending history visible and stop AI work.

### Live Messages (`onMessage`)
1. If a cache result exists, apply it immediately.
2. If the filter is ready, hold an uncached live message from display until classification completes.
3. Show clean messages and keep blocked messages hidden according to the existing threshold.
4. On inference timeout/error, reveal the pending live message, reveal other pending messages, mark the filter unavailable, and keep chat running.
5. If the model is still loading or already unavailable, show the live message immediately rather than waiting for AI.
6. Preserve receive order by inserting the item immediately with an explicit visibility state; classification only changes visibility, never array position.

## Implementation Steps
1. In `src/services/minilm-chat-filter.js`, make request timeout terminal for that worker:
   - Call the existing failure path to enter `error` and reject active/queued requests.
   - Terminate the worker immediately so the timed-out inference cannot overlap subsequent work or retain model memory.
   - Do not advance the queue after timeout.
   - Preserve normal `terminate()` behavior during disable/navigation.
2. In `src/components/Chat.vue`, add an internal per-item visibility state used by `visibleChatLog` in addition to the existing severity rule. Do not change markup or styles.
3. During `onMessages`, calculate visibility from cache and position:
   - Cached items are complete and use their cached severity.
   - Every uncached item is pending and visible.
   - Replace history and complete the first render without awaiting filter readiness or classification.
   - Start the existing generation-safe newest-first classification pass only after `$nextTick` and a short timer/idle yield.
4. During `onMessage`, calculate visibility from cache/filter state:
   - Cache hit: visible or hidden immediately by severity.
   - Ready filter: pending and hidden until classified.
   - Loading/error/no filter: pending and visible immediately.
5. On successful classification, mark the item complete, cache its level, and set visibility from the existing filter threshold. On current-generation wrapper error, reveal every pending item and set `filterStatus = 'error'`; do not retry in a loop.
6. On Retry, keep the existing fresh-worker generation flow. Pending visible history/live items remain visible while retry classification runs; do not hide content again merely because Retry was pressed.
7. Keep cache implementation, persistence frequency, sound behavior, UI, CSS, SignalR/API contracts, and unrelated code unchanged.

## Failure Isolation
- Model download failure is handled only by the filter promise and cannot reject chat connection or room join.
- Slow inference times out, terminates its worker, rejects queued filter work, and reveals pending content.
- Disabling filtering or destroying the component rejects filter requests without showing an error and without stale mutations.
- SignalR receive/send and tournament navigation never await model readiness.

## Validation
1. Run `npm run build`. Record that `npm run lint` is unavailable because `@vue/cli-plugin-eslint` is not installed.
2. Re-enter a room with 200 mixed cached/uncached messages: verify cached filtering is applied before display, all uncached history appears on the first render without waiting for MiniLM, and order never changes.
3. Receive rapid live messages with a ready filter: verify uncached items do not flash before classification and become visible in original receive order when clean.
4. Simulate model loading on bad internet: verify complete history and new live messages remain usable while loading.
5. Simulate initialization error, inference error, and timeout: verify all pending messages become visible, Retry appears, no new inference starts, and chat/send/navigation continue.
6. Toggle filtering off and navigate away during active classification: verify no unhandled rejection, stale UI mutation, worker leak, or blocked chat.
7. Verify the source diff introduces no template or CSS changes and is limited to filter scheduling/visibility/failure handling.
8. Profile a 200-message cache miss on a throttled mobile CPU: verify first paint occurs before classification starts, only one inference is active, the browser receives a yield between results, and scrolling/input remain responsive.

## Out Of Scope
- UI redesign or status-text changes.
- Audio timing changes.
- Cache redesign/debouncing.
- ONNX/model/dependency changes.
- Dead-code cleanup, lint setup, source-map changes, or generated `www/` cleanup.
