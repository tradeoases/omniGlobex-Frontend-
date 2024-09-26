import { HiChevronRight } from "react-icons/hi2";

interface Props {
  name: string;
  view?: boolean;
  route?: string;
  classList?: string;
}

export const SectionHeader: React.FC<Props> = ({
  name,
  view = false,
  classList,
}) => {
  return (
    <div className={`flex items-center justify-between ${classList}`}>
      <p className="text-base md:text-2xl font-bold">{name}</p>
      <div>
        {view && (
          <p className="flex items-center justify-end gap-3">
            <span className="text-xs font-bold">View More</span>
            <HiChevronRight className="text-sm animate-in" />
          </p>
        )}
      </div>
    </div>
  );
};
