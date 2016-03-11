var BaseModule = require("./basemodule.js");

class ModuleMapper{
    constructor() {
        this.moduleMap = new Map();
        
        var normalizedPath = require("path").join(__dirname, "/");
        var dirs = require("fs").readdirSync(normalizedPath);
        
        for(var i = 0, len = dirs.length;i < len;i++) {
            
            // Dont use index and basemodule as module
            if(dirs[i] != 'index.js' && dirs[i] != 'basemodule.js') { 
                var module = require('./' + dirs[i]);
                
                // Only add module if 'active' flag is set to true and trigger not already in modulemap
                if(module.getOptions().active == true && this.moduleMap.get(module.getOptions().trigger) == null) {
                    this.moduleMap.set(module.getOptions().trigger.toLowerCase(), module);
                }
            }
        }
    }
    
    map(key) {
        var module = this.moduleMap.get(key.toLowerCase());
        if(module == null) {
            module = BaseModule;
        }
        
        return module;
    }
}

module.exports = ModuleMapper;