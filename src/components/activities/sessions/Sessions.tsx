import { useGetAllSessionsQuery } from "../../../redux/features/sessions/sessionsApi";
import { ISession } from "../../../types";
import SessionCard from "../../ui/SessionCard";
import Loading from "../../ui/Loading";
import NotAvailableMessage from "../../ui/NotAvailableMessage";
import { Link } from "react-router-dom";

const Sessions = () => {
  const { data: getAllSessionInfo, isLoading } =
    useGetAllSessionsQuery(undefined);
  const getAllSessionData = getAllSessionInfo?.data as ISession[];

  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10 justify-center pt-6 lg:pt-10 px-4 sm:px-6">
      {/* Sessions List - Now comes first in mobile view */}
      <div className="flex flex-col gap-4 md:gap-5 w-full lg:max-w-4xl order-2 lg:order-none">
        {isLoading ? (
          <Loading />
        ) : getAllSessionData?.length ? (
          getAllSessionData.map((session, index) => (
            <div key={index}>
              <SessionCard index={index} session={session} />
            </div>
          ))
        ) : (
          <NotAvailableMessage message="No sessions available." />
        )}
      </div>

      {/* Sidebar Section - Non-sticky on mobile, sticky on desktop */}
      <div className="w-full lg:w-auto order-1 lg:order-none lg:sticky lg:top-32">
        <div className="text-white rounded-lg w-full lg:w-80 bg-gray-800 p-5 lg:bg-transparent lg:p-0">
          <h2 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">
            Share your expertise
          </h2>
          <p className="text-gray-300 mb-4 lg:mb-6 text-sm lg:text-base">
            If you have expertise to share, you can lead a session. Inspire
            others and make a positive impact in a supportive environment!
          </p>
          <Link to={`/contact`}>
            <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 lg:px-6 lg:py-3 rounded-lg shadow-md transition duration-300 w-full lg:w-auto">
              Learn more
              <span className="text-lg lg:text-xl">&rarr;</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sessions;
