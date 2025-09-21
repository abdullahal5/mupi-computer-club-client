import { useGetAllEventsQuery } from "../../../redux/features/event/eventApi";
import { IEvent } from "../../../types";
import EventCard from "../../ui/EventCard";
import Loading from "../../ui/Loading";
import NotAvailableMessage from "../../ui/NotAvailableMessage";

const Events = () => {
  const { data: getAllEventInfo, isLoading, isFetching } = useGetAllEventsQuery({});
  const getAllEventData = getAllEventInfo?.data as IEvent[];

  return (
    <div className="flex items-center justify-center pt-6 md:pt-10 px-4 sm:px-6">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {isLoading || isFetching ? (
            <div className="col-span-6">
              <Loading />
            </div>
          ) : getAllEventData?.length ? (
            getAllEventData.map((event: IEvent, index) => (
              <EventCard key={index} event={event} />
            ))
          ) : (
            <div className="col-span-6">
              <NotAvailableMessage message="No events available." />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
