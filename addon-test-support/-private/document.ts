import { proxyService } from 'ember-browser-services/utils/proxy-service';

export interface TestDocument {
  title: string;
}

class FakeDocument {
  title = '';
}

export const FakeDocumentService = proxyService(FakeDocument);
