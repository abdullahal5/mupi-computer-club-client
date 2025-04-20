import { BiChevronRight, BiX, BiGlobe, BiMapPin } from "react-icons/bi";
import { CgLock } from "react-icons/cg";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { PiPaintBrushBold } from "react-icons/pi";
import { ISession } from "../../types";
import { formatDate } from "../../utils/formatDate";
import { useGetSingleSessionQuery } from "../../redux/features/sessions/sessionsApi";
import Loading from "../ui/Loading";

interface sessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const SessionModal = ({ isOpen, onClose, id }: sessionModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {
    data: getSinglesessionInfo,
    isLoading,
    isFetching,
  } = useGetSingleSessionQuery(id, {
    skip: !id,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sessionData = getSinglesessionInfo?.data as ISession;

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === sessionData?.images?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? sessionData?.images?.length - 1 : prev - 1
    );
  };

  return (
    <>
      <div className="fixed z-50 inset-0 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm">
        {isLoading || isFetching ? (
          <Loading />
        ) : (
          <div className="bg-[#17163A] border border-purple-500/30 shadow-lg shadow-purple-500/20 scrollbar-thin overflow-y-auto max-h-[90vh] text-white rounded-3xl max-w-5xl w-full relative transition-all duration-300 ease-in-out transfor">
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute z-50 right-3 top-3 bg-black/20 p-2 rounded-full hover:bg-black/30 transition-colors duration-300"
            >
              <BiX className="w-5 h-5" />
            </button>

            {/* Image Section */}
            <div className="relative w-full h-96 overflow-hidden rounded-t-3xl">
              <img
                src={
                  sessionData?.images[currentImageIndex] || "/placeholder.svg"
                }
                alt={`session cover ${currentImageIndex + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 ease-in-out transform"
              />

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/70 transition-colors duration-300"
              >
                <IoIosArrowBack className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/70 transition-colors duration-300"
              >
                <IoIosArrowForward className="w-6 h-6" />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {sessionData?.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-white scale-125"
                        : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Title */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                  {sessionData?.title}
                </h2>
                <button className="text-white/80 hover:text-white transition-colors duration-300">
                  <BiChevronRight className="w-6 h-6" />
                </button>
              </div>
              <div className="h-1.5 bg-gray-700/50 rounded-full w-full overflow-hidden">
                <div className="h-full w-1/3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              </div>
              <div className="flex gap-4 mt-4">
                <button className="text-sm text-white/90 hover:text-white px-4 py-2 rounded-full bg-purple-500/30 hover:bg-purple-500/50 transition-all duration-300 transform hover:scale-105">
                  Add to calendar
                </button>
                <button className="text-sm text-white/90 hover:text-white px-4 py-2 rounded-full bg-blue-500/30 hover:bg-blue-500/50 transition-all duration-300 transform hover:scale-105">
                  Share
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col md:flex-row items-start p-8 gap-5">
              <div className="space-y-5 w-full md:w-3/4">
                {/* Description */}
                <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                  <h3 className="text-[#FDFDFD] mb-4 text-2xl font-semibold">
                    Description
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {sessionData?.description}
                  </p>
                </div>

                {/* Eligibility */}
                <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                  <h3 className="text-[#FDFDFD] mb-4 text-2xl font-semibold">
                    Eligibility
                  </h3>
                  <ul className="space-y-2">
                    {sessionData?.eligibilityCriteria?.map(
                      (criterion, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-300 flex items-center"
                        >
                          <span className="w-6 h-6 flex items-center justify-center bg-purple-500/20 rounded-full mr-3 text-purple-400">
                            {index + 1}
                          </span>
                          {criterion}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                  <h3 className="text-[#FDFDFD] mb-4 text-2xl font-semibold">
                    Session Link
                  </h3>
                  <p>{sessionData?.sessionLink}</p>
                </div>

                {/* Sponsors */}
                <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                  <h3 className="text-[#FDFDFD] mb-4 text-2xl font-semibold">
                    Sponsored by
                  </h3>
                  <div className="flex items-center gap-6">
                    <FaGoogle className="w-8 h-8 text-gray-300 hover:text-white transition-colors duration-300" />
                    <FaGithub className="w-8 h-8 text-gray-300 hover:text-white transition-colors duration-300" />
                    <PiPaintBrushBold className="w-8 h-8 text-gray-300 hover:text-white transition-colors duration-300" />
                  </div>
                </div>
              </div>
              <div className="space-y-5 w-full md:w-80">
                {/* Details */}
                <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                  <h3 className="text-[#FDFDFD] mb-4 text-2xl font-semibold">
                    Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center text-sm">
                      <CgLock className="w-5 h-5 mr-3 text-purple-400" />
                      <span className="text-gray-300">
                        {sessionData?.startTime} - {sessionData?.endTime}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <BiGlobe className="w-5 h-5 mr-3 text-purple-400" />
                      <span className="text-gray-300">
                        {formatDate(sessionData?.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <BiMapPin className="w-5 h-5 mr-3 text-purple-400" />
                      <span className="text-gray-300">
                        {sessionData?.location}
                      </span>
                    </div>
                  </div>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.9832043462884!2d90.48330727506739!3d23.569046695714825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755afd4fdfaf20d%3A0x6cf0a23eb7ac2445!2sMunshiganj%20Polytechnic%20Institute!5e0!3m2!1sen!2sbd!4v1738221939947!5m2!1sen!2sbd"
                  width="100%"
                  height="250"
                  loading="lazy"
                  className="rounded-xl shadow-lg"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SessionModal;
