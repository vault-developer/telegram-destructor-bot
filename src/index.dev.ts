import Telegraf from "telegraf";
import { setBotResponses } from "./bot.responses";

const debug = require("debug")("serverless-bot: ");
const BOT_TOKEN = process.env.BOT_TOKEN;

export const bot = new Telegraf(BOT_TOKEN);

const initLocalBot = async () => {
	debug("Bot is running in development mode");
	bot.webhookReply = false;
	const botInfo = await bot.telegram.getMe();
	debug("Server has initialized bot username: ", botInfo.username);
	debug("deleting webhook");
	await bot.telegram.deleteWebhook();
	setBotResponses(bot);
	bot.launch();
}

initLocalBot()
