const BaseModule = require('./basemodule.js');

class RRevModule extends BaseModule {
  static getOptions() {
    return {
      trigger: 'rrev',
      minArgs: 0,
      active: true,
    };
  }

  work(_args) {
    for (let i = 0; i < _args.length; i++) {
      this._args.push(_args[i].split('').reverse().join(''));
    }
  }
}

module.exports = RRevModule;
