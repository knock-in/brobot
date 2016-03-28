const BaseModule = require('./basemodule.js');

class DivideModule extends BaseModule {
  static getOptions() {
    return {
      trigger: '/',
      minArgs: 2,
      active: true,
    };
  }

  work(_args) {
    let i = 0;

    if (this.isNumber(_args[0]) && this.isNumber(_args[1])) {
      this._args.push(Number(_args[0]) / Number(_args[1]));
      i = 2;
    }

    for (let len = _args.length; i < len; i++) {
      this._args.push(_args[i]);
    }
  }
}

module.exports = DivideModule;
