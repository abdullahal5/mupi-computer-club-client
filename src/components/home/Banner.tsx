import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0B1F] flex items-center justify-center">
      {/* Animated Gradient Circles */}
      <div
        className="absolute w-[600px] h-[800px] rounded-full bg-gradient-to-r from-[#4B1D8E] via-[#6D28D9] to-[#1E3A8A] blur-[120px] opacity-70 animate-float-slow"
        style={{ left: "-10%", top: "0%" }}
      />
      <div className="absolute w-[500px] h-[400px] rounded-full bg-blue-600/30 blur-[100px] top-[-10%] right-[-10%] opacity-70 animate-float-medium" />

      <div
        className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#4B1D8E] to-[#6D28D9] blur-[130px] opacity-70 animate-float-fast"
        style={{ bottom: "-20%", left: "50%" }}
      />
      <div
        className="absolute w-[300px] h-[300px] rounded-full bg-[#1a1067] blur-[110px] opacity-70 animate-float-slow"
        style={{ top: "0%", left: "40%" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
          Empowering Innovators
          <br />
          <span className="bg-gradient-to-r from-violet-400 to-blue-500 bg-clip-text text-transparent animate-text-shimmer">
            Shaping the Future of Tech
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up delay-100">
          A thriving community of tech enthusiasts, developers, and
          entrepreneurs, where innovators connect, create, and lead to make an
          impact
        </p>
        <div className="flex gap-4 justify-center animate-fade-in-up delay-200">
          <Link to={"/activities?tab=events"}>
            <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/20">
              Events
            </button>
          </Link>
          <Link to={"/activities?tab=projects"}>
            <button className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30">
              Projects
            </button>
          </Link>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(5deg);
            }
          }
          @keyframes textShimmer {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-float-slow {
            animation: float 15s ease-in-out infinite;
          }
          .animate-float-medium {
            animation: float 10s ease-in-out infinite;
          }
          .animate-float-fast {
            animation: float 7s ease-in-out infinite;
          }
          .animate-text-shimmer {
            background-size: 200% auto;
            animation: textShimmer 8s linear infinite;
          }
          .animate-fade-in-up {
            animation: fadeInUp 1s ease-out forwards;
          }
          .delay-100 {
            animation-delay: 100ms;
          }
          .delay-200 {
            animation-delay: 200ms;
          }
        `}
      </style>
    </div>
  );
};

export default Banner;
