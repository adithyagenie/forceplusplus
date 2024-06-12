import { bot } from "../bot";

export async function reminderContestLC(contestName: string, contestKey: string): Promise<void> {
	await bot.api.sendMessage(parseInt(process.env.CHAT_ID as string),
		`LeetCode ${contestName} is in ~10 minutes.\n
Attend the contest here: https://leetcode.com/contest/${contestKey}/`);
}

export async function reminderContestCodeChef(): Promise<void> {
	await bot.api.sendMessage(parseInt(process.env.CHAT_ID as string),
		`CodeChef contest is in ~10 minutes.\n
Attend the contest here: https://www.codechef.com/contests/`);
}