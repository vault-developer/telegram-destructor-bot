import Telegraf from "telegraf";
import decompose from "./helpers.decompose";

export const setBotResponses = bot => {
  bot.use(Telegraf.log());
  bot.start(ctx => ctx.reply("Hello! I am a robot-decomposer. I can make factorization of your number."));
  bot.on("message", ctx => {
    const { text } = ctx.message;
    const isInvalid = isNaN(text) || Number(text) < 1 || !Number.isInteger(Number(text));

    if (isInvalid) {
      ctx.reply("Please send me natural number, or I won't be able to help =(");
    } else {
      decompose(Number(text))
        .then(res => ctx.reply(res))
        .catch(err => ctx.reply(err));
    }

  });
};
