const BaseModule = require('./basemodule.js');

class ToBaseModule extends BaseModule {
  static getOptions() {
    return {
      trigger: 'tobase',
      minArgs: 2,
      active: true,
    };
  }

  work(_args, callback) {
    const retArgs = [];
    
    // First argument is base we want to convert our value(second argument)
    if (this.isNumber(..._args.slice(0, this.constructor.getOptions().minArgs))) {
      
      // Base must be between 2 and 36, see: http://www.w3schools.com/jsref/jsref_tostring_number.asp
      if(_args[0] >= 2 && _args[0] <= 36) {
        // returning converted argument
        retArgs.push(Number(_args[1]).toString(_args[0]).toUpperCase());

        // Now append rest arguments without the first two we used to convert
        retArgs.concat(_args.slice(this.constructor.getOptions().minArgs));

      } else {
        // Requirements not met so return all arguments
        retArgs.push(this.token);
        retArgs.concat(_args);
      }
    }

    this.pass(retArgs, callback);
  }
}

module.exports = ToBaseModule;
