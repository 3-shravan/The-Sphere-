import React from "react";

const Near = () => {
  return (
    <div className="absolute right-57 top-13 w-64 bg-black/40 border border-gray-600 backdrop-blur-md rounded-3xl p-4 z-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white font-bold uppercase">Near you</h2>
        <button className="text-white">&gt;</button>
      </div>

      <p className="text-gray-300 text-sm mb-4 font-[Poppins] ">
        Find a match in the neighborhood
      </p>

      <div className="relative h-16 flex items-center p-2 bg-black border border-violet-200 rounded-full justify-center">
        <ProfilePic />
        <ProfilePic />
        <ProfilePic />
      </div>
    </div>
  );
};

const ProfilePic = () => (
  <img
    src="https://images.unsplash.com/photo-1676732331165-61bd1e55494a?w=600&auto=format&fit=crop&q=60"
    alt="Profile"
    className="w-12 h-12 rounded-full object-cover border-2 border-black/40"
  />
);

export default Near;
