// exposes proper endpoint and handles api calls

import { bot } from "../bot/bot";
import { webhookCallback } from "grammy";
import fastify from "fastify";

export async function startserver() {
	const port = parseInt(process.env.PORT as string) || 4000;
	const server = fastify({ logger: false });

	if (process.env.RUN_METHOD === "WEBHOOK") {
		server.post(`/`, webhookCallback(bot, "fastify", { secretToken: process.env.WEBHOOK_SECRET as string }));
		server.setErrorHandler(async(err, req, res) => {
			console.error(`Encountered error: ${err.name}\nStack trace: ${err.stack}`);
			await res.status(200).send({});
		});
	}
	server.get("/", async() => {
		return "Force++ bot up and running ^_^";
	});
	await server.listen({ port: port, host: "0.0.0.0" });
	console.log("Server up!")
	if (process.env.RUN_METHOD === "WEBHOOK")
		await bot.api.setWebhook(`${process.env.WEBHOOK_URL}`, { secret_token: process.env.WEBHOOK_SECRET as string });
	console.log(`Force++ server listening on port ${port}!`);

	return server;
}
