import '@ember/service';

import { proxyService } from 'ember-browser-services/utils/proxy-service';

/**
 * In order to have thorough testing, we should only interact with the local storage
 * (and other browser APIs) via a service.
 *
 * We can control, mock, and override the services, but we can't do so with
 * the browser APIs.
 *
 */
const LocalStorageProxyService = proxyService(localStorage);

export default LocalStorageProxyService;

declare module '@ember/service' {
  interface Registry {
    'browser/local-storage': typeof LocalStorageProxyService;
  }
}
