const Brobot = require('./bot.js');

const options = {
  webHook: {
    host: process.env.IP,
    port: process.env.PORT,
  },
};

const apiToken = process.env.API_TOKEN;

const brobot = new Brobot(apiToken, options, (msg, _args) => {
  let str = '';
  const len = _args.length;

  for (let i = 0; i < len; i++) {
    str += _args[i].toString() + ((len - i > 1) ? ' ' : '');
  }

  brobot.sendMessage(msg.chat.id, str);
});
