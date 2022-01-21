import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupBrowserFakes } from 'ember-browser-services/test-support';

module('Service | browser/local-storage', function (hooks) {
  setupTest(hooks);
  setupBrowserFakes(hooks, { localStorage: true });

  test('it works', function (assert) {
    assert.expect(14);

    let service = this.owner.lookup('service:browser/local-storage');

    function assertGetSet(valueIn: unknown, expectedOut?: string | null) {
      service.setItem('foo', valueIn);

      assert.strictEqual(service.getItem('foo'), expectedOut);
    }

    assert.strictEqual(service.getItem('foo'), null, 'initially is empty');
    assert.strictEqual(
      localStorage.getItem('foo'),
      null,
      'real localStorage is also initially empty'
    );

    assertGetSet(undefined, 'undefined');
    assertGetSet(null, 'null');
    assertGetSet('bar', 'bar');
    assertGetSet({}, '[object Object]');
    assertGetSet(['a'], 'a');
    assertGetSet([1], '1');
    assertGetSet(['a', 'b'], 'a,b');
    assertGetSet([{}], '[object Object]');

    assert.strictEqual(localStorage.getItem('foo'), null, 'real localStorage is unchanged');

    service.removeItem('foo');
    assert.strictEqual(service.getItem('foo'), null);

    service.setItem('foo', 'baz');
    assert.strictEqual(service.getItem('foo'), 'baz');

    service.clear();
    assert.strictEqual(service.getItem('foo'), null);
  });
});
