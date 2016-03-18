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

  work(_args) {
    if (_args[0].toLowerCase() === 'e') {
      // Encode
      for (let i = 1; i < _args.length; i++) {
        this._args.push(morse.encode(_args[i]));
      }
    } else if (_args[0].toLowerCase() === 'd') {
      // Decode
      for (let i = 1; i < _args.length; i++) {
        this._args.push(morse.decode(_args[i]));
      }
    } else {
      // Neither encrypt or decrypt so return all arguments
      this._args.push(this.token);
      for (let i = 0; i < _args.length; i++) {
        this._args.push(_args[i]);
      }
    }
  }
}

module.exports = MorseModule;
