# Standalone chat filter

This demo loads Transformers.js 4.2.0 from jsDelivr and the classifier model
from Hugging Face. Serve these files over HTTP(S); the browser must be able to
reach both services. The production Vue app does not use this standalone demo.

The dependency version is pinned in `minilm-classifier.worker.js`. Do not commit
copies of the minified library or ONNX runtime here: GitHub push protection
flagged a string in the unmodified upstream bundle as a possible API key.
