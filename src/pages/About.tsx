import Extra from "../components/home/Extra";
import FAQ from "../components/home/FAQ";
import { activities } from "../constants";

const About = () => {
  return (
    <div className="text-white py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-end pt-16 lg:pt-20">
        <div className="lg:flex-1">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
            Empowering <br className="hidden sm:block" /> innovation through{" "}
            <br className="hidden sm:block" /> collaboration
          </h1>
        </div>

        <div className="lg:flex-1 max-w-lg">
          <p className="text-gray-300 text-base font-semibold leading-snug sm:text-lg">
            At MUPICC, we believe in the power of learning, sharing, and growing
            together. Our community thrives on collaboration, helping each other
            unlock new skills and inspire creativity.
          </p>

          <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6">
            <div className="flex items-start gap-2 sm:gap-3">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold">
                04
              </span>
              <p className="text-xs sm:text-sm">
                Student <br /> Teams
              </p>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold">
                272
              </span>
              <p className="text-xs sm:text-sm">
                Total <br /> Members
              </p>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold">
                03
              </span>
              <p className="text-xs sm:text-sm">
                Month of <br /> Journey
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="mt-10 md:mt-12 max-w-6xl mx-auto">
        <img
          src="https://i.ibb.co.com/s5zHdGc/e53cb173796ded4fa6bdafcdd5f5075c-1.png"
          alt="Collaboration Image"
          className="rounded-lg shadow-md w-full object-cover h-[250px] sm:h-[350px] md:h-[400px]"
        />
      </div>

      {/* Activities Section */}
      <div className="mt-12 md:mt-16 max-w-7xl mx-auto">
        <div className="text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Our Activities</h2>
          <p className="text-gray-300 mt-2 max-w-2xl mx-auto text-sm sm:text-base">
            Our mission is to empower individuals through collaboration,
            innovation, and continuous learning in technology.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 px-4 sm:px-0">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="bg-[#201c44] p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-2">
                {activity.title}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ & Extra Sections */}
      <FAQ />
      <Extra />
    </div>
  );
};

export default About;
