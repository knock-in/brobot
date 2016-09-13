var Brobot = require('../dist/brobot.js');
var restify = require('restify');

var appId = process.env.APP_ID || 'YourAppId';
var appSecret = process.env.APP_SECRET || 'YourAppSecret';

// Initialize brobot with appId and appSecret of BotConnector. Read more: http://docs.botframework.com/connector/getstarted/#navtitle
var brobot = new Brobot({ appId: appId, appSecret: appSecret }, function(session, _args) {
  var str = '';

  // Store count of arguments brobot returned for this message
  var len = _args.length;

  // Iterate throught every argument
  for (var i = 0; i < len; i++) {
    // Append every argument to 'str'
    str += _args[i];
  }

  // Reply to our chat with result of message
  session.send(str);
});

// This is just the server which listens for new messages from botconnector
const server = restify.createServer();
server.post('/api/messages', brobot.listen());

server.listen(process.env.PORT || 8080, () => {
  console.log('%s listening to %s', server.name, server.url);
});
