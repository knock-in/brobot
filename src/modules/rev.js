const BaseModule = require('./basemodule.js');

class RevModule extends BaseModule {
  static getOptions() {
    return {
      trigger: 'rev',
      minArgs: 0,
      active: true,
    };
  }

  work(_args) {
    this._args = _args.reverse();
  }
}

module.exports = RevModule;
