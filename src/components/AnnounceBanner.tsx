import { useEffect, useState } from "react";
import { LuChevronRight } from "react-icons/lu";

interface ITimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const AnnounceBanner = () => {
  const targetDate = "2024-07-25T00:00:00";

  const calculateTimeLeft = (): ITimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: ITimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState<ITimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 gap-x-0 space-y-8 lg:space-y-0">
      <div className="w-full bg-black mx-auto space-y-4 pb-8">
        <div className="py-8 w-10/12 mx-auto grid grid-cols-4 gap-x-8 ">
          {Object.keys(timeLeft).map((interval) => (
            <TimeCircle
              digit={timeLeft[interval as keyof ITimeLeft]}
              name={interval.charAt(0).toUpperCase() + interval.slice(1)}
              key={interval}
            />
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
  color?: "pink" | "blue" | "green";
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
