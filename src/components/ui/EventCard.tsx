/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BsPlay } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa6";
import { FiClock, FiShare2 } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { LuCalendarDays } from "react-icons/lu";
import EventModal from "../modal/EventModal";
import { IEvent } from "../../types";

const EventCard = ({ event }: { event: IEvent }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [singleEventId, setSingleEventId] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);

  const handleChange = (id: string) => {
    const params = new URLSearchParams(location.search);
    params.set("eventId", id);
    setIsOpen(true);
    setSingleEventId(id);
    navigate(`?${params.toString()}`, { replace: true });
  };

  const handleClose = () => {
    const params = new URLSearchParams(location.search);
    params.delete("eventId");
    setIsOpen(false);
    setSingleEventId("");
    navigate(`?${params.toString()}`, { replace: true });
  };

  const handleCopyLink = () => {
    const linkToCopy = `${window.location.origin}/activities?tab=events&eventId=${event._id}`;
    navigator.clipboard.writeText(linkToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const eventIdFromUrl = params.get("eventId");

    if (eventIdFromUrl) {
      setIsOpen(true);
      setSingleEventId(eventIdFromUrl);
    } else if (isOpen) {
      setIsOpen(false);
      setSingleEventId("");
    }
  }, [location.search]);

  return (
    <>
      <div className="lg:w-auto md:w-auto w-full rounded-xl bg-[#17163A] text-white overflow-hidden">
        <div className="relative">
          <img
            src={event.images[0]}
            alt="Event"
            className="w-full h-60 object-cover"
          />
          <div className="absolute bottom-0 w-full bg-black/50 h-10 backdrop-blur-md flex items-center justify-start">
            <p className="text-sm text-white px-4">What is this event about?</p>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <LuCalendarDays className="w-4 h-4" />
                <span>Dec 12, 2024</span>
              </div>
              <span>|</span>
              <span className="flex items-center gap-1">
                <FiClock /> 10.00 am
              </span>
            </div>
            <span className="px-2 py-0.5 text-xs bg-gray-700/50 rounded-full">
              {event.status}
            </span>
          </div>

          <h2 className="text-xl font-semibold text-blue-400">{event.title}</h2>
          <p className="text-sm text-gray-400">{event.description}</p>

          <div className="space-y-2">
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <FaRegUser className="w-4 h-4" />
              <span>{event.instructorName}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <GrLocation className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
          </div>

          <div className="flex relative gap-3 pt-2">
            {isCopied && (
              <span className="absolute -top-6 left-[80%] -translate-x-1/2 text-xs text-white bg-gray-800 px-2 py-0.5 p-1 rounded shadow-md">
                Copied!
              </span>
            )}
            <button
              onClick={() => handleChange(event._id)}
              className="flex w-full items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
            >
              <BsPlay className="w-4 h-4" />
              <span>See More</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="flex w-full mx-auto items-center justify-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700 rounded-full transition-colors whitespace-nowrap"
            >
              <FiShare2 className="w-4 h-4" />
              <span>Share now</span>
            </button>
          </div>
        </div>
      </div>

      <EventModal id={singleEventId} isOpen={isOpen} onClose={handleClose} />
    </>
  );
};

export default EventCard;
