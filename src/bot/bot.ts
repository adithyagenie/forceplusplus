import { Bot, Context } from "grammy";
import { parseMode, ParseModeFlavor } from "@grammyjs/parse-mode";
import { startCommand } from "./commands/miscCommands";


export const bot = new Bot<ParseModeFlavor<Context>>(`${process.env.BOT_TOKEN}`);
export async function botInit() {
	bot.api.config.use(parseMode("HTML"));
	bot.hears(/^\/start/, async(ctx) => await startCommand(ctx));

	console.log("*********************");
	console.log("Force++ has started!");
	console.log("*********************");
	if (process.env.RUN_METHOD === "POLLING") {
		void bot.start();
	}
}