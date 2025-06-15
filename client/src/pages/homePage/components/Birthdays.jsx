import { FaBirthdayCake } from "react-icons/fa";

const Birthdays = () => {
  return (
    <div className="p-4 font-Poppins lg:flex flex-col w-full rounded-lg border bg-card lg:p-4 gap-2">
      <div>
        <h2 className="text-md font-semibold px-3 text-teal-600 font-Futura mb-4">
          <FaBirthdayCake className="inline w-4 h-4" /> today's birthdays
        </h2>

        <p className="text-xs px-3 p-2 font-semibold text-muted-foreground font-Poppins">
          No birthdays today.
        </p>
      </div>
    </div>
  );
};

export default Birthdays;
