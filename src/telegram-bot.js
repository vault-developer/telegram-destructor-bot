const path = require('path');
const dotenv = require('dotenv');
const Telegraf = require('telegraf');
const SocksAgent = require('socks5-https-client/lib/Agent');
const spread = require('./spread');

dotenv.config({path: path.join(__dirname, '../.env')});

const {
  TELEGRAM_BOT_TOKEN,
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

const bot = new Telegraf(TELEGRAM_BOT_TOKEN, {
  telegram: {agent: socksAgent}
});

bot.start((ctx) => ctx.reply('Привет! Я робот-разлагатор. Напиши мне любое число, и я разложу его на простые множители.'));
bot.on('message', ctx => {
  const {text} = ctx.message;
  if (isNaN(text) || Number(text) < 2){
    ctx.reply('Пожалуйста, введи число > 1, иначе я ничем не смогу помочь =(');
  } else {
    spread(Number(text))
      .then(res => ctx.reply(res))
      .catch(err => ctx.reply(err));
  }

});
bot.launch();
