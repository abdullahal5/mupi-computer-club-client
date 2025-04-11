import { BsLinkedin, BsMailbox, BsTwitter } from "react-icons/bs";
import { FaCode } from "react-icons/fa";
import { useGetAllExecutivesQuery } from "../redux/features/executives/executivesApi";
import { IExecutives } from "../types";
import Loading from "../components/ui/Loading";
import AnimeCardModal from "../components/modal/PersonDetailsModal";
import { useState } from "react";

const DeveloperSection = () => {
  const { data: getAllExecutiveInfo, isLoading } = useGetAllExecutivesQuery({});
  const getAllExecutiveData = getAllExecutiveInfo?.data as IExecutives[];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const developers = getAllExecutiveData?.filter(
    (dev) => dev?.roleType?.toLowerCase() === "developer"
  );

  const formatRole = (role: string) => {
    return role
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedId(null);
  };

  const handleOpen = (_id: string, e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && !e.target.closest(".social-link")) {
      setSelectedId(_id);
      setIsOpen(true);
    }
  };

  const handleSocialLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="max-w-6xl lg:pt-0 md:pt-0 pt-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex min-h-screen flex-col items-center py-12 md:py-[125px]">
          {/* Header Section */}
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-8 xl:gap-10 mb-12 md:mb-16">
            <div className="rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl transform transition-all hover:scale-105 hover:rotate-12">
              <FaCode className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-full bg-black p-3 text-white transition-all hover:scale-110 hover:rotate-180" />
            </div>

            <div className="text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center justify-center md:items-end gap-2 md:gap-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                  MEET OUR
                </h1>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-blue-500">
                  DEVELOPERS
                </h1>
              </div>
              <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto md:mx-0">
                We would like to thank our amazing developers who worked hard to
                create this website. They have shown great skill, creativity,
                and dedication in bringing our vision to life.
              </p>
            </div>
          </div>

          {isLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 w-full">
              {developers?.length > 0 ? (
                developers?.map((dev) => (
                  <div
                    key={dev?._id}
                    onClick={(e) => handleOpen(dev?._id, e)} // Pass event to handleOpen
                    className="relative w-full overflow-hidden rounded-xl border border-[#ffffff20] bg-[#0c0c3f]/80 shadow-xl shadow-blue-900/30 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-[1.02] hover:border-blue-500"
                  >
                    {/* Background effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 animate-gradient"></div>
                    <div className="absolute inset-0 overflow-hidden opacity-30">
                      <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-white animate-pulse"></div>
                      <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 rounded-full bg-blue-300 animate-twinkle"></div>
                      <div className="absolute bottom-1/4 right-1/4 w-0.5 h-0.5 rounded-full bg-blue-400 animate-twinkle delay-300"></div>
                      <div className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-purple-400 animate-twinkle delay-500"></div>
                    </div>

                    {/* Card Content */}
                    <div className="relative z-20 p-6 sm:p-8 flex flex-col items-center">
                      {/* Profile Image */}
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-4 sm:mb-6 group">
                        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 opacity-70 blur group-hover:opacity-90 transition-all duration-500 animate-spin-slow"></div>
                        <div className="relative rounded-full overflow-hidden border-2 border-[#ffffff30] z-10 h-full w-full">
                          <img
                            src={
                              dev?.profileImage ||
                              "https://via.placeholder.com/150"
                            }
                            alt={dev?.fullName}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      {/* Name */}
                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 text-center">
                        {dev?.fullName}
                      </h2>

                      {/* Role */}
                      <div className="relative inline-block mt-1 sm:mt-2 group">
                        <p className="text-sm sm:text-base text-blue-300/90 font-medium tracking-wide">
                          {formatRole(dev?.role || "Developer")}
                        </p>
                        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-70 transition-all duration-500 group-hover:opacity-100"></div>
                      </div>

                      {/* Social Links */}
                      <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-6">
                        {[
                          { Icon: BsTwitter, href: dev?.twitter },
                          { Icon: BsLinkedin, href: dev?.linkedin },
                          { Icon: BsMailbox, href: `mailto:${dev?.email}` },
                        ]
                          .filter((item) => item.href)
                          .map(({ Icon, href }, index) => (
                            <a
                              key={index}
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-300/70 hover:text-blue-400 transform transition-all duration-300 hover:scale-110 hover:rotate-[360deg] social-link"
                              aria-label={`${dev?.fullName}'s social link`}
                              onClick={handleSocialLinkClick} // Stop propagation for social link clicks
                            >
                              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                            </a>
                          ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-lg text-gray-400">
                  No developers found
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <AnimeCardModal
        isOpen={isOpen}
        onClose={handleClose}
        executiveId={selectedId}
      />
    </>
  );
};

export default DeveloperSection;
