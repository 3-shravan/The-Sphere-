import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
// import { useSuggestedUsers } from "../services";

const SuggestedUsers = ({ posts }) => {
  // const { data, isLoading, error } = useSuggestedUsers();
  // const suggestedUsers = data?.users || [];

  return (
    <div className=" h-[40vh] w-full rounded-3xl border-1 bg-card border-muted hidden  md:flex flex-col gap-3 py-8 px-5 md:px-8 lg:p-4">
      <h2 className=" text-xl font-bold text-foreground leading-tight tracking-tighter font-Futura md:text-xl md:font-bold md:leading-tight md:tracking-tighter md:w-auto w-full  ">
        you may know
      </h2>
      <div className="flex h-full rounded-2xl overflow-hidden scroll-auto flex-col gap-1 py-2 w-full bg-neutral-700 "></div>

    
    </div>
  );
};

export default SuggestedUsers;
