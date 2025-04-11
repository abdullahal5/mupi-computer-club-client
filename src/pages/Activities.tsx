/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sessions from "../components/activities/sessions/Sessions";
import Events from "../components/activities/events/Events";
import Projects from "../components/activities/projects/Projects";
import EventModal from "../components/modal/EventModal";
import SessionModal from "../components/modal/SessionModal"; // Import SessionModal

const Activities = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getTabFromQuery =
    new URLSearchParams(location.search).get("tab") || "events";
  const getEventIdFromQuery = new URLSearchParams(location.search).get(
    "eventId"
  );
  const getSessionIdFromQuery = new URLSearchParams(location.search).get(
    "sessionId"
  ); // Get sessionId from query params
  const [tab, setTab] = useState(getTabFromQuery);
  const [eventId, setEventId] = useState(getEventIdFromQuery || "");
  const [sessionId, setSessionId] = useState(getSessionIdFromQuery || ""); // Store sessionId

  useEffect(() => {
    navigate(`?tab=${tab}`, { replace: true });
  }, [tab, navigate]);

  useEffect(() => {
    if (getEventIdFromQuery) {
      setEventId(getEventIdFromQuery);
    }
  }, [location.search]);

  useEffect(() => {
    if (getSessionIdFromQuery) {
      setSessionId(getSessionIdFromQuery); // Update sessionId if it's in the query
    }
  }, [location.search]);

  const handleCloseModal = () => {
    const params = new URLSearchParams(location.search);
    params.delete("eventId");
    params.delete("sessionId"); // Delete sessionId from URL when closing modal
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    setEventId("");
    setSessionId(""); // Clear sessionId state
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-36">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
        <h1 className="text-2xl sm:text-3xl font-semibold">Activities</h1>
        <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <button
            onClick={() => setTab("events")}
            className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-full transition-all duration-300 text-sm sm:text-base ${
              tab === "events"
                ? "bg-blue-500 text-white"
                : "bg-blue-500/20 hover:bg-blue-500/30 text-blue-100"
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setTab("sessions")}
            className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-full transition-all duration-300 text-sm sm:text-base ${
              tab === "sessions"
                ? "bg-blue-500 text-white"
                : "bg-blue-500/20 hover:bg-blue-500/30 text-blue-100"
            }`}
          >
            Sessions
          </button>
          <button
            onClick={() => setTab("projects")}
            className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-full transition-all duration-300 text-sm sm:text-base ${
              tab === "projects"
                ? "bg-blue-500 text-white"
                : "bg-blue-500/20 hover:bg-blue-500/30 text-blue-100"
            }`}
          >
            Projects
          </button>
        </div>
      </div>

      <div className="mt-6 sm:mt-10">
        {tab === "events" && <Events />}
        {tab === "sessions" && <Sessions />}
        {tab === "projects" && <Projects />}
      </div>

      {eventId && (
        <EventModal id={eventId} isOpen={true} onClose={handleCloseModal} />
      )}

      {/* Display SessionModal if sessionId is present in the query string */}
      {sessionId && (
        <SessionModal id={sessionId} isOpen={true} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Activities;
