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
  work(_args, callback) {
    const retArgs = [];

    if (_args[0].toLowerCase() === 'echo') {
      // echo arguments
      for (let i = 1; i < _args.length; i++) {
        retArgs.push(_args[i]);
      }
    }

    this.pass(retArgs, callback);
  }
}

module.exports = BotModule;
