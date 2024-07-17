import { LuChevronRight } from "react-icons/lu";
import { Link } from "react-router-dom";

export const GameSectionSidebar = () => {
  return (
    <div className="w-full p-8 rounded-xl shadow bg-gray-900">
      <div className="space-y-6">
        <p className="text-base text-white font-bold">Mobile & Tablet</p>

        <div className="space-y-4">
          {gameSectionNavs.map((nav, i) => (
            <Link
              to={`/show-room/?country=${nav.title}`}
              key={i}
              className="text-gray-400 hover:underline block"
            >
              {nav.title}
            </Link>
          ))}
          <p className="font-bold text-white flex items-center gap-4">
            <span>Shop Now </span>
            <LuChevronRight />
          </p>
        </div>
      </div>
    </div>
  );
};

const gameSectionNavs = [
  { title: "Uganda", route: "" },
  { title: "Kenya", route: "" },
  { title: "Rwanda", route: "" },
  { title: "South Africa", route: "" },
];
