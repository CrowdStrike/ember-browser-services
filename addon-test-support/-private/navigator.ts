import RSVP from 'rsvp';
import { proxyService } from 'ember-browser-services/utils/proxy-service';
import { testableVersionOf } from './-helpers';

export type TestNavigator = typeof fakeNavigator;

type UserInteractions<Source> = Partial<Record<keyof Source, RSVP.Deferred<unknown>>>;

export const fakeMediaDevices = testableVersionOf(
  navigator.mediaDevices,
  class TestMediaDevices {
    interactions: UserInteractions<MediaDevices> = {};

    getUserMedia(_options: Parameters<typeof navigator.mediaDevices.getUserMedia>) {
      let deferred = RSVP.defer();

      this.interactions.getUserMedia = deferred;

      return deferred.promise;
    }
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
