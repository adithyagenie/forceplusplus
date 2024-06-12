import { reminderContestCodeChef } from "../bot/commands/contestRem";
import { RecurrenceRule, scheduleJob } from "node-schedule";

export function ccSchedule() {
	const rule = new RecurrenceRule();
	rule.dayOfWeek = 3;
	rule.hour = 14;
	rule.minute = 20;
	rule.second = 0;
	rule.tz = "Etc/UTC";
	scheduleJob(`ccContest`, rule, reminderContestCodeChef);
	console.log("CodeChef contests scheduled!")
}