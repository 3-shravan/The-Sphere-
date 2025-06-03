import { format } from "date-fns";

const ProfileImage = ({ profilePicture, name }) => (
  <div className="flex-shrink-0">
    <img
      src={profilePicture}
      alt={`(profile)`}
      className="w-50 h-50 rounded-full object-cover border-2 border-border shadow-md"
    />
  </div>
);

const ProfileDetails = ({ email, age, bio }) => (
  <div className="text-xs space-y-1 font-Futura flex flex-col">
    {/* <span className="text-neutral-600">(fullname)</span> */}
    <span className="italic font-mono">“{bio} i like being me ”</span>
    <span className="pt-4 text-neutral-700"> {email}</span>
    <span className=" text-neutral-700"> you are {age}</span>
  </div>
);
const ProfileStats = ({ posts, saved, followers, following }) => {
  const followStats = [
    { label: "Followers", value: followers?.length || 0 },
    { label: "Following", value: following?.length || 0 },
  ];
  const postStats = [
    { label: "Posts", value: posts?.length || 0 },
    { label: "Saved", value: saved?.length || 0 },
  ];
  return (
    <div className="flex flex-wrap justify-center md:justify-start gap-3 font-mono mt-4">
      {followStats.map(({ label, value }) => (
        <div
          key={label}
          className="text-sm bg-white/60 dark:bg-neutral-800/50 px-3 py-1.5 rounded-xl backdrop-blur-md shadow border border-white/10 dark:border-neutral-700"
        >
          {label} <span className="font-semibold text-rose-300">{value}</span>
        </div>
      ))}

      {/* {postStats.map(({ label, value }) => (
        <div key={label} className="text-sm  ">
          {label} <span className="font-semibold text-rose-300">{value}</span>
        </div>
      ))} */}
    </div>
  );
};

const ProfileJoinDate = ({ createdAt }) => (
  <p className="text-[10px] font-Futura  text-neutral-700 mt-4">
    Joined on {format(new Date(createdAt), "MMMM dd, yyyy")}
  </p>
);

export const ProfileCard = ({ user }) => {
  if (!user) return null;
  const {
    name,
    email,
    phone,
    age,
    bio,
    followers,
    following,
    posts,
    saved,
    createdAt,
    profilePicture,
  } = user;
  return (
    <div className="flex font-Gilroy flex-col w-full md:flex-row gap-8 items-center justify-center py-6 backdrop-blur-md">
      <ProfileImage profilePicture={profilePicture} name={name} />

      <div className="flex-1  w-full">
        <h2 className="text-2xl text-rose-400 font-Futura py-2 text-center md:text-left ">
          {name}
        </h2>
        <ProfileDetails email={email} age={age} bio={bio} />
        <ProfileStats
          posts={posts}
          saved={saved}
          followers={followers}
          following={following}
        />
        <ProfileJoinDate createdAt={createdAt} />
      </div>
    </div>
  );
};
