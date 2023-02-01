import "@ember/service";

import { proxyService } from "./-proxy-service";

const DocumentProxyService = proxyService(document);

/**
 * In order to have thorough testing, we should only interact with the document
 * (and other browser APIs) via a service.
 *
 * We can control, mock, and override the services, but we can't do so with
 * the browser APIs.
 *
 */
export default DocumentProxyService;

declare module "@ember/service" {
  interface Registry {
    "browser/document": typeof DocumentProxyService;
  }
}
