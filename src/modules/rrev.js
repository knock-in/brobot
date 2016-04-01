const BaseModule = require('./basemodule.js');

class RRevModule extends BaseModule {
  static getOptions() {
    return {
      trigger: 'rrev',
      minArgs: 0,
      active: true,
    };
  }

  work(_args, callback) {
    const retArgs = [];
    for (let i = 0; i < _args.length; i++) {
      retArgs.push(_args[i].split('').reverse().join(''));
    }
    this.pass(retArgs, callback);
  }
}

module.exports = RRevModule;
