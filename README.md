

###	**[Brobot](https://knock-in.github.io/brobot)**	[![Build Status](https://travis-ci.org/knock-in/brobot.svg?branch=master)](https://travis-ci.org/knock-in/brobot)
----------
Brobot is a module-based telegram bot which uses [yagops telegram API](https://github.com/yagop/node-telegram-bot-api) for interaction with telegram. For more information check out the [documentation](https://knock-in.github.io/brobot). (No rhyme intention)

#### **Get started**
First we have to install gulp, if you haven't already type this in your terminal:

`npm install -g gulp`

Now we're ready to setup our repository by typing the following commands into your terminal:

`git clone https://github.com/knock-in/brobot.git`
`cd brobot/`
`npm install`

To create a new brobot instance you have to create a new file in the `src/` directory, the content could look like this:

```javascript
const Brobot = require('./bot.js');
    
    const options = {
      webHook: {
        host: 'your-host',
        port: 'your-port',
      },
    };
    
    const apiToken = 'your-api-token';
    
    const brobot = new Brobot(apiToken, options, (msg, _args) => {
      let str = '';
      const len = _args.length;
    
      for (let i = 0; i < len; i++) {
        str += _args[i].toString() + ((len - i > 1) ? ' ' : '');
      }
    
      brobot.sendMessage(msg.chat.id, str);
    });
```
    
Don't forget to replace your-host, your-port and your-api-token with your actual values.
To build type:

`gulp buildSrc`

Now you can start your bot from `/dist`directory and try out the modules.
   
#### **How to write new modules**

 1. Switch to `/modules`directory.
 2. Create a new .js file in `/modules` directory for example myModule.js.
 3. [Check out how brobot handles it's modules.](https://knock-in.github.io/brobot/docco/moduleExample.html)
 4. If your module looks like the example module and is in the /modules directory, you're done. Brobot detects every new module by itself if it is in the right directory.
 5. `gulp buildSrc` again to build your new module.
 