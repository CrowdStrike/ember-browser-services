import '@ember/service';

import { proxyService } from 'ember-browser-services/utils/proxy-service';

/**
 * In order to have thorough testing, we should only interact with the session storage
 * (and other browser APIs) via a service.
 *
 * We can control, mock, and override the services, but we can't do so with
 * the browser APIs.
 *
 */
const SessionStorageProxyService = proxyService(sessionStorage);

export default SessionStorageProxyService;

declare module '@ember/service' {
  interface Registry {
    'browser/session-storage': typeof SessionStorageProxyService;
  }
}
