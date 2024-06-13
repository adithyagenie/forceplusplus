import { cfFetchContests } from "../api/cfFetch";
import { scheduleJob } from "node-schedule";
import { reminderContestCF } from "../bot/commands/contestRem";


export async function cfSchedule() {
	const contests = await cfFetchContests();
	if (contests.length === 0) {
		console.log("No codeforces contests found!");
		return;
	}
	for (let contest of contests) {
		const contestRemTime = new Date((contest.startTime - 600) * 1000);
		const contestTime = new Date(contest.startTime * 1000);
		scheduleJob(`${contest.name}`, contestRemTime, reminderContestCF.bind(null, contest.name, contest.id, contestTime));
	}
	console.log("Codeforces contests scheduled!");
}