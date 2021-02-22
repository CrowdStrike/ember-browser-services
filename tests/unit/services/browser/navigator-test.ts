import { module, test } from 'qunit';
import RSVP from 'rsvp';
import { setupTest } from 'ember-qunit';

import { setupBrowserFakes } from 'ember-browser-services/test-support';

import type ApplicationInstance from '@ember/application/instance';
import type { NavigatorService } from 'ember-browser-services/types';

function getNavigatorService(owner: ApplicationInstance) {
  return owner.lookup('service:browser/navigator') as NavigatorService;
}

module('Service | browser/navigator', function (hooks) {
  setupTest(hooks);

  module('for config: true', function (hooks) {
    setupBrowserFakes(hooks, { navigator: true });

    test('APIs fallback to browser APIs', function (assert) {
      let service = getNavigatorService(this.owner);

      assert.equal(service.mediaDevices.getUserMedia, navigator.mediaDevices.getUserMedia);
    });
  });

  module('for config: object override', function () {
    module('mediaDevices.getUserMedia', function (hooks) {
      let deferred: RSVP.Deferred<string>;

      setupBrowserFakes(hooks, {
        navigator: {
          mediaDevices: {
            getUserMedia() {
              deferred = RSVP.defer();

              return deferred.promise;
            },
          },
        },
      });

      test('can be manually resolved', async function (assert) {
        let service = getNavigatorService(this.owner);
        let request = service.mediaDevices.getUserMedia();

        deferred.resolve('my custom media stream');

        let stream = await request;

        assert.equal(stream, 'my custom media stream');
      });

      test('can be rejected', async function (assert) {
        let service = getNavigatorService(this.owner);
        let request = service.mediaDevices.getUserMedia();

        deferred.reject('no camera access!');

        await assert.rejects(request, 'no camera access');
      });
    });
  });
});
