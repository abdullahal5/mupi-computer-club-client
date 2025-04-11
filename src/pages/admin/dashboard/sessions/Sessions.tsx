import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import GlobalModal from "../../../../components/modal/GlobalModal";
import AddSessions from "./AddSessions";
import {
  useDeleteSessionMutation,
  useGetAllSessionsQuery,
} from "../../../../redux/features/sessions/sessionsApi";
import { ISession } from "../../../../types";
import UpdateSession from "./UpdateSession";
import Loading from "../../../../components/ui/Loading";

const Sessions = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [singleSessionId, setSingleSessionId] = useState<string>("");
  const { data: getAllSessionInfo, isLoading, isFetching } = useGetAllSessionsQuery(undefined);

  const getAllSessionData = getAllSessionInfo?.data as ISession[];
  const [deleteSession] = useDeleteSessionMutation();

  const onClose = () => {
    setIsOpen(false);
    setIsEditModalOpen(false);
  };

  const onEdit = (id: string) => {
    setIsEditModalOpen(true);
    setSingleSessionId(id);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Sessions Management</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition w-full md:w-auto justify-center"
        >
          <FaPlus size={16} />
          Add Session
        </button>
      </div>

      {/* Scrollable Table Container */}
      <div className="relative">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {" "}
            {/* Minimum width to ensure all columns fit */}
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
                    Session Link
                  </th>
                  <th className="px-4 py-2 border border-gray-500 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading || isFetching ? (
                  <td colSpan={7} className="px-4 py-6 border border-gray-500">
                    <Loading />
                  </td>
                ) : (
                  <>
                    {getAllSessionData?.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="text-center py-4 text-gray-500"
                        >
                          No sessions data available
                        </td>
                      </tr>
                    ) : (
                      getAllSessionData?.map((session, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 border border-gray-500">
                            {session.title}
                          </td>
                          <td className="px-4 py-3 border border-gray-500">
                            {session.date}
                          </td>
                          <td className="px-4 py-3 border border-gray-500">
                            {session.startTime}
                          </td>
                          <td className="px-4 py-3 border border-gray-500">
                            {session.endTime}
                          </td>
                          <td className="px-4 py-3 border border-gray-500">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                session.status === "active"
                                  ? "bg-green-500/20 text-green-500"
                                  : "bg-red-500/20 text-red-500"
                              }`}
                            >
                              {session.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 border border-gray-500 truncate max-w-xs">
                            {session.sessionLink}
                          </td>
                          <td className="px-4 py-3 border border-gray-500">
                            <div className="flex gap-3">
                              <button
                                onClick={() => onEdit(session?._id)}
                                className="text-blue-600 hover:text-blue-800 p-1"
                              >
                                <FaEdit size={16} />
                              </button>
                              <button
                                onClick={() => deleteSession(session?._id)}
                                className="text-red-600 hover:text-red-800 p-1"
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
        <AddSessions onClose={onClose} />
      </GlobalModal>
      <GlobalModal isOpen={isEditModalOpen} onClose={onClose}>
        <UpdateSession onClose={onClose} id={singleSessionId} />
      </GlobalModal>
    </div>
  );
};

export default Sessions;
