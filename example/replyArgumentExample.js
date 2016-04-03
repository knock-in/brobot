var Brobot = require('../dist/brobot.js');
var restify = require('restify');

var appId = process.env.APP_ID || 'appID';
var appSecret = process.env.APP_SECRET || 'appSecret';

var brobot = new Brobot({ appId: appId, appSecret: appSecret }, function(session, _args) {
  var str = '';
  const len = _args.length;

  for (var i = 0; i < len; i++) {
    str += _args[i].toString() + ((len - i > 1) ? ' ' : '');
  }

  session.send(str);
});

const server = restify.createServer();
server.post('/api/messages', brobot.verifyBotFramework(), brobot.listen());

server.listen(process.env.PORT || 8080, () => {
  console.log('%s listening to %s', server.name, server.url);
});
