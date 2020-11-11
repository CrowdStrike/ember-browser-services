import Service from '@ember/service';

type FakeLocalStorage = Record<string, string>;

/**
 * Mimics the window.localStorage API
 *
 */
export class FakeLocalStorageService extends Service {
  fakeLocalStorage: FakeLocalStorage = {};

  setItem(key: string, value: string): void {
    // Everything in localStorage is a string
    this.fakeLocalStorage[key] = `${value}`;
  }

  getItem(key: string): string | null {
    return this.fakeLocalStorage[key] || null;
  }

  removeItem(key: string): void {
    delete this.fakeLocalStorage[key];
  }

  clear(): void {
    this.fakeLocalStorage = {};
  }
}
