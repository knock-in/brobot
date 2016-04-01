const BaseModule = require('./basemodule.js');

class BotModule extends BaseModule {

  static getOptions() {
    return {
      trigger: 'bro',
      minArgs: 1,
      active: true,
    };
  }

  // This is always the last instance before user gets response
  work(_args) {
    if (_args[0].toLowerCase() === 'echo') {
      // echo arguments
      for (let i = 1; i < _args.length; i++) {
        this._args.push(_args[i]);
      }
    } else {
      // Every other case surpress output
    }
  }
}

module.exports = BotModule;
