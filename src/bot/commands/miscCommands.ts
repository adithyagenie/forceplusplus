import { Context } from "grammy";

export async function startCommand(ctx: Context) {
	await ctx.reply("Yo!");
	return;
}