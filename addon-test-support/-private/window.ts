import { proxyService } from 'ember-browser-services/utils/proxy-service';

interface TestLocation extends Partial<Location> {
  href?: string;
}

export interface TestWindow {
  parent?: TestWindow;
  top?: TestWindow;
  location?: TestLocation;
}

class FakeLocation {
  href = '';

  replace(href: string) {
    this.href = href;
  }
}

class FakeWindow {
  location = new FakeLocation();
  top = this;
  parent = this;
}

export const FakeWindowService = proxyService(FakeWindow);
