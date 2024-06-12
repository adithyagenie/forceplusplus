interface ContestQuestionNode {
	titleSlug: string;
	__typename: string;
}

interface ContestNode {
	title: string;
	titleSlug: string;
	questions: ContestQuestionNode[];
	__typename: string;
}

interface PagifiedContestNode {
	data: ContestNode[];
	__typename: string;
}

export interface PastContestsResponse {
	data: {
		pastContests: PagifiedContestNode;
	};
}