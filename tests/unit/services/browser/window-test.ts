import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupBrowserFakes } from 'ember-browser-services/test-support';

module('Service | browser/window', function (hooks) {
  setupTest(hooks);

  module('accessing the service when not under test', function () {
    test('it is about equal the real thing', async function (assert) {
      let service = this.owner.lookup('service:browser/window');

      assert.strictEqual(service.location, window.location);
      assert.strictEqual(service.top.location, window.top?.location);
      assert.strictEqual(service.parent.location, window.parent.location);

      // we do some bind magic when we're dealing with functions,
      // so this setup allows us to keep the same function for comparison
      let bindBackup = window.fetch.bind;
      window.fetch.bind = () => window.fetch;

      assert.strictEqual(service.fetch, window.fetch);

      // restore original `bind`
      window.fetch.bind = bindBackup;
    });
  });

  module('invalid usage', function (hooks) {
    setupBrowserFakes(hooks, { window: true });

    test('href cannot be boolean', function (assert) {
      let service = this.owner.lookup('service:browser/window');

      assert.throws(() => {
        service.location.href = true;
      }, /TypeError/);
    });
  });

  module('Examples', function () {
    module('Stubbing fetch', function (hooks) {
      setupBrowserFakes(hooks, {
        window: {
          fetch: async (url: string) => ({ url }),
        },
      });

      test('can intercept fetch', async function (assert) {
        let service = this.owner.lookup('service:browser/window');
        let fakeUrl = 'https://example.com';
        let { url: urlUsed } = await service.fetch(fakeUrl);

        assert.equal(urlUsed, fakeUrl);
      });
    });


    module('Stubbing location.href', function (hooks) {
      setupBrowserFakes(hooks, {
        window: {
          location: { href: 'http://init.ial' },
          parent: { location: { href: 'http://init.ial' } },
        },
      });

      // if this test were to fail, the test suite would hang and timeout, because
      // we can't run tests and change the href at the same time
      test('can reset the href without causing a browser refresh', function (assert) {
        let service = this.owner.lookup('service:browser/window');

        // verify that the initial config works
        assert.strictEqual(service.location.href, 'http://init.ial/', 'window.location.href');
        assert.strictEqual(
          service.parent.location.href,
          'http://init.ial/',
          'window.parent.location.href'
        );

        // potential real ways to redirect to the login app
        let loginPath = 'https://example.com/login';

        service.location.href = loginPath;
        service.parent.location.href = loginPath;

        // We'll redirect away from the test if the replacement methods don't work /
        // are incorrect / have spelling errors
        assert.notEqual(service.location.href, window.location.href);
        assert.notEqual(service.parent.location.href, window.parent.location.href);

        // verify that setting actually works
        assert.strictEqual(service.location.href, loginPath);
        assert.strictEqual(service.parent.location.href, loginPath);
      });
    });

    module('Stubbing location.origin', function (hooks) {
      setupBrowserFakes(hooks, {
        window: {
          location: { origin: 'http://init.ial', href: 'http://init.ial' },
        },
      });

      test('can read from the stubbed origin', function (assert) {
        let service = this.owner.lookup('service:browser/window');

        assert.strictEqual(service.location.href, 'http://init.ial/', 'window.location.href');
        assert.strictEqual(service.location.origin, 'http://init.ial', 'window.location.origin');
      });
    });
  });

  module('related data is properly related', function () {
    module('location', function (hooks) {
      setupBrowserFakes(hooks, {
        window: {
          parent: { location: { href: 'http://init.ial' } },
        },
      });

      test('it works', function (assert) {
        let service = this.owner.lookup('service:browser/window');
        let loginPath = 'https://example.com/login';

        service.parent.location.href = loginPath;

        assert.strictEqual(service.location.href, loginPath);
        assert.strictEqual(service.location.href, service.parent.location.href);
        assert.strictEqual(service.location, service.parent.location);
        assert.strictEqual(service.location, service.top.location);
      });
    });

    module('origin', function (hooks) {
      setupBrowserFakes(hooks, {
        window: true,
      });

      test('it works', function (assert) {
        let service = this.owner.lookup('service:browser/window');

        assert.ok(service.location.origin);
        service.parent.location.href = '/login';

        assert.ok(service.location.origin);
        assert.strictEqual(service.location.origin, service.parent.location.origin);
      });
    });
  });
});
