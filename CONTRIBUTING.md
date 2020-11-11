# How To Contribute

## Installation

*   `git clone <repository-url>`
*   `cd ember-browser-services`
*   `yarn install`

## Linting

*   `yarn lint:hbs`
*   `yarn lint:js`
*   `yarn lint:js --fix`

## Running tests

*   `ember test` – Runs the test suite on the current Ember version
*   `ember test --server` – Runs the test suite in "watch mode"
*   `ember try:each` – Runs the test suite against multiple Ember versions

## Running the dummy application

*   `ember serve`
*   Visit the dummy application at <http://localhost:4200>.

For more information on using ember-cli, visit <https://ember-cli.com/>.

## Add a new / missing API

Want to add a new API? such as document, navigator, ServiceWorker, etc?
why weren't these addeded initially? Time. ;)

inside the addon root, run `ember g service browser/navigator` where `navigator`
is the name of the API you wish to proxy and mock in tests.

then, the file only neeeds to have an import and a default export:

```js
import { proxyService } from 'ember-browser-services/utils/proxy-service';

export default proxyService(navigator);
```

This serves as the *default implementation* that your apps will use and is only
a Proxy to the real thing.

Lastly, in `addon-test-support/index.ts`, add a registration for the new service.
