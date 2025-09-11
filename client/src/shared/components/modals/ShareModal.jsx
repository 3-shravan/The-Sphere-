import { useErrorToast, useSuccessToast } from "@/hooks";
import {
  Facebook,
  Instagram,
  Link as LinkIcon,
  MessageCircle,
  Twitter,
  Linkedin,
  Share2,
} from "lucide-react";
import { Link } from "react-router-dom";

const ShareModal = ({ postId }) => {
  const postUrl = `${import.meta.env.VITE_CLIENT_URL}/post/${postId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      useSuccessToast("🚀 Link copied to clipboard");
    } catch {
      useErrorToast("❌ Failed to copy link");
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this post",
          url: postUrl,
        });
      } catch {
        useErrorToast("❌ Failed to share");
      }
    } else {
      useErrorToast("⚡ Native share not supported on this device");
    }
  };

  // Common styling
  const itemClasses =
    "flex items-center gap-3 p-3 rounded-lg font-Futura shadow-sm hover:shadow-md transition text-sm";

  return (
    <div className="grid grid-cols-1 text-black sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 px-4 py-5">
      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${encodeURIComponent(postUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${itemClasses} bg-green-50 hover:bg-green-100`}
      >
        <MessageCircle className="w-5 h-5 text-green-700" />
        <span>WhatsApp</span>
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          postUrl
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${itemClasses} bg-blue-50 hover:bg-blue-100`}
      >
        <Facebook className="w-5 h-5 text-blue-700" />
        <span>Facebook</span>
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={`${itemClasses} bg-pink-50 hover:bg-pink-100`}
      >
        <Instagram className="w-5 h-5 text-pink-600" />
        <span>Instagram</span>
      </a>

      {/* Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
          postUrl
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${itemClasses} bg-sky-50 hover:bg-sky-100`}
      >
        <Twitter className="w-5 h-5 text-sky-600" />
        <span>Twitter</span>
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          postUrl
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${itemClasses} bg-indigo-50 hover:bg-indigo-100`}
      >
        <Linkedin className="w-5 h-5 text-indigo-700" />
        <span>LinkedIn</span>
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className={`${itemClasses} bg-gray-50 hover:bg-gray-100`}
      >
        <LinkIcon className="w-5 h-5 text-gray-700" />
        <span>Copy Link</span>
      </button>

      {/* Native Share */}
      <button
        onClick={handleNativeShare}
        className={`${itemClasses} text-foreground bg-primary/5 hover:bg-primary/10 sm:col-span-2 lg:col-span-3 justify-center`}
      >
        <Share2 className="w-5 h-5 " />
        <span>More Options</span>
      </button>

      {/* View Post (internal link) */}
      <Link
        to={`/post/${postId}`}
        className={`${itemClasses} text-foreground bg-accent/5 hover:bg-accent/10 sm:col-span-2 lg:col-span-3 justify-center`}
      >
        <LinkIcon className="w-5 h-5 " />
        <span>View Post</span>
      </Link>
    </div>
  );
};

export default ShareModal;
