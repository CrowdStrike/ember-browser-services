import Service from '@ember/service';

import { proxyService } from 'ember-browser-services/utils/proxy-service';

// this usage of any is correct, because it literally could be *any*thing
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnknownObject = Record<string, any>;

export function maybeMake<DefaultType extends typeof Service, TestClass extends UnknownObject>(
  maybeImplementation: true | typeof Service | TestClass,
  defaultImplementation: DefaultType,
): typeof Service {
  if (maybeImplementation === true) {
    return defaultImplementation;
  } else if (typeof maybeImplementation === 'object') {
    return proxyService(maybeImplementation);
  } else if (maybeImplementation.prototype instanceof Service) {
    return maybeImplementation;
  }

  return defaultImplementation;
}
