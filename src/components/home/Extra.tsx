import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const Extra = () => {
  return (
    <div className="bg-[#070838] text-center py-14 mt-10 px-4">
      <h2 className="text-2xl font-bold text-white">Still have questions?</h2>
      <p className="text-gray-400 mt-2">
        Can't find the answer you're looking for? Please chat to our friendly
        team.
      </p>
      <Link to={`/contact`}>
        <button className="flex mx-auto items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4">
          <span>Learn More</span>
          <FiArrowUpRight className="ml-2" />
        </button>
      </Link>
    </div>
  );
};

export default Extra;
