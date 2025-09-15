import { BiX } from "react-icons/bi";
import {
  FaRegCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IEvent } from "../../types";
import { formatDate } from "../../utils/formatDate";
import { useGetSingleEventQuery } from "../../redux/features/event/eventApi";
import Loading from "../ui/Loading";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const EventModal = ({ isOpen, onClose, id }: EventModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {
    data: getSingleEventInfo,
    isLoading,
    isFetching,
  } = useGetSingleEventQuery(id, {
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

  const eventData = getSingleEventInfo?.data as IEvent;

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === eventData.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? eventData.images.length - 1 : prev - 1
    );
  };

  if (!eventData) return null;

  return (
    <div className="fixed z-50 inset-0 bg-black/30 flex items-center justify-center p-4 backdrop-blur-sm">
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        <div className="bg-[#0F0E2A] border border-purple-500/30 shadow-lg shadow-purple-500/20 scrollbar-thin overflow-y-auto max-h-[90vh] text-white rounded-2xl max-w-5xl w-full relative transition-all duration-300 ease-in-out transform">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 bg-purple-600/80 hover:bg-purple-700 p-2 rounded-full transition-all duration-300 hover:scale-110"
          >
            <BiX className="w-6 h-6" />
          </button>

          {/* Image Section */}
          <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-t-2xl">
            <img
              src={eventData?.images[currentImageIndex] || "/placeholder.svg"}
              alt={`Event cover ${currentImageIndex + 1}`}
              className="h-full w-full object-cover"
            />

            {/* Navigation Buttons */}
            {eventData.images.length > 1 && (
              <div>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-purple-600/80 hover:bg-purple-700 p-2 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <IoIosArrowBack className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-purple-600/80 hover:bg-purple-700 p-2 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <IoIosArrowForward className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {eventData?.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    index === currentImageIndex
                      ? "bg-white"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Title and Date Badge */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                {eventData?.title}
              </h2>
              <div className="bg-purple-900/30 border border-purple-500/30 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 w-fit whitespace-nowrap">
                <FaRegCalendarAlt className="text-purple-400" />
                <span>{formatDate(eventData?.date)}</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Column */}
              <div className="space-y-6 flex-1">
                {/* Description */}
                <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                  <h3 className="text-white mb-4 text-xl font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    Description
                  </h3>
                  <div
                    dangerouslySetInnerHTML={{ __html: eventData?.description }}
                    className="prose dark:prose-invert max-w-full"
                  />
                </div>

                {/* Eligibility */}
                <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                  <h3 className="text-white mb-4 text-xl font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    Eligibility Criteria
                  </h3>
                  <ul className="space-y-3">
                    {eventData?.eligibilityCriteria?.map((criterion, index) => (
                      <li
                        key={index}
                        className="text-gray-300 flex items-start"
                      >
                        <span className="w-5 h-5 flex items-center justify-center bg-purple-500/30 rounded-full mr-3 text-purple-400 mt-0.5 text-xs">
                          {index + 1}
                        </span>
                        <span>{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sponsors */}
                {eventData?.sponsorLogos?.length > 0 && (
                  <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                    <h3 className="text-white mb-4 text-xl font-semibold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                      Sponsored by
                    </h3>
                    <div className="flex items-center gap-4">
                      {eventData?.sponsorLogos?.map((logo, index) => (
                        <div key={index}>
                          <img
                            className="w-20 h-20 object-cover rounded-md text-gray-300 hover:text-white"
                            src={logo}
                            alt={`Sponsor logo ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-6 w-full lg:w-80">
                {/* Event Details */}
                <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                  <h3 className="text-white mb-4 text-xl font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    Event Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-500/20 p-2 rounded-lg">
                        <FaClock className="text-purple-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Time</p>
                        <p className="text-gray-300">
                          {eventData?.startTime} - {eventData?.endTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-500/20 p-2 rounded-lg">
                        <FaRegCalendarAlt className="text-purple-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Date</p>
                        <p className="text-gray-300">
                          {formatDate(eventData?.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-500/20 p-2 rounded-lg">
                        <FaMapMarkerAlt className="text-purple-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Location</p>
                        <p className="text-gray-300">{eventData?.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="overflow-hidden rounded-xl border border-white/10">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default EventModal;
