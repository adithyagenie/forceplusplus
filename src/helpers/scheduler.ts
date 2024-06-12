import { lcSchedule } from "./lcSchedule";
import { ccSchedule } from "./ccSchedule";

export async function contestScheduler() {
	await lcSchedule();
	ccSchedule();
}