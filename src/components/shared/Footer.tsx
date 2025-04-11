import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="text-center space-y-1 py-8">
      <Link to="/developers">
        <span className="relative group inline-block pb-1">
          <span className="text-lg font-bold text-violet-500 cursor-pointer transition-colors duration-300 group-hover:text-violet-400">
            Meet Our Developers
          </span>

          <span className="absolute left-0 -bottom-0.5 h-0.5 w-full bg-violet-500 transition-all duration-300 group-hover:h-1"></span>
        </span>
      </Link>

      <h1 className="text-2xl text-[#DEE4EA]">
        Join us to learn, share and grow togather!
      </h1>
      <p className="text-[#8C9BAB] text-sm">
        © MUPI Computer Club - Munshiganj Polytechnic Instiitute
      </p>
    </div>
  );
};

export default Footer;
