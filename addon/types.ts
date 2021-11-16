import type { default as _DocumentService } from './services/browser/document';
import type { default as _LocalStorageService } from './services/browser/local-storage';
import type { default as _SessionStorageService } from './services/browser/session-storage';
import type { default as _NavigatorService } from './services/browser/navigator';
import type { default as _WindowService } from './services/browser/window';

export type WindowService = typeof _WindowService;
export type DocumentService = typeof _DocumentService;
export type LocalStorageService = typeof _LocalStorageService;
export type SessionStorageService = typeof _SessionStorageService;
export type NavigatorService = typeof _NavigatorService;

export interface Class<T> {
  new (...args: unknown[]): T;
}

// https://stackoverflow.com/a/51365037/356849
/* eslint-disable @typescript-eslint/ban-types */
export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};
