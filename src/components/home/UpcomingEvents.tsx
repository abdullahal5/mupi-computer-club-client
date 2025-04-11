import { useGetAllEventsQuery } from "../../redux/features/event/eventApi";
import { IEvent } from "../../types";
import EventCard from "../ui/EventCard";
import Loading from "../ui/Loading";
import NotAvailableMessage from "../ui/NotAvailableMessage";

const UpcomingEvents = () => {
  const { data: getAllEventInfo, isLoading } = useGetAllEventsQuery({});
  const getAllEventData = getAllEventInfo?.data as IEvent[];

  return (
    <>
      <h1 className="text-3xl font-semibold text-center py-10">
        Upcoming Events
      </h1>
      <div className="flex lg:flex-row md:flex-row flex-col items-center justify-center gap-5 px-5">
        {isLoading ? (
          <Loading />
        ) : getAllEventData?.length ? (
          getAllEventData
            .slice(0, 2)
            .map((event: IEvent, index) => (
              <EventCard key={index} event={event} />
            ))
        ) : (
          <NotAvailableMessage message="No upcoming events available." />
        )}
      </div>
    </>
  );
};

export default UpcomingEvents;
