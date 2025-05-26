import { useAuth } from "@/context";
import Container from "@/features/posts/components/ui/Container";
import { formatDistanceToNow, format } from "date-fns";

const Profile = () => {
  const { auth } = useAuth();
  const profile = auth?.profile;
  console.log(profile);

  if (!profile) return null;

  const {
    name,
    email,
    age,
    bio,
    followers,
    following,
    posts,
    saved,
    isOnline,
    accountVerified,
    lastActive,
    createdAt,
    profilePicture,
  } = profile;

  return (
    <Container>
      {/* Background shimmer blur effect */}
      <div className="relative z-0 overflow-hidden rounded-3xl">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-blue-500/20 blur-2xl opacity-30" />

        {/* Profile Card */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start p-8 backdrop-blur-md bg-white/70 dark:bg-neutral-900/70 border border-white/10 dark:border-neutral-700 shadow-xl rounded-3xl">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              src={profilePicture}
              alt={`${name}'s profile`}
              className="w-36 h-36 rounded-full object-cover border-4 border-primary shadow-md"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-4 w-full">
            {/* Header Row */}
            <div className="flex items-center justify-between flex-wrap">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">
                {name}
              </h2>
              <span
                className={`text-sm px-4 py-1 rounded-full font-medium ${
                  isOnline
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500 dark:bg-neutral-800 dark:text-neutral-400"
                }`}
              >
                {isOnline
                  ? "🟢 Online"
                  : `Last active ${formatDistanceToNow(
                      new Date(lastActive)
                    )} ago`}
              </span>
            </div>

            {/* Email & Age */}
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              📧 {email}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              🎂 Age: {age}
            </p>

            {/* Bio */}
            {bio && (
              <p className="text-sm italic text-neutral-600 dark:text-neutral-400">
                “{bio}”
              </p>
            )}

            {/* Account Stats */}
            <div className="flex flex-wrap gap-3 mt-4">
              {[
                { label: "Posts", value: posts.length },
                { label: "Saved", value: saved.length },
                { label: "Followers", value: followers.length },
                { label: "Following", value: following.length },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="text-sm bg-white/60 dark:bg-neutral-800/50 px-4 py-2 rounded-xl backdrop-blur-md shadow border border-white/10 dark:border-neutral-700"
                >
                  {label}: <span className="font-semibold">{value}</span>
                </div>
              ))}

              <div
                className={`text-sm px-4 py-2 rounded-xl font-semibold ${
                  accountVerified
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {accountVerified ? "✅ Verified" : "❌ Not Verified"}
              </div>
            </div>

            {/* Join Date */}
            <p className="text-xs text-neutral-400 mt-3">
              Joined on {format(new Date(createdAt), "MMMM dd, yyyy")}
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
