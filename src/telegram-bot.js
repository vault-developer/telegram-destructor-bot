const path = require('path');
const dotenv = require('dotenv');
const Telegraf = require('telegraf');
const SocksAgent = require('socks5-https-client/lib/Agent');
const decompose = require('./decompose');

dotenv.config({path: path.join(__dirname, '../.env')});

const {
  TELEGRAM_DESTRUCTOR_BOT_TOKEN,
  TELEGRAM_PROXY_HOST,
  TELEGRAM_PROXY_PORT,
  TELEGRAM_PROXY_USERNAME,
  TELEGRAM_PROXY_PASSWORD
} = process.env;

const socksAgent = new SocksAgent({
  socksHost: TELEGRAM_PROXY_HOST,
  socksPort: TELEGRAM_PROXY_PORT,
  socksUsername: TELEGRAM_PROXY_USERNAME,
  socksPassword: TELEGRAM_PROXY_PASSWORD
});

const bot = new Telegraf(TELEGRAM_DESTRUCTOR_BOT_TOKEN, {
  telegram: {agent: socksAgent}
});

bot.start((ctx) => ctx.reply('Hello! I am a robot-decomposer. I can make factorization of your number.'));
bot.on('message', ctx => {
  const {text} = ctx.message;
  if (isNaN(text) || Number(text) < 1 || !Number.isInteger(Number(text))){
    ctx.reply('Please send me natural number, or I won\'t be able to help =(');
  } else {
    decompose(Number(text))
      .then(res => ctx.reply(res))
      .catch(err => ctx.reply(err));
  }

});
bot.launch();
