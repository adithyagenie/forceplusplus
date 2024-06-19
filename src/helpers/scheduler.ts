import { lcSchedule } from "./lcSchedule";
import { ccSchedule } from "./ccSchedule";
import { cfSchedule } from "./cfSchedule";
import { gracefulShutdown, RecurrenceRule, scheduleJob } from "node-schedule";

export async function contestScheduler() {
	await gracefulShutdown();
	await lcSchedule();
	ccSchedule();
	await cfSchedule();
	console.log("Contests rescheduled!")
}

export async function renewScheduler() {
	const rule = new RecurrenceRule();
	rule.tz = "Etc/UTC";
	rule.hour = 0;
	rule.minute = 0;
	scheduleJob(rule, contestScheduler);
}