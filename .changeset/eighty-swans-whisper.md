---
'ember-browser-services': major
---

Update ember-window-mock, drop unneeded glue code

There is a potentially breaking change, as you cannot mock `window.location.origin` directly anymore. But this should not restrict you, as you can set `window.location.href`, and `origin` will be correctly reflected. Having `origin` not be aligned with `href` can never happen in reality, since `origin` is a read-only property, so having these diverge in tests is not really useful.
