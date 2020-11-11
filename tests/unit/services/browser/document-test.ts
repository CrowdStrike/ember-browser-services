import { module, test } from 'qunit';
import { setupBrowserFakes } from 'ember-browser-services/test-support';
import { setupTest } from 'ember-qunit';

module('Unit | Service | browser/document', function (hooks) {
  setupTest(hooks);

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

  module(
    'Implementation: when not stubbing the document, can the real document be interacted with?',
    function (hooks) {
      let originalTitle: string;

      hooks.beforeEach(function () {
        originalTitle = document.title;
      });

      hooks.afterEach(function () {
        document.title = originalTitle;
      });

      test('Proxied Service updates the real document', function (assert) {
        let service = this.owner.lookup('service:browser/document');

        service.title = 'foo';

        assert.notEqual(document.title, originalTitle);
        assert.equal(document.title, 'foo');
      });
    },
  );
});
