import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import GlobalModal from "../../../../components/modal/GlobalModal";
import AddExecutives from "./AddExecutives";
import { IExecutives } from "../../../../types";
import {
  useDeleteExecutiveMutation,
  useGetAllExecutivesQuery,
} from "../../../../redux/features/executives/executivesApi";
import UpdateExecutives from "./UpdateExecutives";
import Loading from "../../../../components/ui/Loading";

const Executives = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [singleSessionId, setSingleSessionId] = useState<string>("");

  const {
    data: getAllExecutiveInfo,
    isLoading,
    isFetching,
  } = useGetAllExecutivesQuery({});
  const getAllExecutiveData = getAllExecutiveInfo?.data as IExecutives[];
  const [deleteExecutives] = useDeleteExecutiveMutation();

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
        <h1 className="text-2xl md:text-3xl font-bold">
          Executives Management
        </h1>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition w-full md:w-auto justify-center"
        >
          <FaPlus size={16} />
          Add Executive
        </button>
      </div>

      {/* Scrollable Table Container */}
      <div className="relative">
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <table className="w-full table-auto text-sm border-collapse border border-gray-500 rounded-md">
              <thead className="bg-white/15">
                <tr>
                  <th className="px-4 py-2 border border-gray-500 text-left">
                    Profile
                  </th>
                  <th className="px-4 py-2 border border-gray-500 text-left">
                    Executive Name
                  </th>
                  <th className="px-4 py-2 border border-gray-500 text-left">
                    Roll Type
                  </th>
                  <th className="px-4 py-2 border border-gray-500 text-left">
                    Role
                  </th>
                  <th className="px-4 py-2 border border-gray-500 text-left">
                    Session
                  </th>
                  <th className="px-4 py-2 border border-gray-500 text-left">
                    Rank
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
                    {getAllExecutiveData?.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="text-center py-4 text-gray-500"
                        >
                          No executives data available
                        </td>
                      </tr>
                    ) : (
                      getAllExecutiveData?.map((executive, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 border border-gray-500">
                            <img
                              className="w-10 h-10 rounded-full"
                              src={executive.profileImage}
                              alt="Profile"
                            />
                          </td>
                          <td className="px-4 py-3 border border-gray-500">
                            {executive.fullName}
                          </td>
                          <td className="px-4 py-3 border border-gray-500">
                            {executive.roleType}
                          </td>
                          <td className="px-4 py-3 border border-gray-500">
                            {executive.role}
                          </td>
                          <td className="px-4 py-3 border border-gray-500">
                            {executive.session}
                          </td>
                          <td className="px-4 py-3 border border-gray-500">
                            {executive.rank}
                          </td>
                          <td className="px-4 py-3 border border-gray-500">
                            <div className="flex gap-3">
                              <button
                                onClick={() => onEdit(executive._id)}
                                className="text-blue-600 hover:text-blue-800 p-1"
                              >
                                <FaEdit size={16} />
                              </button>
                              <button
                                onClick={() => deleteExecutives(executive._id)}
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
        <AddExecutives onClose={onClose} />
      </GlobalModal>

      <GlobalModal isOpen={isEditModalOpen} onClose={onClose}>
        <UpdateExecutives id={singleSessionId} onClose={onClose} />
      </GlobalModal>
    </div>
  );
};

export default Executives;
