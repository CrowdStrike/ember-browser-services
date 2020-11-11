import { module, test } from 'qunit';
import { setupBrowserFakes } from 'ember-browser-services/test-support';
import { setupTest } from 'ember-qunit';

module('Service | browser/local-storage', function (hooks) {
  setupTest(hooks);
  setupBrowserFakes(hooks, { localStorage: true });

  test('it works', function (assert) {
    let service = this.owner.lookup('service:browser/local-storage');

    assert.equal(service.getItem('foo'), null);
    assert.equal(service.getItem('foo'), localStorage.getItem('foo'));

    service.setItem('foo', 'bar');
    assert.equal(service.getItem('foo'), 'bar');
    assert.equal(localStorage.getItem('foo'), null);

    service.removeItem('foo');
    assert.equal(service.getItem('foo'), null);

    service.setItem('foo', 'baz');
    assert.equal(service.getItem('foo'), 'baz');

    service.clear();
    assert.equal(service.getItem('foo'), null);
  });
});
