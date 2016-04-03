const BaseModule = require('./basemodule.js');
const morse = require('morse');

class MorseModule extends BaseModule {
  static getOptions() {
    return {
      trigger: 'morse',
      minArgs: 2,
      active: true,
    };
  }

  work(_args, callback) {
    const retArgs = [];

    if (_args[0].toLowerCase() === 'e') {
      // Encode
      for (let i = 1; i < _args.length; i++) {
        retArgs.push(morse.encode(_args[i]));
      }
    } else if (_args[0].toLowerCase() === 'd') {
      // Decode
      for (let i = 1; i < _args.length; i++) {
        retArgs.push(morse.decode(_args[i]).toLowerCase());
      }
    } else {
      // Neither encrypt or decrypt so return all arguments
      retArgs.push(this.token);
      for (let i = 0; i < _args.length; i++) {
        retArgs.push(_args[i]);
      }
    }

    this.pass(retArgs, callback);
  }
}

module.exports = MorseModule;
