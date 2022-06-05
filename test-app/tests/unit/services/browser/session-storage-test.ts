import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupBrowserFakes } from 'ember-browser-services/test-support';

import type ApplicationInstance from '@ember/application/instance';
import type { SessionStorageService } from 'ember-browser-services/types';

function getSessionStorageService(owner: ApplicationInstance): SessionStorageService {
  // the type of owner keeps being incorrect...
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return owner.lookup('service:browser/session-storage') as SessionStorageService;
}

module('Service | browser/session-storage', function (hooks) {
  setupTest(hooks);
  setupBrowserFakes(hooks, { sessionStorage: true });

  test('it works', function (assert) {
    assert.expect(14);

    let service = getSessionStorageService(this.owner);

    function assertGetSet(valueIn: unknown, expectedOut?: string | null) {
      // A lie to TS because sessionStorage will convert this to
      // a string regardless of it makes sense
      service.setItem('foo', valueIn as unknown as string);

      assert.strictEqual(service.getItem('foo'), expectedOut);
    }

    assert.strictEqual(service.getItem('foo'), null, 'initially is empty');
    assert.strictEqual(
      sessionStorage.getItem('foo'),
      null,
      'real sessionStorage is also initially empty'
    );

    assertGetSet(undefined, 'undefined');
    assertGetSet(null, 'null');
    assertGetSet('bar', 'bar');
    assertGetSet({}, '[object Object]');
    assertGetSet(['a'], 'a');
    assertGetSet([1], '1');
    assertGetSet(['a', 'b'], 'a,b');
    assertGetSet([{}], '[object Object]');

    assert.strictEqual(sessionStorage.getItem('foo'), null, 'real sessionStorage is unchanged');

    service.removeItem('foo');
    assert.strictEqual(service.getItem('foo'), null);

    service.setItem('foo', 'baz');
    assert.strictEqual(service.getItem('foo'), 'baz');

    service.clear();
    assert.strictEqual(service.getItem('foo'), null);
  });
});
