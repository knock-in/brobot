

###	**[Brobot](https://knock-in.github.io/brobot)**	[![Build Status](https://travis-ci.org/knock-in/brobot.svg?branch=master)](https://travis-ci.org/knock-in/brobot)
----------
Brobot is a module-based telegram bot which uses [yagops telegram API](https://github.com/yagop/node-telegram-bot-api) for interaction with telegram. For more information check out the [documentation](https://knock-in.github.io/brobot). (No rhyme intention)

#### **Getting started!**

Type the following commands into your terminal:

`git clone https://github.com/knock-in/brobot.git`

`cd brobot/`

`npm install -g gulp-cli`

`npm install`

Now open `src/app.js` and replace `process.env.HOST` and `process.env.IP` with the actual host and ip brobot should listen for incoming messages, then replace `process.env.API_TOKEN` with your bot's API Token which Botfather gave you. Altenatively you can also just set the right environment variables.

To build finally:

`gulp`

Now you can start your bot with:

`npm start`

#### **How to write new modules**

 1. Switch to `/modules`directory.
 2. Create a new .js file in `/modules` directory for example myModule.js.
 3. [Check out how brobot handles it's modules.](https://knock-in.github.io/brobot/docco/exampleModule.html)
 4. If your module looks like the example module and is in the /modules directory, you're done. Brobot detects every new module by itself if it is in the right directory.
 5. `gulp` again to build your new module.
 