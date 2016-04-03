

#[Brobot](https://knock-in.github.io/brobot)	[![Build Status](https://travis-ci.org/knock-in/brobot.svg?branch=development)](https://travis-ci.org/knock-in/brobot)

----------

Brobot is a modular, easy to extend bot, based on Microsofts BotConnectorBot. For more details you can read the documentation here.

### Getting started

Install Brobot with this command:

`npm install brobot`

### Examples

You can find some examples in the examples directory in this repo.

Like this:

```javascript
var Brobot = require('brobot');
var restify = require('restify');

var appId = process.env.APP_ID || 'YourAppId';
var appSecret = process.env.APP_SECRET || 'YourAppSecret';

// Initialize brobot with appId and appSecret of BotConnector. Read more: http://docs.botframework.com/connector/getstarted/#navtitle
var brobot = new Brobot({ appId: appId, appSecret: appSecret }, function(session, returnArgs) {
  var response = '';

  // Store count of arguments brobot returned for this message
  var argCount = returnArgs.length;

  // Iterate throught every argument
  for (var i = 0; i < argCount; i++) {
    // Append every argument to 'str'
    response += returnArgs[i];
  }

  // Reply to our chat with result of message
  session.send(response);
});

// This is just the server which listens for new messages from botconnector
const server = restify.createServer();
server.post('/api/messages', brobot.verifyBotFramework(), brobot.listen());

server.listen(process.env.PORT || 8080, () => {
  console.log('%s listening to %s', server.name, server.url);
});
```

### Add new modules

Brobot handles every .js file in /src/modules as a module. If you want to know how a module should look like, click [here](http://knock-in.github.io/brobot/docco/exampleModule.html).

To add new modules to this repo you should fork, add a module and make a pull request. I'll review it as soon as possible.

