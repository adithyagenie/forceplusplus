import { PastContestsResponse } from "./interface";


export async function fetchLCContests() {
	const query = {
		operationName: "mostRecentPastContest",
		variables: {},
		query: `query mostRecentPastContest {
        pastContests(pageNo: 1, numPerPage: 3) {
            data {
                title
                titleSlug
                questions {
                    titleSlug
                    __typename
                }
                __typename
            }
            __typename
        }
    }`
	};
	const resp = await fetch('https://leetcode.com/graphql', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(query),
	})
	if (resp.ok) {
		const res = await resp.json() as PastContestsResponse;
		let contestNames = res.data.pastContests.data.map(o => {
			return {key: o.titleSlug, name: o.title};
		});
		contestNames.sort();
		return contestNames;
	}
	else {
		throw new Error("Can't access LeetCode API :(");
	}
}

// {"operationName":"mostRecentPastContest","variables":{},"query":"query mostRecentPastContest {\n  pastContests(pageNo: 1, numPerPage: 1) {\n    data {\n      title\n      titleSlug\n      questions {\n        titleSlug\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n"}