import type { default as _DocumentService } from './services/browser/document';
import type { default as _LocalStorageService } from './services/browser/local-storage';
import type { default as _WindowService } from './services/browser/window';

export type WindowService = typeof _WindowService;
export type DocumentService = typeof _DocumentService;
export type LocalStorageService = typeof _LocalStorageService;
