


# [Brobot](https://knock-in.github.io/brobot)
[![Build Status](https://travis-ci.org/knock-in/brobot.svg?branch=development)](https://travis-ci.org/knock-in/brobot) [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/knock-in/brobot/tree/master)
---

Brobot is a modular, easy to extend bot, based on Microsofts BotConnectorBot. For more details you can read the documentation [here](http://knock-in.github.io/brobot).

### Live preview
[@brobot on Slack](https://slack.com/oauth/authorize?scope=incoming-webhook,bot&client_id=31074109043.31129660737&redirect_uri=https%3a%2f%2fslack.botframework.com%2fHome%2fauth&state=brobot)

[@tele_brobot on Telegram](https://telegram.me/tele_brobot)

[@brobot on GroupMe](https://groupme.botframework.com/?botId=brobot)

[@brobot on WebChat](https://webchat.botframework.com/embed/brobot?s=obSPJv6ZvGY.cwA.7-M.MoqOAFyt2tL0yvHx3F8hjJAR7AaIasHdwc1lfpD2fsA)

**See Brobot commands below or [here](http://knock-in.github.io/brobot/#toc5__anchor).**


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

### Brobot commands/modules

Let's say you've installed brobot and want to try some commands.
Here is a list of the current commands, keep in mind you can extend them easily:

| Command | Minimum arguments | Example             | Result                                   | Explaination                                       |
|---------|-------------------|---------------------|------------------------------------------|----------------------------------------------------|
| /       | 2                 | / 5 2               | 2.5                                      | Simple division                                    |
| *       | 2                 | * 6 2               | 12                                       | Simple multiplication                              |
| -       | 2                 | - 12 3              | 9                                        | Simple substraction                                |
| +       | 2                 | + 3 8               | 11                                       | Simple addition                                    |
| morse   | 2                 | morse e hello world | .... . .-.. .-.. ---.-- --- .-. .-.. -.. | You can also write morse d to decrypt a morse code |
| pi      | 0                 | pi                  | 3.141592653589793                        |                                                    |
| rev     | 0                 | rev hello world     | world hello                              | Returns input in reversed word order               |
| rrev    | 0                 | rrev hello world    | olleh dlrow                              | Returns every word reversed                        |

**Keep in mind**, you won't get any response until you write `echo` before your command. For example echo + 5 8 will return 13.

### Command/Module chaining

Lets say we have the following command: `echo + 1500 * 2 pi`
This would return: `1506.2831853071796`

Why? You have to read from right to left. First there is `pi` which returns 3.141592653589793 and passes it's value to `2`.
Now passes itself (2) and it's argument (3.141592653589793) to module `*` which will multiply theese two values returning `6.283185307179586`.
This value and the next (`1500`) will finally passed to module `+` which results in `1506.2831853071796`.
`echo` will tell our bot to reply the result to the user. You can chain every other command too, just try it.