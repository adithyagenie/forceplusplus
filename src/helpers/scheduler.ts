import { lcSchedule } from "./lcSchedule";
import { ccSchedule } from "./ccSchedule";
import { cfSchedule } from "./cfSchedule";
import { gracefulShutdown } from "node-schedule";

export async function contestScheduler() {
	await gracefulShutdown();
	await lcSchedule();
	ccSchedule();
	await cfSchedule();
}