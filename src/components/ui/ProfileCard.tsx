import { IExecutives } from "../../types";

interface ProfileCardProps {
  executive: IExecutives
  handleOpen: () => void;
}

export function ProfileCard({
 executive,
  handleOpen,
}: ProfileCardProps) {
  return (
    <div
      onClick={handleOpen}
      className="bg-[#17163A] cursor-pointer p-6 rounded-xl w-full hover:bg-[#1d1b47] transition-all duration-300 group"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all duration-300">
          <img
            src={executive.profileImage}
            alt={executive.fullName}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-white font-medium text-lg group-hover:text-blue-400 transition-colors duration-300">
            {executive.fullName}
          </h3>
          <p className="text-gray-400 text-sm">{executive.role}</p>
        </div>
      </div>
    </div>
  );
}
