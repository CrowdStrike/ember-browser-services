import { assert } from '@ember/debug';

import type ApplicationInstance from '@ember/application/instance';

export function initialize(application: ApplicationInstance) {
  const windowService = application?.lookup('service:browser/window');

  assert('Expected to have the window service', windowService);
}

export default {
  initialize,
};
