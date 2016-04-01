const BaseModule = require('./basemodule.js');

class RevModule extends BaseModule {
  static getOptions() {
    return {
      trigger: 'rev',
      minArgs: 0,
      active: true,
    };
  }

  work(_args, callback) {
    this.pass(_args.reverse(), callback);
  }
}

module.exports = RevModule;
