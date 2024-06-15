import { Bot, Context } from "grammy";
import { parseMode, ParseModeFlavor } from "@grammyjs/parse-mode";
import { helpCommand, messageSink, setCommands, startCommand } from "./commands/miscCommands";
import { apiThrottler } from "@grammyjs/transformer-throttler";


export const bot = new Bot<ParseModeFlavor<Context>>(`${process.env.BOT_TOKEN}`);
export type myBot = Bot<ParseModeFlavor<Context>>;

export async function botInit() {
	const throttler = apiThrottler();
	bot.api.config.use(throttler);
	bot.api.config.use(parseMode("HTML"));
	setCommands(bot);
	bot.hears(/^\/start/, async(ctx) => await startCommand(ctx));
	bot.hears(/^\/help/, async(ctx) => await helpCommand(ctx));
	bot.chatType("private").hears(/.+/, async(ctx) => await messageSink(ctx));
	console.log("*********************");
	console.log("Force++ has started!");
	console.log("*********************");
	if (process.env.RUN_METHOD === "POLLING") {
		void bot.start();
	}
}