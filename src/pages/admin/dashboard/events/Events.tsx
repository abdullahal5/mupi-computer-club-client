import { useState } from "react";
import AddEvents from "./AddEvents";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import GlobalModal from "../../../../components/modal/GlobalModal";
import {
  useDeleteEventMutation,
  useGetAllEventsQuery,
} from "../../../../redux/features/event/eventApi";
import { IEvent } from "../../../../types";
import UpdateEvents from "./UpdateEvents";
import Loading from "../../../../components/ui/Loading";

const Events = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const { data: getAllEventInfo, isLoading, isFetching } = useGetAllEventsQuery(undefined);
  const [singleSessionId, setSingleSessionId] = useState<string>("");
  const getAllEventData = getAllEventInfo?.data as IEvent[];
  const [deleteEvent] = useDeleteEventMutation();

  const onClose = () => {
    setIsOpen(false);
    setIsEditModalOpen(false);
  };

  const onEdit = (id: string) => {
    setIsEditModalOpen(true);
    setSingleSessionId(id);
  };

  const onDelete = async (id: string) => {
    await deleteEvent(id);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Events Management</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition w-full md:w-auto justify-center"
        >
          <FaPlus size={16} />
          Add Event
        </button>
      </div>

      {/* Scrollable Table Container */}
      <div className="relative">
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            {" "}
            <table className="w-full table-auto text-sm border-collapse border border-gray-500 rounded-md">
              <thead className="bg-white/15">
                <tr>
                  <th className="px-4 py-2 border border-gray-500 text-left">
                    Event Name
                  </th>
                  <th className="px-4 py-2 border border-gray-500 text-left">
                    Date
                  </th>
                  <th className="px-4 py-2 border border-gray-500 text-left">
                    Start Time
                  </th>
                  <th className="px-4 py-2 border border-gray-500 text-left">
                    End Time
                  </th>
                  <th className="px-4 py-2 border border-gray-500 text-left">
                    Status
                  </th>
                  <th className="px-4 py-2 border border-gray-500 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading || isFetching ? (
                  <td colSpan={6} className="px-4 py-6 border border-gray-500">
                    <Loading />
                  </td>
                ) : (
                  <>
                    {getAllEventData?.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="text-center py-4 text-gray-500"
                        >
                          No events data available
                        </td>
                      </tr>
                    ) : (
                      getAllEventData?.map((event, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 border border-gray-500">
                            {event.title}
                          </td>
                          <td className="px-4 py-3 border border-gray-500">
                            {event.date}
                          </td>
                          <td className="px-4 py-3 border border-gray-500">
                            {event.startTime}
                          </td>
                          <td className="px-4 py-3 border border-gray-500">
                            {event.endTime}
                          </td>
                          <td className="px-4 py-3 border border-gray-500">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                event.status === "active"
                                  ? "bg-green-500/20 text-green-500"
                                  : "bg-red-500/20 text-red-500"
                              }`}
                            >
                              {event.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 border border-gray-500">
                            <div className="flex gap-3">
                              <button
                                onClick={() => onEdit(event?._id)}
                                className="text-blue-600 hover:text-blue-800 p-1"
                                aria-label="Edit event"
                              >
                                <FaEdit size={16} />
                              </button>
                              <button
                                onClick={() => onDelete(event?._id)}
                                className="text-red-600 hover:text-red-800 p-1"
                                aria-label="Delete event"
                              >
                                <FaTrash size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <GlobalModal isOpen={isOpen} onClose={onClose}>
        <AddEvents onClose={onClose} />
      </GlobalModal>

      <GlobalModal isOpen={isEditModalOpen} onClose={onClose}>
        <UpdateEvents id={singleSessionId} onClose={onClose} />
      </GlobalModal>
    </div>
  );
};

export default Events;
