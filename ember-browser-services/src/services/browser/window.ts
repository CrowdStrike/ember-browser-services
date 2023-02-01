import "@ember/service";

import { proxyService } from "./-proxy-service";

/**
 * In order to have thorough testing, we should only interact with the window
 * (and other browser APIs) via a service.
 *
 * We can control, mock, and override the services, but we can't do so with
 * the browser APIs.
 *
 */
const WindowProxyService = proxyService(window);

export default WindowProxyService;

declare global {
  interface Window {
    requirejs: (path: string) => { default: never };
  }
}

declare module "@ember/service" {
  interface Registry {
    "browser/window": typeof WindowProxyService;
  }
}
