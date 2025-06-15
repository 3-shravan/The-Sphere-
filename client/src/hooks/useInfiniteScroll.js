import { useEffect, useRef, useState } from "react";

const useInfiniteScroll = ({ thresold = 50, scrollRef }) => {
   const [remainingScroll, setRemainingScroll] = useState(null);
   const [loading, setLoading] = useState(false);
   const fetchLock = useRef(false);

   const handleScroll = () => {
      if (!scrollRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const remScroll = scrollHeight - (scrollTop + clientHeight);
      setRemainingScroll(remScroll);

      if (remScroll < thresold && !loading) {
         setLoading(true);
      }
   };

   useEffect(() => {
      const container = scrollRef.current;
      if (!container) return;
      container.addEventListener("scroll", handleScroll);

      return () => container.removeEventListener("scroll", handleScroll);
   }, [loading]);

   // You should reset `loading` after fetching new data in the component
   return { remainingScroll, loading, setLoading, fetchLock };
};

export default useInfiniteScroll;
