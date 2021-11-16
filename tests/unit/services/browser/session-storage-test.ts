import { module, test } from 'qunit';
import { setupBrowserFakes } from 'ember-browser-services/test-support';
import { setupTest } from 'ember-qunit';

module('Service | browser/session-storage', function (hooks) {
  setupTest(hooks);
  setupBrowserFakes(hooks, { sessionStorage: true });

  test('it works', function (assert) {
    let service = this.owner.lookup('service:browser/session-storage');

    function assertGetSet(valueIn: unknown, expectedOut?: string | null) {
      service.setItem('foo', valueIn);

      assert.equal(service.getItem('foo'), expectedOut);
    }

    assert.equal(service.getItem('foo'), null, 'initially is empty');
    assert.equal(
      sessionStorage.getItem('foo'),
      null,
      'real sessionStorage is also initially empty',
    );

    assertGetSet(undefined, 'undefined');
    assertGetSet(null, 'null');
    assertGetSet('bar', 'bar');
    assertGetSet({}, '[object Object]');
    assertGetSet(['a'], 'a');
    assertGetSet([1], '1');
    assertGetSet(['a', 'b'], 'a,b');
    assertGetSet([{}], '[object Object]');

    assert.equal(sessionStorage.getItem('foo'), null, 'real sessionStorage is unchanged');

    service.removeItem('foo');
    assert.equal(service.getItem('foo'), null);

    service.setItem('foo', 'baz');
    assert.equal(service.getItem('foo'), 'baz');

    service.clear();
    assert.equal(service.getItem('foo'), null);
  });
});
