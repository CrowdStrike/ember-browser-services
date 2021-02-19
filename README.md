# ember-browser-services

`ember-browser-services` is a collection of Ember Services that allow for
consistent interaction with browser APIs.

When all browser APIs are accessed via services, browser behavior is now
stubbable in unit tests!

This addon is written in TypeScript so that your editor will provide intellisense
hints to guide you through usage so that you don't have to spend as much time
looking at the documentation.

## Installation

    yarn add ember-browser-services
    # or
    npm install ember-browser-services
    # or
    ember install ember-browser-services

## Compatibility

*   Ember.js v3.12 or above
*   Node.js v10 or above

## Usage

Whenever you would reach for `window`, or any other browser API, inject the
service instead.

```js
export default class MyComponent extends Component {
  @service('browser/window') window;

  @action
  externalRedirect() {
    this.window.location.href = 'https://crowdstrike.com';
  }
}
```

### Testing

for fuller examples, see the tests directory.

As with any service, if the default implementation is not suitable for testing,
it may be swapped out during the test.

```js
import Service from '@ember/service';

module('Scenario Name', function (hooks) {
  test('rare browser API', function (assert) {
    let called = false;

    this.owner.register(
      'service:browser/window',
      class TestWindow extends Service {
        rareBrowserApi() {
          called = true;
        }
      },
    );

    this.owner.lookup('service:browser/window').rareBrowserApi();

    assert.ok(called, 'the browser api was called');
  });
});
```

#### Window

```js
import { setupBrowserFakes } from 'ember-browser-services/test-support';

module('Scenario Name', function (hooks) {
  setupBrowserFakes(hooks, { window: true });

  test('is at crowdstrike.com', function (assert) {
    let service = this.owner.lookup('service:browser/window');

    // somewhere in a component or route or service
    // windowService.location = '/';
    assert.equal(service.location.href, '/'); // => succeeds
  });
});
```


Alternatively, specific APIs of the `window` can be stubbed with an object

```js
import { setupBrowserFakes } from 'ember-browser-services/test-support';

module('Scenario Name', function (hooks) {
  setupBrowserFakes(hooks, {
    window: { location: { href: 'https://crowdstrike.com' } },
  });

  test('is at crowdstrike.com', function (assert) {
    let service = this.owner.lookup('service:browser/window');

    assert.equal(service.location.href, 'https://crowdstrike.com'); // => succeeds
  });
});
```

#### localStorage

```js
import { setupBrowserFakes } from 'ember-browser-services/test-support';

module('Scenario Name', function (hooks) {
  setupBrowserFakes(hooks, { localStorage: true });

  test('local storage service works', function (assert) {
    let service = this.owner.lookup('service:browser/local-storage');

    assert.equal(service.getItem('foo'), null);

    service.setItem('foo', 'bar');
    assert.equal(service.getItem('foo'), 'bar');
    assert.equal(localStorage.getItem('foo'), null);
  });
});
```

#### document

```js
import { setupBrowserFakes } from 'ember-browser-services/test-support';

module('Examples: How to use the browser/document service', function (hooks) {
  setupBrowserFakes(hooks, {
    document: {
      title: 'Foo',
    },
  });

  test('title interacts separately from the real document', function (assert) {
    let service = this.owner.lookup('service:browser/document');

    assert.equal(service.title, 'Foo');
    assert.notEqual(service.title, document.title);

    service.title = 'Bar';
    assert.equal(service.title, 'Bar');
    assert.notEqual(service.title, document.title);
  });
});
```

## What about ember-window-mock?

[ember-window-mock](https://github.com/kaliber5/ember-window-mock) offers much
of the same feature set as ember-browser-services.

The main differences being:
 - ember-window-mock
   - smaller API surface
   - uses imports for `window` instead of a service
   - all browser APIs must be accessed from the imported `window` to be mocked / stubbed
   - adding additional behavior to the test version of an object requires something like:

       ```js
       import window from 'ember-window-mock';

       // ....
       window.location = new TestLocation();
       window.parent.location = window.location;
       ```

 - ember-browser-services
   - uses services instead of imports
   - multiple top-level browser APIs, instead of just `window`
   - any changes to a service's implementation during a test are discarded after the test finishes
   - adding additional behavior to the test version of an object requires something like:

      ```js
      this.owner.register(
        'service:browser/window',
        class extends Service {
          location = new TestLocation();

          parent = this;
        },
      );
      ```
   - because of the ability to register custom services during tests,
     if app authors want to customize their own implementation of test services, that can be done
     without a PR to the addon
   - there is an object short-hand notation for customizing browser APIs via `setupBrowserFakes`
     (demonstrated in the above examples)

Similarities / both addons:
 - use proxies to fallback to default browser API behavior
 - provide default stubs for commonly tested behavior (`location`, `localStorage`)



## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
