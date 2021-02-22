import Service from '@ember/service';

import { proxyService } from 'ember-browser-services/utils/proxy-service';

import type { Class } from 'ember-browser-services/types';

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

export function testableVersionOf<
  // eslint-disable-next-line @typescript-eslint/ban-types
  Real extends object,
  // eslint-disable-next-line @typescript-eslint/ban-types
  TestInstance extends object,
  TestClass extends Class<TestInstance>
>(real: Real, Klass: TestClass) {
  let overrides = new Klass();

  let proxied = new Proxy(overrides, {
    get(target, propName, receiver) {
      if (propName in target) {
        return Reflect.get(target, propName, receiver);
      }

      return Reflect.get(real, propName);
    },
  });

  return proxied;
}
