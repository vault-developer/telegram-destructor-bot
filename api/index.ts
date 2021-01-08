import { NowRequest, NowResponse } from "@vercel/node";

import { useWebhook } from "../src/index.prod";

export default async function handle(req: NowRequest, res: NowResponse) {
	try {
		await useWebhook(req, res);
	} catch (e) {
		res.statusCode = 500;
		res.setHeader("Content-Type", "text/html");
		res.end("<h1>Internal Server Error</h1>");
		console.error(e.message);
	}
}
