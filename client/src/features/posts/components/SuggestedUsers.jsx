import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSuggestedUsers } from "../services";

const SuggestedUsers = ({ posts }) => {
  const { data, isLoading, error } = useSuggestedUsers();
  const suggestedUsers = data?.users || [];

  return (
    <div className=" h-[40vh] rounded-4xl border border-neutral-700 hidden w-[30%] md:flex flex-col gap-3 py-8 px-5 md:px-8 m-3 lg:p-4">
      <h2 className=" text-2xl font-bold text-foreground leading-tight tracking-tighter md:text-2xl md:font-bold md:leading-tight md:tracking-tighter md:w-auto w-full  ">
        Suggestions
      </h2>

      <div className=" flex flex-col gap-1 py-2 w-full ">
        {suggestedUsers &&
          suggestedUsers.map((user) => (
            <div
              key={user._id}
              className="flex flex-col bg-background rounded-full gap-2 p-1 w-full"
            >
              <div className="flex items-center px-0.5 pr-1 justify-between">
                <div className="flex gap-3 items-center">
                  <img
                    src={
                      user.profilePicture ||
                      "/assets/icons/profile-placeholder.svg"
                    }
                    className="rounded-full  w-9 h-9"
                  />
                  <h2 className="text-sm font-bold text-muted-foreground ">
                    {user.name}
                  </h2>
                </div>

                <Button
                  size={"sm"}
                  variant="secondary"
                  className="font-bold text-xs cursor-pointer bg-foreground text-background rounded-full font-Poppins"
                >
                  Follow
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SuggestedUsers;
