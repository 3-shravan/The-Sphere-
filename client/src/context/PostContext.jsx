import { createContext, useContext, useState } from "react";

export const PostContext = createContext();
export function PostProvider({ children }) {
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);

  return <PostContext.Provider value={{}}>{children}</PostContext.Provider>;
}

export const usePost = () => useContext(PostContext);
