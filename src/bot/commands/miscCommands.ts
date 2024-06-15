import { Context } from "grammy";
import { myBot } from "../bot";

export function setCommands(bot: myBot) {
	void bot.api.setMyCommands([
		{ command: "start", description: "👀" },
		{ command: "help", description: "🤨" }
	]);
	return;
}

export async function startCommand(ctx: Context) {
	await ctx.reply(`
Hello! I'm Force++, your coding contest notification bot.

🔔 Currently, I'm not open for public use. Stay tuned for future updates.`);
}

export async function helpCommand(ctx: Context) {
	await ctx.reply(`
I'm Force++ (F++), a bot designed to give reminders for contests over different competitive coding platforms.

⚠️I'm not <b>available for public use</b> and currently under development. Check out my source code over <a href="https://git.ptr.moe/adithyagenie/forceplusplus">here</a>.
Designed by @adithyagenie.`)
}

export async function messageSink(ctx: Context) {
	await ctx.reply(`This bot is not available for public use! Kindly check back later!`);
}

