import { config } from "dotenv";
config();

import { FastifyInstance } from "fastify";
import { startserver } from "./api/server";
import { botInit } from "./bot/bot";
import { scheduleLCContests } from "./api/lcFetch";


export let server: FastifyInstance;
startserver().then((s) => {
	server = s;
});
scheduleLCContests().catch(e => console.error(e));
botInit().catch(e => console.error(e));