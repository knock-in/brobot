const Brobot = require('./brobot.js');
const restify = require('restify');

const appId = process.env.APP_ID || 'appID';
const appSecret = process.env.APP_SECRET || 'appSecret';

const brobot = new Brobot(options, (session, _args) => {
  let str = '';
  const len = _args.length;

  for (let i = 0; i < len; i++) {
    str += _args[i].toString() + ((len - i > 1) ? ' ' : '');
  }

  session.send(str);
});

const server = restify.createServer();
server.post('/api/messages', brobot.verifyBotFramework(), brobot.listen());

server.listen(process.env.PORT || 8080, () => {
  console.log('%s listening to %s', server.name, server.url);
});
