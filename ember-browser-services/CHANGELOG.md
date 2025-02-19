# ember-browser-services

## 5.0.1

### Patch Changes

- [#425](https://github.com/CrowdStrike/ember-browser-services/pull/425) [`71e831a`](https://github.com/CrowdStrike/ember-browser-services/commit/71e831ab0949664868370d5e3d35139f0c61eea5) Thanks [@MrChocolatine](https://github.com/MrChocolatine)! - Unregister services before they are registered in `setupBrowserFakes()`

  Fixes https://github.com/CrowdStrike/ember-browser-services/issues/413

## 5.0.0

### Major Changes

- [#397](https://github.com/CrowdStrike/ember-browser-services/pull/397) [`606e0f8fe4e6ef3ff527cb432c65af2fb9d631d4`](https://github.com/CrowdStrike/ember-browser-services/commit/606e0f8fe4e6ef3ff527cb432c65af2fb9d631d4) Thanks [@simonihmig](https://github.com/simonihmig)! - Drop support for Ember < 4.8

- [#399](https://github.com/CrowdStrike/ember-browser-services/pull/399) [`562c673596fdcad78a4f7f5b89877b2ff3a18073`](https://github.com/CrowdStrike/ember-browser-services/commit/562c673596fdcad78a4f7f5b89877b2ff3a18073) Thanks [@simonihmig](https://github.com/simonihmig)! - Update ember-window-mock, drop unneeded glue code

  There is a potentially breaking change, as you cannot mock `window.location.origin` directly anymore. But this should not restrict you, as you can set `window.location.href`, and `origin` will be correctly reflected. Having `origin` not be aligned with `href` can never happen in reality, since `origin` is a read-only property, so having these diverge in tests is not really useful.

## 4.0.4

### Patch Changes

- [#364](https://github.com/CrowdStrike/ember-browser-services/pull/364) [`0be2928`](https://github.com/CrowdStrike/ember-browser-services/commit/0be2928a13936c06c628ce70f69516981e0d7679) Thanks [@NullVoxPopuli](https://github.com/NullVoxPopuli)! - Include the LICENSE.md in the npm package

- [#364](https://github.com/CrowdStrike/ember-browser-services/pull/364) [`398d517`](https://github.com/CrowdStrike/ember-browser-services/commit/398d517fc8b520f8b38837c8bac6d5a8e7e1eb57) Thanks [@NullVoxPopuli](https://github.com/NullVoxPopuli)! - Address an issue where the types of each of the browser services did not have sufficient overlap with `Service`.

  This is required for folks using more modern TypeScript in ember apps,
  where the service-name argument is passed to the `@service` decorator.

  Previously, an error would occur:

  ```
  ../ember-browser-services/dist/services/browser/document.d.ts:4:9 - error TS2411: Property ''browser/document'' of type 'typeof Service & Document' is not assignable to 'string' index type 'Service'.

  4         'browser/document': typeof DocumentProxyService;
            ~~~~~~~~~~~~~~~~~~
  ```

  The expected type of Services in the Service Registry is `Service`, not `typeof Service`.

## [4.0.3](https://github.com/CrowdStrike/ember-browser-services/compare/v4.0.2...v4.0.3) (2022-06-08)

### Bug Fixes

- **deps:** widen range for @embroider/addon-shim ([4db62b7](https://github.com/CrowdStrike/ember-browser-services/commit/4db62b7e738cf862eec5a0eccc549849017cb93b))

## [4.0.2](https://github.com/CrowdStrike/ember-browser-services/compare/v4.0.1...v4.0.2) (2022-06-08)

### Bug Fixes

- **package:** app-re-exports included non-public file ([f2c7ef1](https://github.com/CrowdStrike/ember-browser-services/commit/f2c7ef11c13d2364c79cc0996b2ea0a54b2f6a02))

## [4.0.1](https://github.com/CrowdStrike/ember-browser-services/compare/v4.0.0...v4.0.1) (2022-06-07)

### Bug Fixes

- **package:** addon-main specified incorrect path ([61e99ab](https://github.com/CrowdStrike/ember-browser-services/commit/61e99abb11c1c3cede8c9beb916d60f7650fbc0d))
- **package:** exports field did not specify test-support ([83a303f](https://github.com/CrowdStrike/ember-browser-services/commit/83a303f56f7ccfa2db92c4dc1cfbec982235ab3d))
- **package:** typesVersions was woefully incorrect ([3538f00](https://github.com/CrowdStrike/ember-browser-services/commit/3538f0072272604aa3cf460fb7ca47bd2233a9e7))

# [4.0.0](https://github.com/CrowdStrike/ember-browser-services/compare/v3.0.5...v4.0.0) (2022-06-07)

### chore

- run `npx ember-addon-migrator` ([74bc722](https://github.com/CrowdStrike/ember-browser-services/commit/74bc722aca8fa0787b01b55be7bad58b9b873b9c))

### BREAKING CHANGES

- this addon now requires ember-auto-import@v2

## [3.0.5](https://github.com/CrowdStrike/ember-browser-services/compare/v3.0.4...v3.0.5) (2022-05-16)

### Bug Fixes

- **package:** opt in to which files to include on npm, instead of the inverse ([f0d2dd9](https://github.com/CrowdStrike/ember-browser-services/commit/f0d2dd917e1453fdd3b146b5741d70aa033431fb))

## [3.0.4](https://github.com/CrowdStrike/ember-browser-services/compare/v3.0.3...v3.0.4) (2022-04-21)

### Bug Fixes

- **deps:** update dependency ember-cli-typescript to ^5.1.0 ([d2dd804](https://github.com/CrowdStrike/ember-browser-services/commit/d2dd8047b1850568a942fa6799838316974ab762))

## [3.0.3](https://github.com/CrowdStrike/ember-browser-services/compare/v3.0.2...v3.0.3) (2022-02-18)

### Bug Fixes

- **deps:** update dependency ember-window-mock to ^0.8.1 ([19d60dc](https://github.com/CrowdStrike/ember-browser-services/commit/19d60dc40c6bef507d93b1f1195888e3274cf1f3))

## [3.0.2](https://github.com/CrowdStrike/ember-browser-services/compare/v3.0.1...v3.0.2) (2022-02-04)

### Bug Fixes

- **deps:** update dependency ember-cli-typescript to v5 ([c02ec71](https://github.com/CrowdStrike/ember-browser-services/commit/c02ec71729073af33ee2b8242cf764806c21396f))

## [3.0.1](https://github.com/CrowdStrike/ember-browser-services/compare/v3.0.0...v3.0.1) (2022-01-31)

### Bug Fixes

- **deps:** update dependency ember-window-mock to ^0.8.0 ([a717bde](https://github.com/CrowdStrike/ember-browser-services/commit/a717bdeb01674ba69c649ed807b851281af58a90))

# [3.0.0](https://github.com/CrowdStrike/ember-browser-services/compare/v2.1.4...v3.0.0) (2022-01-20)

### Bug Fixes

- **deps:** update dependency ember-cli-babel to ^7.26.11 ([5381024](https://github.com/CrowdStrike/ember-browser-services/commit/538102488b54da3db067bd56df2447249b29d5bd))

### chore

- drop support for classic ember ([353195f](https://github.com/CrowdStrike/ember-browser-services/commit/353195f4baff841392ec9f730fbf94ba131d5bed))
- drop support for node 12 ([05d3a3b](https://github.com/CrowdStrike/ember-browser-services/commit/05d3a3b0760aabb749c4c4a6fcf501028c3eac5f))

### BREAKING CHANGES

- ember octane is two years old
  and is all that is supported. This addon may still work with
  classic ember, but it will not be tested against (to help
  simplify this addon's C.I. configuration)
- node 12 is no longer supported

## [2.1.4](https://github.com/CrowdStrike/ember-browser-services/compare/v2.1.3...v2.1.4) (2021-12-17)

### Bug Fixes

- **deps:** update dependency ember-cli-babel to ^7.26.10 ([3c2f6d6](https://github.com/CrowdStrike/ember-browser-services/commit/3c2f6d6f94ccf9f46a4cdd55653d38ceeb7e3018))

## [2.1.3](https://github.com/CrowdStrike/ember-browser-services/compare/v2.1.2...v2.1.3) (2021-12-16)

### Bug Fixes

- **deps:** update dependency ember-cli-babel to ^7.26.8 ([82d4fe6](https://github.com/CrowdStrike/ember-browser-services/commit/82d4fe6e2b3d19a78f06b54dece915364435f822))

## [2.1.2](https://github.com/CrowdStrike/ember-browser-services/compare/v2.1.1...v2.1.2) (2021-12-15)

### Bug Fixes

- **deps:** update dependency ember-cli-babel to ^7.26.7 ([1ba87de](https://github.com/CrowdStrike/ember-browser-services/commit/1ba87def8c8153e19ced80b335dfb000e3972a76))

## [2.1.1](https://github.com/CrowdStrike/ember-browser-services/compare/v2.1.0...v2.1.1) (2021-12-06)

### Bug Fixes

- **deps:** update dependency ember-cli-htmlbars to ^6.0.1 ([ee02fa1](https://github.com/CrowdStrike/ember-browser-services/commit/ee02fa1d7b190ed51ccc69fb12f87b7ac1f6717f))

# [2.1.0](https://github.com/CrowdStrike/ember-browser-services/compare/v2.0.2...v2.1.0) (2021-11-23)

### Features

- support session-storage ([ffaf626](https://github.com/CrowdStrike/ember-browser-services/commit/ffaf6263080546c2dab2f5c62db40166dfc6f3a1))

## [2.0.2](https://github.com/CrowdStrike/ember-browser-services/compare/v2.0.1...v2.0.2) (2021-11-18)

### Bug Fixes

- **deps:** update dependency ember-cli-htmlbars to v6 ([a3115e3](https://github.com/CrowdStrike/ember-browser-services/commit/a3115e396af97177ce4b3824718ea18648ee0c60))

## [2.0.1](https://github.com/CrowdStrike/ember-browser-services/compare/v2.0.0...v2.0.1) (2021-11-18)

### Bug Fixes

- **support:** expand and fix support ([dcd8dd6](https://github.com/CrowdStrike/ember-browser-services/commit/dcd8dd68b2c0170456e82e999513bea6beecbafa))

# [2.0.0](https://github.com/CrowdStrike/ember-browser-services/compare/v1.1.8...v2.0.0) (2021-09-09)

### Features

- utilize ember-window-mock for the underlying provider ([659f20f](https://github.com/CrowdStrike/ember-browser-services/commit/659f20f702873c942d6476301730107c71a566c4))

### BREAKING CHANGES

- invalid hrefs will throw an error

## [1.1.8](https://github.com/CrowdStrike/ember-browser-services/compare/v1.1.7...v1.1.8) (2021-08-31)

### Bug Fixes

- **npm:** remove unneeded files from npm package ([ee0914c](https://github.com/CrowdStrike/ember-browser-services/commit/ee0914cc9e35db88dbd42ba1f0abdc73faa8c733))

## [1.1.7](https://github.com/CrowdStrike/ember-browser-services/compare/v1.1.6...v1.1.7) (2021-08-31)

### Bug Fixes

- **deps:** update dependency ember-cli-babel to ^7.26.6 ([37cf27f](https://github.com/CrowdStrike/ember-browser-services/commit/37cf27ffb7322152d6c3c347f8ac7e41e6416ce9))
- **deps:** update dependency ember-cli-typescript to ^4.2.1 ([ab1ab86](https://github.com/CrowdStrike/ember-browser-services/commit/ab1ab869df805acaea7045d5af2cd925fc1a55c7))

## [1.1.6](https://github.com/CrowdStrike/ember-browser-services/compare/v1.1.5...v1.1.6) (2021-04-17)

### Bug Fixes

- **navigator:** add app re-export ([7a9db4d](https://github.com/CrowdStrike/ember-browser-services/commit/7a9db4dc9afa62f5b3a20754747897f53aadf746))

## [1.1.5](https://github.com/CrowdStrike/ember-browser-services/compare/v1.1.4...v1.1.5) (2021-04-17)

### Bug Fixes

- **deps:** update dependency ember-cli-htmlbars to ^5.7.1 ([f4062bf](https://github.com/CrowdStrike/ember-browser-services/commit/f4062bfc2b417ef524c2ce28ba82d81cbbdb6e83))

## [1.1.4](https://github.com/CrowdStrike/ember-browser-services/compare/v1.1.3...v1.1.4) (2021-03-15)

### Bug Fixes

- **deps:** update dependency ember-cli-htmlbars to ^5.6.5 ([f60cc89](https://github.com/CrowdStrike/ember-browser-services/commit/f60cc89ad048429ae0a58890030a9b488b096d49))

## [1.1.3](https://github.com/CrowdStrike/ember-browser-services/compare/v1.1.2...v1.1.3) (2021-03-09)

### Bug Fixes

- **deps:** update dependency ember-cli-htmlbars to ^5.6.4 ([35d3b07](https://github.com/CrowdStrike/ember-browser-services/commit/35d3b07a99e4dc69889d29d87f25816be0bb3570))

## [1.1.2](https://github.com/CrowdStrike/ember-browser-services/compare/v1.1.1...v1.1.2) (2021-02-27)

### Bug Fixes

- **deps:** update dependency ember-cli-htmlbars to ^5.6.2 ([60820b8](https://github.com/CrowdStrike/ember-browser-services/commit/60820b8c5e9ce2d07b24565518b322d3e89088eb))

## [1.1.1](https://github.com/CrowdStrike/ember-browser-services/compare/v1.1.0...v1.1.1) (2021-02-26)

### Bug Fixes

- **deps:** update dependency ember-cli-htmlbars to ^5.6.0 ([455b0b3](https://github.com/CrowdStrike/ember-browser-services/commit/455b0b351218da31322c3ad12f9aee384c115fb5))

# [1.1.0](https://github.com/CrowdStrike/ember-browser-services/compare/v1.0.2...v1.1.0) (2021-02-22)

### Features

- add normal object-style stubbing to the navigator ([3e50c60](https://github.com/CrowdStrike/ember-browser-services/commit/3e50c600dcce24ffeb9513b048dbfb42b464a9bf))
- add support for the navigator ([dc34355](https://github.com/CrowdStrike/ember-browser-services/commit/dc3435520823e4354daab32c6122b523d7a68697))

## [1.0.2](https://github.com/CrowdStrike/ember-browser-services/compare/v1.0.1...v1.0.2) (2021-02-16)

### Bug Fixes

- **deps:** update dependency ember-cli-babel to ^7.24.0 ([e84ab13](https://github.com/CrowdStrike/ember-browser-services/commit/e84ab13407e6b6b1832d57e4b606dccdbdac0513))

## [1.0.1](https://github.com/CrowdStrike/ember-browser-services/compare/v1.0.0...v1.0.1) (2021-02-13)

### Bug Fixes

- **ci:** disable persist-credentials option to actions/checkout ([c5fd21c](https://github.com/CrowdStrike/ember-browser-services/commit/c5fd21ce5a869828530dcad6216a6288c8c96662))

# 1.0.0 (2021-02-13)

### Bug Fixes

- package.json scripts ([acdb13c](https://github.com/CrowdStrike/ember-browser-services/commit/acdb13c5fdfc7037d9f9a735b7a63903cfe059da))
- specify 'main' for the release branch for semantic release ([02c533a](https://github.com/CrowdStrike/ember-browser-services/commit/02c533a3e1ef97e638b605829f50a03e9608653d))
- update workflow configuration to reference branch 'main' ([2bcdac9](https://github.com/CrowdStrike/ember-browser-services/commit/2bcdac9f3bc87aa96b6e6f39d8de2db6311175f5))

### chore

- drop support for node 10 ([e7a5550](https://github.com/CrowdStrike/ember-browser-services/commit/e7a55503f34affa76e9fa9111d3678f73c56f90c))

### Features

- automatic releases based on conventional commits ([c43a9f2](https://github.com/CrowdStrike/ember-browser-services/commit/c43a9f21a8a397d7f2ad331f883edafb194b4cc8))
- copy over files - initial implementation ([6b02e23](https://github.com/CrowdStrike/ember-browser-services/commit/6b02e23712ee505ee3c184a31accf9322328b602))
- support all properties on Location ([c5329bb](https://github.com/CrowdStrike/ember-browser-services/commit/c5329bbf80b913e29e6e71cb58d4ea1174ba7893))

### BREAKING CHANGES

- node 10 support dropped
