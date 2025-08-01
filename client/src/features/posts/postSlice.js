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
    updateSavedPosts: (state, action) => {
      const { postId } = action.payload;
      const post = state.savedPosts.find((post) => post._id === postId);
      if (!post) return;
      if (savedPosts.includes(postId))
        savedPosts.filter((post) => post._id !== postId);
      else savedPosts.push(postId);
    },
  },
});

export const { setPosts, setSavedPosts, updateSavedPosts } = postSlice.actions;
export default postSlice.reducer;
