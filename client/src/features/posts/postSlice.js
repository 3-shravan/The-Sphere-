import { createSlice } from "@reduxjs/toolkit";
const initialState = {
   posts: [],
   savedPosts: []
};
const postSlice = createSlice({
   name: 'posts',
   initialState,
   reducers: {
      setPosts: (state, action) => {
         state.posts = action.payload;
      },
      updatePostLikes: (state, action) => {
         const { postId, userId } = action.payload;
         const post = state.posts.find(post => post._id === postId);
         if (post) {
            if (post.likes.includes(userId))
               post.likes = post.likes.filter(id => id !== userId)
            else
               post.likes.push(userId)
         }
      },
      setSavedPosts: (state, action) => {
         state.savedPosts = action.payload;
      },
      updateSavedPosts: (state, action) => {
         const { postId } = action.payload;
         const post = state.savedPosts.find(post => post._id === postId);
         if (!post) return;
         if (savedPosts.includes(postId)) savedPosts.filter(post => post._id !== postId)
         else savedPosts.push(postId)
      }
   }
});

export const {
   setPosts,
   updatePostLikes,
   setSavedPosts,
   updateSavedPosts } = postSlice.actions;
export default postSlice.reducer;