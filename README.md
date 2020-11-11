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

#### Window

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

  test('is at crowdstrike.com', function (assert) {
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

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
