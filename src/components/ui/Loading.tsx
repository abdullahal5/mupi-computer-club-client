import { FaSpinner } from "react-icons/fa6";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <FaSpinner className="animate-spin text-4xl text-blue-500" />
    </div>
  );
};

export default Loading;
