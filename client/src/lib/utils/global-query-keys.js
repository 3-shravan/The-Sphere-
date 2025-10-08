export const POSTS_QUERY_KEY = {
  all: ["posts"],

  // --- FEEDS ---
  feeds: () => [...POSTS_QUERY_KEY.all, "feeds"],
  feed: (type = "all") => [...POSTS_QUERY_KEY.feeds(), { type }],

  // --- SAVED POSTS ---
  saved: () => [...POSTS_QUERY_KEY.all, "saved"],

  // --- PROFILE POSTS ---
  profiles: () => [...POSTS_QUERY_KEY.all, "profiles"],
  profile: (userId) => [...POSTS_QUERY_KEY.profiles(), { userId }],

  // --- INDIVIDUAL POST DETAIL ---
  details: () => [...POSTS_QUERY_KEY.all, "detail"],
  detail: (id) => [...POSTS_QUERY_KEY.details(), { id }],
}

/*
 
 ["posts"]                               ← root (everything post-related)
│
├── ["posts", "feeds"]                  ← all paginated feed lists
│   ├── ["posts", "feeds", {type:"all"}]        ← /posts?page=...
│   └── ["posts", "feeds", {type:"following"}]  ← /posts/following?page=...
│
├── ["posts", "saved"]                  ← non-paginated list of saved posts
│
├── ["posts", "profiles"]               ← profile-specific posts
│   ├── ["posts", "profiles", {userId:"123"}]   ← /users/123/posts?page=...
│   └── ["posts", "profiles", {userId:"456"}]   ← /users/456/posts?page=...
│
└── ["posts", "detail"]                 ← individual post
    └── ["posts", "detail", {id:"abc"}]         ← /posts/abc

 
 */
