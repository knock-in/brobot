const BaseModule = require('./basemodule.js');

class MinusModule extends BaseModule {
  static getOptions() {
    return {
      trigger: '-',
      minArgs: 2,
      active: true,
    };
  }

  work(_args, callback) {
    const retArgs = [];
    let i = 0;

    if (this.isNumber(..._args.slice(0, this.constructor.getOptions().minArgs))) {
      retArgs.push(Number(_args[0]) - Number(_args[1]));
      i = 2;
    }

    for (let len = _args.length; i < len; i++) {
      retArgs.push(_args[i]);
    }

    this.pass(retArgs, callback);
  }
}

module.exports = MinusModule;
