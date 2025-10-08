import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	posts: [],
	savedPosts: [],
};
const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		setPosts: (state, action) => {
			state.posts = action.payload;
		},
		setSavedPosts: (state, action) => {
			state.savedPosts = action.payload;
		},
		singlePost: (state, action) => {
			const post = state.posts.find((post) => post._id === action.payload);
			return post || null;
		},
	},
});

export const { setPosts, setSavedPosts, updateSavedPosts } = postSlice.actions;
export default postSlice.reducer;
