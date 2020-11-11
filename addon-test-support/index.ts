import { FakeDocumentService, TestDocument } from './-private/document';
import { FakeLocalStorageService } from './-private/local-storage';
import { FakeWindowService, TestWindow } from './-private/window';
import { maybeMake } from './-private/-helpers';

import type Service from '@ember/service';
import type { TestContext } from 'ember-test-helpers';

type Fakes = {
  window?: boolean | TestWindow | typeof Service;
  localStorage?: boolean;
  document?: boolean | TestDocument | typeof Service;
};

export function setupBrowserFakes(hooks: NestedHooks, options: Fakes): void {
  hooks.beforeEach(function (this: TestContext) {
    if (options.window) {
      this.owner.register('service:browser/window', maybeMake(options.window, FakeWindowService));
    }

    if (options.document) {
      this.owner.register(
        'service:browser/document',
        maybeMake(options.document, FakeDocumentService),
      );
    }

    if (options.localStorage) {
      this.owner.register('service:browser/local-storage', FakeLocalStorageService);
    }
  });
}
