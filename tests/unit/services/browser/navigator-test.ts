import { module, test } from 'qunit';
import { setupBrowserFakes } from 'ember-browser-services/test-support';
import { setupTest } from 'ember-qunit';

module('Service | browser/navigator', function (hooks) {
  setupTest(hooks);
  setupBrowserFakes(hooks, { navigator: true });

  module('mediaDevices', function () {
    module('getUserMedia', function () {
      test('can be manually resolved', async function (assert) {
        let service = this.owner.lookup('service:browser/navigator');
        let request = service.mediaDevices.getUserMedia();

        service.mediaDevices.interactions.getUserMedia.resolve('my custom media stream');

        let stream = await request;

        assert.equal(stream, 'my custom media stream');
      });

      test('can be rejected', async function (assert) {
        let service = this.owner.lookup('service:browser/navigator');
        let request = service.mediaDevices.getUserMedia();

        service.mediaDevices.interactions.getUserMedia.reject('no camera access!');

        await assert.rejects(request, 'no camera access');
      });
    });
  });
});
