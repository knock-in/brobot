class BaseModule {
  constructor(session, token, node, _args) {
    this.session = session;
    this.token = token;
    this.node = node;
    this._args = _args || [];
  }

  static getOptions() {
    return {
      trigger: '',
      minArgs: 0,
      active: true,
    };
  }

  isNumber(...values) {
    for(var i = 0;i < values.length;i++) {
      if(isNaN(Number(values[i]))) {
        return false;
      }
    }
    return true;
  }

  isString(...values) {
    return !this.isNumber(...values);
  }

  execute(_args, callback) {
    const minArgs = this.constructor.getOptions().minArgs;

    // Option "minArgs" ensures that the module will only get called if the user
    // passed enough arguments for it, otherwise it will skip this module
    if (_args.length >= minArgs) {
      // Enough arguments so do the module-work
      this.work(_args || [], callback);
    } else {
      // Not enough arguments for this module so just pass them all to the next
      // module, which meets the requirements hopefully
      this._args.push(this.token);

      for (let i = 0; i < _args.length; i++) {
        this._args.push(_args[i]);
      }

      this.pass(this._args, callback);
    }
  }

  work(_args, callback) {
    const retArgs = [];

    retArgs.push(this.token);

    for (let i = 0, len = _args.length; i < len; i++) {
      retArgs.push(_args[i]);
    }

    this.pass(retArgs, callback);
  }

  pass(_args, callback) {
    if (this.node.prev !== null) {
      this.node.prev.getData().execute(_args, callback);
    } else {
      callback(this.session, _args);
    }
  }
}

module.exports = BaseModule;
