---
"ember-browser-services": patch
---

Unregister Services before they are registered

This fixes some cases of a race condition when some service from this addon was set up eagerly before `setupBrowserFakes()` was called. Fixes https://github.com/embroider-build/ember-auto-import/issues/616, at least partially.
