import { LuChevronRight } from "react-icons/lu";

const AnnounceBanner = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 gap-x-0 space-y-8 lg:space-y-0">
      <div className="w-full bg-black mx-auto space-y-4 pb-8">
        <div className="py-8 w-10/12 mx-auto grid grid-cols-4 gap-x-8 ">
          {times.map((time) => (
            <TimeCircle {...time} key={time.name} />
          ))}
        </div>
        <p className="w-10/12 mx-auto text-white text-3xl font-bold">
          Woo! Flash Sale
        </p>

        <p className="w-10/12 mx-auto flex items-center text-gray-300">
          <span className="text-base font-bold border-b  border-black hover:border-main pr-4">
            Shop Now{" "}
          </span>
          <LuChevronRight className="text-base" />
        </p>
      </div>
      <div className="bg-download-cover bg-cover bg-slate-400 p-8 h-40 lg:h-auto"></div>
    </div>
  );
};

export default AnnounceBanner;

interface ITimeCircle {
  digit: number;
  name: string;
  color: "pink" | "blue" | "green";
}
const TimeCircle: React.FC<ITimeCircle> = ({ digit, name }) => {
  return (
    <div className="space-y-4">
      <p
        className={`w-14 h-14 lg:w-20 lg:h-20 bg-white rounded-full flex items-center justify-center text-3xl font-extrabold  `}
      >
        {digit}
      </p>
      <p className={`text-base font-bold text-gray-500 text-center `}>{name}</p>
    </div>
  );
};

const times: ITimeCircle[] = [
  { digit: 1, name: "Days", color: "pink" },
  { digit: 0, name: "Hours", color: "blue" },
  { digit: 12, name: "Minutes", color: "green" },
  { digit: 8, name: "Seconds", color: "pink" },
];
