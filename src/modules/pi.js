const BaseModule = require('./basemodule.js');

class PiModule extends BaseModule {
  static getOptions() {
    return {
      trigger: 'pi',
      minArgs: 0,
      active: true,
    };
  }

  work(_args, callback) {
    const retArgs = [];

    // Push pi to returning arguments
    retArgs.push(Math.PI);

    // Push every other argument too, otherwise we would loose them.
    // This is important because the next module needs them maybe.
    for (let i = 0; i < _args.length; i++) {
      retArgs.push(_args[i]);
    }

    // Call pass function with our returning arguments and our callback
    // This function calls the next module
    this.pass(retArgs, callback);
  }
}

module.exports = PiModule;
