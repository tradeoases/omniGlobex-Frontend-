/* eslint-disable react-hooks/exhaustive-deps */
import { LuChevronRight } from "react-icons/lu";
import { ICategory } from "./Sidemenu";
import { useEffect, useRef } from "react";
import { categories } from "@/data/data";

interface IAllCategory {
  onToggle: () => void;
  isOpen: boolean;
}
export const CategoriesPopup: React.FC<IAllCategory> = ({
  onToggle,
  isOpen,
}) => {
  const catRef = useRef<HTMLDivElement | null>(null);

  const onClose = (event: MouseEvent) => {
    if (catRef.current && !catRef.current.contains(event.target as Node)) {
      onToggle();
    }
  };

  // const handleClickInside = () => {
  //   onToggle();
  // };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", onClose);
    } else {
      document.removeEventListener("mousedown", onClose);
    }

    return () => {
      document.removeEventListener("mousedown", onClose);
    };
  }, [isOpen]);

  useEffect(() => {
    // Add or remove animation classes based on isOpen state
    if (!isOpen) {
      catRef.current?.classList.add("closed");
    } else {
      catRef.current?.classList.remove("closed");
    }
  }, [isOpen]);
  return (
    <div
      ref={catRef}
      className={`absolute overflow-hidden top-12 left-0 transition-transform duration-300 ${
        !isOpen ? "max-h-full scale-y-100" : "max-h-0 scale-y-0"
      }`}
      style={{
        transformOrigin: "top",
        transform: isOpen ? "scaleY(1)" : "scaleY(0)",
        maxHeight: isOpen ? "1000px" : "0",
      }}
    >
      {categories.map((cat, i) => (
        <CategoryItem key={i} {...cat} />
      ))}
    </div>
  );
};

const CategoryItem: React.FC<ICategory> = ({ icon, name }) => {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-t border-light bg-white hover:bg-main">
      <div className="flex items-center gap-x-4">
        <span className="text-lg text-gray-700">{icon}</span>
        <span className="line-clamp-1 font-thin">{name}</span>
      </div>
      <LuChevronRight className="text-base" />
    </div>
  );
};
