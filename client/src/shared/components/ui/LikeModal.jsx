import { Link } from "react-router-dom";

export const LikeModal = ({ likes, setShowModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex font-Futura items-center justify-center z-50">
      <div className="bg-background rounded-xl shadow-lg p-4 md:p-6 w-80 max-h-[70vh] overflow-y-auto">
        <h2 className=" font-semibold mb-5">Liked by</h2>
        <ul className="space-y-2">
          {likes.map((user) => (
            <li key={user._id} className="flex items-center gap-2">
              <img
                src={user.profilePicture}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover"
              />
              <Link
                to={`/profile/${user.name}`}
                className="text-sm text-foreground"
              >
                {user.name}
              </Link>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setShowModal(false)}
          className="mt-4 w-full py-2 cursor-pointer rounded-lg bg-muted hover:bg-rose-500 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};
