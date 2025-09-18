import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProfilePicture, Modal } from "@/components";
import { FollowUser, ShowUserModal, SocialLinksModal } from "@/shared";
import { Link } from "react-router-dom";
import useProfile from "../hooks/useProfile";
import EditProfile from "../EditProfile";

export function ProfileCard({ user }) {
  if (!user) return null;

  const [activeModal, setActiveModal] = useState(null);
  const [showLinksModal, setShowLinksModal] = useState(false);
  const [socialLinks, setSocialLinks] = useState({});

  const { fullName, dob, name, bio, following, followers } = user;
  const { me, followersCount, isFollowing, followUser, isPending } =
    useProfile(user);

  useEffect(() => {
    const saved = localStorage.getItem(`links_${user._id}`);
    if (saved) setSocialLinks(JSON.parse(saved));
  }, [user._id]);

  return (
    <div className="flex flex-col items-center font-Gilroy w-full justify-center backdrop-blur-md">
      <ProfilePicture
        profilePicture={user.profilePicture}
        username={name}
        size="profile"
      />

      <div className="flex flex-col mt-3 items-center text-neutral-700">
        <h2 className="text-2xl font-Futura font-bold text-second">{name}</h2>
        {fullName && <h3 className="text-base">{fullName}</h3>}
        {dob && <p className="text-xs">{new Date(dob).toLocaleDateString()}</p>}

        <div className="flex gap-10 mt-1">
          <div
            className="flex flex-col cursor-pointer items-center"
            onClick={() => setActiveModal("followers")}
          >
            <span className="text-lg font-extrabold">{followersCount}</span>
            <span className="text-xs text-neutral-500">Followers</span>
          </div>
          <div
            className="flex flex-col cursor-pointer items-center"
            onClick={() => setActiveModal("followings")}
          >
            <span className="text-lg font-extrabold">{following.length}</span>
            <span className="text-xs text-neutral-500">Following</span>
          </div>
        </div>

        {bio && (
          <p className="italic mt-3 text-center text-foreground max-w-sm font-mono break-words">
            “{bio}”
          </p>
        )}
        <div className="flex gap-4 mt-4 text-xs font-semibold">
          {Object.entries(socialLinks).map(
            ([key, val]) =>
              val && (
                <Link
                  key={key}
                  to={`https://${key}.com/${val}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 border rounded-full hover:bg-muted transition text-neutral-600"
                >
                  {key}
                </Link>
              )
          )}
        </div>

        {me ? (
          <div className="space-x-2 ">
            <EditProfile user={user} />
            <Button
              variant="outline"
              className="text-xs text-foreground/90 font-Gilroy bg-input/20 rounded-xl"
              onClick={() => setShowLinksModal(true)}
            >
              add links 🚀
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center md:justify-start gap-3 font-mono mt-4">
            <FollowUser
              userId={user._id}
              isFollowing={isFollowing}
              followUser={followUser}
              isPending={isPending}
            />
            <Button
              variant="secondary"
              className="text-xs font-Gilroy border font-bold cursor-pointer bg-input/20 rounded-xl"
            >
              Message
            </Button>
          </div>
        )}
      </div>

      {activeModal && (
        <Modal darkModal={false}>
          <ShowUserModal
            title={activeModal === "followers" ? "Followers" : "Following"}
            users={activeModal === "followers" ? followers : following}
            onCancel={() => setActiveModal(null)}
          />{" "}
        </Modal>
      )}

      {showLinksModal && (
        <SocialLinksModal
          userId={user._id}
          onClose={() => setShowLinksModal(false)}
          onSave={setSocialLinks}
        />
      )}
    </div>
  );
}
