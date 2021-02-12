import Application from '@ember/application';
import Resolver from 'ember-resolver';
import config from 'dummy/config/environment';
import loadInitializers from 'ember-load-initializers';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
