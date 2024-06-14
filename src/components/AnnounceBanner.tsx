import React from "react";
import { LuChevronRight } from "react-icons/lu";

const AnnounceBanner = () => {
  return (
    <div className="w-full grid grid-cols-2 gap-x-8">
      <div className="w-full bg-gray-400 mx-auto space-y-4 pb-8">
        <div className="py-8 w-10/12 mx-auto grid grid-cols-4 gap-x-8 ">
          {times.map((time) => (
            <TimeCircle {...time} key={time.name} />
          ))}
        </div>
        <p className="w-10/12 mx-auto text-7xl font-bold">Woo! Flash Sale</p>

        <p className="w-10/12 mx-auto flex items-center">
          <span className="text-base font-bold border-b border-main pr-4">Shop Now </span>
          <LuChevronRight className="border-b  text-base" />
        </p>
      </div>
      <div className="bg-slate-400">1</div>
    </div>
  );
};

export default AnnounceBanner;

interface ITimeCircle {
  digit: number;
  name: string;
  color: "pink" | "blue" | "green";
}
const TimeCircle: React.FC<ITimeCircle> = ({ color, digit, name }) => {
  return (
    <div className="space-y-4">
      <p
        className={`w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-extrabold ${
          color === "pink"
            ? "text-pink-600"
            : color === "green"
            ? "text-green-600"
            : "text-blue-600"
        } `}
      >
        {digit}
      </p>
      <p className={`text-base font-bold text-center `}>{name}</p>
    </div>
  );
};

const times: ITimeCircle[] = [
  { digit: 1, name: "Days", color: "pink" },
  { digit: 0, name: "Hours", color: "blue" },
  { digit: 12, name: "Minutes", color: "green" },
  { digit: 8, name: "Seconds", color: "pink" },
];
