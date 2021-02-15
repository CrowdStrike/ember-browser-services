import { proxyService } from 'ember-browser-services/utils/proxy-service';
import { testableVersionOf } from './-helpers';

export type TestNavigator = typeof fakeNavigator;

export const fakeMediaDevices = testableVersionOf(
  navigator.mediaDevices,
  class TestMediaDevices {
    // overrides deliberately left empty
  },
);

export const fakeNavigator = testableVersionOf(
  Navigator,
  class TestClass {
    get mediaDevices() {
      return fakeMediaDevices;
    }
  },
);

export const FakeNavigatorService = proxyService(fakeNavigator);
