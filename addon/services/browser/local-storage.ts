import '@ember/service';

import { proxyService } from 'ember-browser-services/utils/proxy-service';

const LocalStorageProxyService = proxyService(localStorage);

export default LocalStorageProxyService;

declare module '@ember/service' {
  interface Registry {
    'browser/local-storage': typeof LocalStorageProxyService;
  }
}
