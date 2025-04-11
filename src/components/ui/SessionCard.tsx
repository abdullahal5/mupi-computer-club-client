/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { CiShare2 } from "react-icons/ci";
import type { ISession } from "../../types";
import { formatDate } from "../../utils/formatDate";
import SessionModal from "../modal/SessionModal";
import { useNavigate } from "react-router-dom";

const SessionCard = ({ session }: { session: ISession }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [singleSessionId, setSingleSessionId] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    const params = new URLSearchParams(location.search);
    params.delete("sessionId");
    setIsOpen(false);
    setSingleSessionId("");
    navigate(`?${params.toString()}`, { replace: true });
  };

  const handleChange = (id: string) => {
    setIsOpen(true);
    setSingleSessionId(id);

    const params = new URLSearchParams(window.location.search);
    params.set("sessionId", id);
    navigate(`${window.location.pathname}?${params.toString()}`, {
      replace: true,
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();

    const fullUrl = `${window.location.origin}/activities?tab=sessions&sessionId=${session._id}`;
    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  useEffect(() => {
      const params = new URLSearchParams(location.search);
      const eventIdFromUrl = params.get("eventId");
  
      if (eventIdFromUrl) {
        setIsOpen(true);
        setSingleSessionId(eventIdFromUrl);
      } else if (isOpen) {
        setIsOpen(false);
        setSingleSessionId("");
      }
    }, [location.search]);

  return (
    <div
      onClick={() => handleChange(session?._id)}
      className="bg-[#17163A] rounded-xl text-white overflow-hidden border border-gray-800 hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-4 md:p-5 order-2 md:order-none">
          <div className="flex items-center justify-between mb-2 md:mb-3">
            <span className="text-gray-400 text-xs">
              {formatDate(session?.createdAt)}
            </span>
            <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-300 rounded-full">
              Latest
            </span>
          </div>

          <h2 className="text-lg md:text-xl font-medium text-blue-400 hover:text-blue-300 transition-colors mb-1 md:mb-2">
            {session?.title}
          </h2>

          <p className="text-xs md:text-sm text-gray-400 mb-3 md:mb-4 line-clamp-2">
            {session?.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-300">
              <BiUser className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
              <span>{session?.instructorName}</span>
            </div>

            <div className="relative flex items-center gap-3 text-gray-400">
              {copied && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white bg-gray-800 px-2 py-0.5 p-1 rounded shadow-md">
                  Copied!
                </span>
              )}
              <button
                className="hover:text-white transition-colors duration-300 hover:scale-110"
                onClick={handleShare}
              >
                <CiShare2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Image - comes after content on mobile */}
        <div className="w-full md:w-44 order-1 md:order-none">
          <img
            src={session?.images[0] || "/placeholder.svg?height=300&width=300"}
            alt={session?.title || "Session thumbnail"}
            className="w-full h-40 md:h-48 object-cover"
          />
        </div>
      </div>

      {isOpen && (
        <SessionModal
          id={singleSessionId}
          isOpen={isOpen}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default SessionCard;
