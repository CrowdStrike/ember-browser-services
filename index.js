'use strict';

module.exports = {
  name: require('./package').name,

  // enable file-watching / live-reload
  isDevelopingAddon: () => true,

  options: {
    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },
  },
};
