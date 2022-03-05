import '@ember/service';

import { proxyService } from 'ember-browser-services/utils/proxy-service';

const NavigatorProxyService = proxyService(navigator);

/**
 * In order to have thorough testing, we should only interact with the navigator
 * (and other browser APIs) via a service.
 *
 * We can control, mock, and override the services, but we can't do so with
 * the browser APIs.
 *
 */
export default NavigatorProxyService;

declare module '@ember/service' {
  interface Registry {
    'browser/navigator': typeof NavigatorProxyService;
  }
}
