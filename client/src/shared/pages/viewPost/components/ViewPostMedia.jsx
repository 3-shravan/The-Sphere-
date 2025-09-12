export default function ViewPostMedia({ media, thoughts }) {
  return (
    <div className="w-full md:w-1/2 flex items-center justify-center bg-neutral-800/10 rounded-lg min-h-[50vh] md:h-full">
      {media ? (
        <img
          src={media}
          alt="Post"
          className="w-full p-4 h-auto max-h-[50vh] md:max-h-full object-cover rounded-4xl"
        />
      ) : (
        <div className="flex items-center justify-center p-4 text-sm font-Poppins uppercase text-neutral-600 leading-5 md:leading-8">
          {thoughts}
        </div>
      )}
    </div>
  );
}
