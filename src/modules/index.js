const BaseModule = require('./basemodule.js');

class ModuleMap {
  constructor() {
    this.moduleMap = new Map();

    const normalizedPath = require('path').join(__dirname, '/');
    const dirs = require('fs').readdirSync(normalizedPath);

    for (let i = 0, len = dirs.length; i < len; i++) {
      // Dont use index and basemodule as module
      if (dirs[i] !== 'index.js' && dirs[i] !== 'basemodule.js') {
        const module = require(`./${dirs[i]}`);

        // Only add module if 'active' flag is set to true and trigger not already in modulemap
        if (module.getOptions().active && this.exists(module.getOptions().trigger) === false) {
          this.moduleMap.set(module.getOptions().trigger.toLowerCase(), module);
        }
      }
    }
  }

  get(key) {
    const module = this.moduleMap.get(key.toLowerCase());

    if (module === undefined) {
      // If module not in modulemap - so undefined - return basemodule
      return BaseModule;
    }

    // Otherwise return module
    return module;
  }

  exists(key) {
    return this.moduleMap.get(key) !== undefined;
  }
}

module.exports = ModuleMap;
