// # How Brobot handles it's modules
// ----------------
// ## Example Module


// First of all we require our BaseModule
const BaseModule = require('./basemodule.js');

// Every module we build have to extend the basemodule to work properly
class ExampleModule extends BaseModule {
  // This static function describes our module options
  static getOptions() {
    return {
      // The **trigger** is the word which **calls** the module
      trigger: 'example',
      // **minArgs** specify how many arguments our module needs **at least to get
      // called**, for example a message like 'example hey' would not call our
      // because there is only one argument(hey) but we need at least 2
      minArgs: 2,
      // **Active** decides if this module should be active or not
      active: false,
    };
  }

  // Everytime a user triggers a module it's **work** function gets called, and
  // the arguments get passed with parameter **_args** which is a string array
  // We have to pass returning arguments and **callback** to **pass function**
  work(_args, callback) {
    const retArgs = [];
    // retArgs is a string array to which holds the arguments which our
    // module **returns**, so if we want to reply to our users we have to push
    // strings to retArgs and pass them with **this.pass** like in this example
    // Fill array
    retArgs.push('I am an example argument');
    retArgs.push('I am another argument');
    // Pass array
    this.pass(retArgs, callback);
  }
}

// Finally we have to **export our module**
module.exports = ExampleModule;
