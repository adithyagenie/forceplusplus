import { CodeforcesAPI } from "codeforces-api-ts";

export async function cfFetchContests(): Promise<{ name: string; startTime: number; id: number }[]> {
	const res = await CodeforcesAPI.call("contest.list", {});
	if (res.status == "OK") {
		let futureContests = res.result.filter(o => o.phase == "BEFORE");
		futureContests.filter(o => o.name.includes("Codeforces") && o.name.includes("Div. ") && o.startTimeSeconds !== undefined);
		return futureContests.map((o) => ({
			name: o.name,
			id: o.id,
			startTime: o.startTimeSeconds as number
		}));
	} else {
		throw new Error("Unable to reach Codeforces API :(");
	}
}
