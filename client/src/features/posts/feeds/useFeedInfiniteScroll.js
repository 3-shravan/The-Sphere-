import { useInfiniteScroll } from "@/hooks";
import { useEffect } from "react";

const THRESOLD_VALUE = 70;
const useFeedInfiniteScroll = ({
   scrollRef,
   hasNextPage,
   fetchNextPage,
   isFetchingNextPage, }) => {

   const { remainingScroll, loading, setLoading, fetchLock } = useInfiniteScroll(
      { THRESOLD_VALUE, scrollRef }
   );

   useEffect(() => {
      if (
         remainingScroll < THRESOLD_VALUE &&
         hasNextPage &&
         !isFetchingNextPage &&
         !fetchLock.current
      ) {
         fetchLock.current = true;
         setLoading(true);
         fetchNextPage().finally(() => {
            setLoading(false);
            setTimeout(() => {
               fetchLock.current = false;
            }, 200);
         });
      }
   }, [
      remainingScroll,
      hasNextPage,
      isFetchingNextPage,
      loading,
      setLoading,
      fetchNextPage,
   ]);
}

export default useFeedInfiniteScroll
