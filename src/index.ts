import { config } from "dotenv";
import { FastifyInstance } from "fastify";
import { startserver } from "./api/server";
import { botInit } from "./bot/bot";
import { contestScheduler } from "./helpers/scheduler";

config();

if (process.env.BOT_TOKEN === undefined ||
	process.env.RUN_METHOD === undefined ||
	(process.env.RUN_METHOD !== "POLLING" && process.env.RUN_METHOD !== "WEBHOOK") ||
	process.env.CHAT_ID === undefined ||
	(process.env.RUN_METHOD === "WEBHOOK" && (process.env.WEBHOOK_URL === undefined || process.env.WEBHOOK_SECRET === undefined))
) {
	console.error("ENV variables are not set correctly.");
	process.exit(1);
}


export let server: FastifyInstance;
startserver().then((s) => {
	server = s;
});
contestScheduler().catch(e => console.error(e));
botInit().catch(e => console.error(e));