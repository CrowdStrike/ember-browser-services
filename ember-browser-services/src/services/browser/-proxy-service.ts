import Service from '@ember/service';

import type { Class } from '../../types';

/**
 * Allows Services to behave as Proxy objects for real objects, such as
 * window, document, navigator, Worker, etc.
 *
 * useful for consistently accessing unmockable objects and then replacing them
 * with fakes in testing.
 *
 * would it be worth recursively wrapping in a proxy for any reason?
 *
 * NOTE: This only works for one layer deep of properties
 *
 * @param {Object | Class} browserObject - the api to wrap a service around.
 */
export function proxyService<BrowserAPI>(
  ObjectToProxy: BrowserAPI | Class<BrowserAPI>
): Service & BrowserAPI {
  type ProxyKey = BrowserAPI | Service;
  type CreateMethod = (typeof Service)['create'];

  // extending the types for the static method create is too hard / impossible
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let UnTypedService = Service as any;

  function instanceHandlerFor(browserObject: BrowserAPI) {
    return {
      get<K extends keyof ProxyKey>(
        targetInstance: Service,
        prop: K,
        receiver: unknown
      ) {
        if (prop in targetInstance) {
          return Reflect.get(targetInstance, prop, receiver);
        }

        let value = browserObject[prop];

        if (typeof value === 'function') {
          // prevents the error "Illegal Invocation"
          // which can sometimes happen due to losing the "this" depending on
          // the invocation context at the call site
          return value.bind(browserObject);
        }

        return value;
      },
      set<K extends keyof ProxyKey>(
        targetInstance: Service,
        prop: K,
        value: BrowserAPI[K],
        receiver: unknown
      ) {
        if (prop in targetInstance) {
          Reflect.set(targetInstance, prop, value, receiver);
        }

        browserObject[prop] = value;

        return true;
      },
    };
  }

  function isConstructable(
    proxyTo: BrowserAPI | Class<BrowserAPI>
  ): proxyTo is Class<BrowserAPI> {
    return typeof proxyTo === 'function';
  }

  // We have to untype the Service, because...
  // this is nuts:
  // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/da0e5b5/types/ember__object/core.d.ts#L82-L94
  //
  // it's also all private, and the ember-TS team apparently didn't think people would want to do this :D
  class ProxyCreator extends UnTypedService {
    // https://github.com/emberjs/ember.js/blob/master/packages/%40ember/service/index.js#L66-L74
    // https://github.com/emberjs/ember.js/blob/f85cefe9855b2521b02800d4bb2b68da7db2a214/packages/%40ember/service/index.js#L68-L72
    static isServiceFactory = true;

    static create(
      injections: Parameters<CreateMethod>
    ): ReturnType<CreateMethod> {
      let serviceInstance = class ProxiedService extends Service {
        // @private
        declare __browser_object__: BrowserAPI;
        /*
         * We cannot create the base Service, we must use a new one.
         * If we don't, we are unable to run tests in a legacy qunit environment
         * due to "writableChains" issues.
         *
         * https://github.com/emberjs/ember.js/pull/15347/files#diff-7e13eecefe753df1d82ce67b32bc4366R361
         *
         * */
      }.create(injections);

      let browserObject = isConstructable(ObjectToProxy)
        ? new ObjectToProxy()
        : ObjectToProxy;

      serviceInstance.__browser_object__ = browserObject;

      return new Proxy(serviceInstance, instanceHandlerFor(browserObject));
    }

    constructor(...args: unknown[]) {
      super(...args);
      throw new Error('ProxyCreator is not new-able');
    }
  }

  return ProxyCreator as unknown as Service & BrowserAPI;
}
