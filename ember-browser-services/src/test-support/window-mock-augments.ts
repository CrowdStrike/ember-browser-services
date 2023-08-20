import window from 'ember-window-mock';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import locationFactory from 'ember-window-mock/test-support/-private/mock/location';

const AUGMENTS: Array<string | symbol> = ['origin'];

function createLocation(target?: Window) {
  let initialHref = target?.location?.href ?? window.location.href;
  let mockLocation = locationFactory(initialHref);
  let values: any = {};

  mockLocation.isPatchedLocation = true;

  return new Proxy(mockLocation, {
    get(target, key, receiver) {
      if (AUGMENTS.includes(key)) {
        return values[key] ?? Reflect.get(target, key, receiver);
      }

      return Reflect.get(target, key, receiver);
    },

    set(target, key, value, receiver) {
      if (AUGMENTS.includes(key)) {
        return (values[key] = value);
      }

      return Reflect.set(target, key, value, receiver);
    },
  });
}

export function patchWindow(target: any, windowOptions: any = {}) {
  let location = createLocation(target);

  let self: any = new Proxy(target, {
    get(target, key, receiver) {
      if (key === 'location') return location;
      if (key === 'parent' && !('parent' in windowOptions)) return self;
      if (key === 'top' && !('top' in windowOptions)) return self;

      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      if (key === 'location') {
        throw new Error(`location cannot be set on window`);
      }

      return Reflect.set(target, key, value, receiver);
    },
  });

  return self;
}
