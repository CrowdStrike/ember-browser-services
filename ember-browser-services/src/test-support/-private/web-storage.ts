import Service from "@ember/service";

type FakeWebStorage = Record<string, string>;

/**
 * Mimics the Web Storage API, as used by localStorage and sessionStorage.
 *
 */
class FakeWebStorageService extends Service {
  fakeWebStorage: FakeWebStorage = {};

  setItem(key: string, value: string): void {
    // Everything in Web Storage is a string
    this.fakeWebStorage[key] = `${value}`;
  }

  getItem(key: string): string | null {
    return this.fakeWebStorage[key] || null;
  }

  removeItem(key: string): void {
    delete this.fakeWebStorage[key];
  }

  clear(): void {
    this.fakeWebStorage = {};
  }
}

export class FakeLocalStorageService extends FakeWebStorageService {}
export class FakeSessionStorageService extends FakeWebStorageService {}
