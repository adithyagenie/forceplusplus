import { gracefulShutdown, RecurrenceRule, scheduleJob } from "node-schedule";
import { reminderContestLC } from "../bot/commands/contestRem";
import { fetchLCContests } from "../api/lcFetch";

function getNextBiweeklyDate(): Date {
	const now = new Date();
	now.setUTCFullYear(2024, 5, 8);
	now.setUTCHours(14, 30, 0, 0);

	for (let i = 0; i < 500; i++) {
		now.setDate(now.getDate() + 14);
		if (now > new Date()) {
			break;
		}
	}

	return now;
}



export async function lcSchedule() {
	const contestNames = await fetchLCContests();
	const biweekly = contestNames.filter(o =>
		o.key.match(/^biweekly-contest-(\d+)$/)
	);
	const weekly = contestNames.filter(o =>
		o.key.match(/^weekly-contest-(\d+)$/)
	);

	if (biweekly.length > 0) {
		biweekly.sort((a, b) => a > b ? - 1 : 1);
		const matches = biweekly[0].key.match(/^biweekly-contest-(\d+)$/);

		const newnum = matches ? parseInt(matches[1]) + 1 : -1;
		const newkey = weekly[0].key.replace((newnum - 1).toString(), newnum.toString());
		const newname = weekly[0].name.replace((newnum - 1).toString(), newnum.toString());

		const date = getNextBiweeklyDate();
		date.setMinutes(date.getMinutes() - 10);

		scheduleJob(`${newname}`, date, async function (newname: string, newkey: string) {
			await reminderContestLC(newname, newkey)
		}.bind(null, newname, newkey));
	}

	if (weekly.length > 0) {
		weekly.sort((a, b) => a > b ? - 1 : 1);
		const matches = weekly[0].key.match(/^weekly-contest-(\d+)$/);

		const newnum = matches ? parseInt(matches[1]) + 1 : -1;
		const newkey = weekly[0].key.replace((newnum - 1).toString(), newnum.toString());
		const newname = weekly[0].name.replace((newnum - 1).toString(), newnum.toString());

		const weeklyJob = new RecurrenceRule();
		weeklyJob.dayOfWeek = 0;
		weeklyJob.hour = 2;
		weeklyJob.minute = 20;
		weeklyJob.second = 0;
		weeklyJob.tz = "Etc/UTC";

		scheduleJob(`${newname}`, weeklyJob, async function (newname: string, newkey: string) {
			await reminderContestLC(newname, newkey)
		}.bind(null, newname, newkey));

	}
	console.log("Scheduled reminders for LeetCode contests!");
}