import { NowRequest, NowResponse } from "@vercel/node";
import Telegraf from "telegraf";
import { setBotResponses } from "./bot.responses";

const {VERCEL_URL, BOT_TOKEN} = process.env;

export const bot = new Telegraf(BOT_TOKEN);

export async function useWebhook(req: NowRequest, res: NowResponse) {
	const getWebhookInfo = await bot.telegram.getWebhookInfo();
	const botInfo = await bot.telegram.getMe();
	console.info("Server has initialized bot username using Webhook. ", botInfo.username);
	if (getWebhookInfo.url !== VERCEL_URL + "/api") {
		await bot.telegram.deleteWebhook();
		await bot.telegram.setWebhook(`${VERCEL_URL}/api`);
	}

	setBotResponses(bot);

	if (req.method === "POST") {
		await bot.handleUpdate(req.body, res);
	} else {
		res.status(200).json("Listening to bot events...")
	}
}
