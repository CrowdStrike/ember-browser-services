---
'ember-browser-services': patch
---

Address an issue where the types of each of the browser services did not have sufficient overlap with `Service`.

This is required for for folks using more modern TypeScript in ember apps,
where the service-name argument is passed to the `@service` decorator.

Previously, an error would occur:

```
../ember-browser-services/dist/services/browser/document.d.ts:4:9 - error TS2411: Property ''browser/document'' of type 'typeof Service & Document' is not assignable to 'string' index type 'Service'.

4         'browser/document': typeof DocumentProxyService;
          ~~~~~~~~~~~~~~~~~~
```

The expected type of Services in the Service Registry is `Service`, not `typeof Service`.
