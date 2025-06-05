import { FaBirthdayCake } from "react-icons/fa";

const birthdays = [
  {
    id: 1,
    name: "Sonu",
    username: "@sonu",
    birthday: "2025-6-6",
    online: true,
    avatar: "/avatars/sonu.jpg",
  },
  {
    id: 2,
    name: "Raosahab",
    username: "@shanu",
    birthday: "2023-11-20",
    online: false,
    avatar: "/avatars/shanu.jpg",
  },
  {
    id: 3,
    name: "Shantanu",
    username: "@raosahab",
    birthday: "2023-12-05",
    online: true,
    avatar: "/avatars/rao.jpg",
  },
];

const Birthdays = () => {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Filter birthdays for today
  const todaysBirthdays = birthdays.filter(
    (person) => person.birthday === today
  );

  return (
    <div className="p-4 font-Poppins lg:flex flex-col w-full rounded-lg border-2 bg-card border-border lg:p-4 gap-2">
      <div>
        <h2 className="text-md font-semibold px-3 text-rose-300 font-Futura mb-4">
          <FaBirthdayCake className="inline w-4 h-4" /> today's birthdays
        </h2>
        {todaysBirthdays.length > 0 ? (
          <ul className="space-y-4">
            {todaysBirthdays.map((person) => (
              <li
                key={person.id}
                className="flex items-center gap-4 p-2 rounded-lg bg-muted/10"
              >
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium">{person.name}</p>
                  <p className="text-sm text-muted">{person.username}</p>
                  <p className="text-sm text-muted">🎂 {person.birthday}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs px-3 p-2 font-semibold text-muted-foreground font-Poppins">
            No birthdays today.
          </p>
        )}
      </div>
    </div>
  );
};

export default Birthdays;
