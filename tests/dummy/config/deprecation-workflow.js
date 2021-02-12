'use strict';

self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  // For any new deprecations (not mentioned in the below workflow),
  // set to "true" to throw as a default so that the deprecation
  // - is dealt with right away / fixed
  // - added to the workflow below (along with a ticket / issue number).
  throwOnUnhandled: true,

  workflow: [
    // Ember Deprecations
    // Test Deprecations
  ],
};
