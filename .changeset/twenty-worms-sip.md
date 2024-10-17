---
"ember-browser-services": patch
"test-app": patch
---

Unregister services before they are registered in `setupBrowserFakes()` 

Fixes https://github.com/CrowdStrike/ember-browser-services/issues/413
