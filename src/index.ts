import { config } from "dotenv";
config();

import { FastifyInstance } from "fastify";
import { startserver } from "./api/server";
import { botInit } from "./bot/bot";
import { contestScheduler } from "./helpers/scheduler";


export let server: FastifyInstance;
startserver().then((s) => {
	server = s;
});
contestScheduler().catch(e => console.error(e));
botInit().catch(e => console.error(e));