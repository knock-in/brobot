const Brobot = require('./bot.js');

const options = {
  webHook: {
    host: process.env.IP,
    port: process.env.PORT,
  },
};

const appToken = process.env.appToken;

const brobot = new Brobot(appToken, options, (msg, _args) => {
  let str = '';
  const len = _args.length;

  for (let i = 0; i < len; i++) {
    str += _args[i].toString() + ((len - i > 1) ? ' ' : '');
  }

  brobot.sendMessage(msg.chat.id, str);
});
