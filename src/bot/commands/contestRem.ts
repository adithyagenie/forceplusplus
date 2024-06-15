import { bot } from "../bot";

export async function reminderContestLC(contestName: string, contestKey: string): Promise<void> {
	const chatids = (process.env.CHAT_ID as string).split(",").map(i => parseInt(i));
	for (const id of chatids) {
		await bot.api.sendMessage(id,
			`LeetCode ${contestName} is in ~10 minutes.\n
Attend the contest here: https://leetcode.com/contest/${contestKey}/`);
	}
}

export async function reminderContestCodeChef(): Promise<void> {
	const chatids = (process.env.CHAT_ID as string).split(",").map(i => parseInt(i));
	for (const id of chatids) {
		await bot.api.sendMessage(id,
			`CodeChef contest is in ~10 minutes.\n
Attend the contest here: https://www.codechef.com/contests/`);
	}
}

export async function reminderContestCF(contestName: string, contestID: number, contestTime: Date) {
	let options: { timeZone: string, timeStyle: "short" } = {
		timeZone: 'Asia/Calcutta',
		timeStyle: "short"
	};
	const chatids = (process.env.CHAT_ID as string).split(",").map(i => parseInt(i));
	for (const id of chatids) {
		await bot.api.sendMessage(id,
			`${contestName} at ${new Date(contestTime).toLocaleTimeString('en-US', options)} IST starts in ~10 minutes.
Attend the contest here: https://codeforces.com/contests/${contestID}`);
	}
}