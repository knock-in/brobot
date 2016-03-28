const BaseModule = require('./basemodule.js');

class PiModule extends BaseModule {
  static getOptions() {
    return {
      trigger: 'pi',
      minArgs: 0,
      active: true,
    };
  }

  work(_args) {
    this._args.push(Math.PI);
  }
}

module.exports = PiModule;
