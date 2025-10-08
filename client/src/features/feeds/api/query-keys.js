export const FEEDS_QUERY_KEY = {
	all: ["posts"],

	feeds: () => [...FEEDS_QUERY_KEY.all, "feeds"],
	feed: (type = "all") => [...FEEDS_QUERY_KEY.lists(), { type }],

	// details: () => [...FEEDS_QUERY_KEY.all, "detail"],
	// detail: (id) => [...FEEDS_QUERY_KEY.details(), { id }],
};

/*

Cache Tree
├─ ["posts"]
│  ├─ ["posts", "list"]
│  │   ├─ ["posts", "list", {type: "all"}]
│  │   │     → data: 10 global posts (page 1)
│  │   └─ ["posts", "list", {type: "following"}]
│  │         → data: 5 followed-user posts (page 1)
│  └─ ["posts", "detail"]
│        ├─ ["posts", "detail", {id: "1"}] → post 1
│        ├─ ["posts", "detail", {id: "2"}] → post 2
│        └─ ["posts", "detail", {id: "3"}] → post 3


*/
