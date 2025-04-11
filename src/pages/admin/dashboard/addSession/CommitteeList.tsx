import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import GlobalModal from "../../../../components/modal/GlobalModal";
import {
  useDeleteCommitteeMutation,
  useGetAllCommitteesQuery,
} from "../../../../redux/features/committee/committeeApi";
import { ICommittee } from "../../../../types";
import AddCommittee from "../addSession/AddCommittee";
import UpdateCommittee from "../addSession/UpdateCommittee";
import Loading from "../../../../components/ui/Loading";

const CommitteeList = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [singleSessionId, setSingleSessionId] = useState<string>("");

  const { data: getAllCommitteeInfo, isLoading, isFetching } = useGetAllCommitteesQuery(undefined);
  const getAllCommitteeData = getAllCommitteeInfo?.data as ICommittee[];

  const [deleteCommittee] = useDeleteCommitteeMutation();

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
          Committee's Management
        </h1>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition w-full md:w-auto justify-center"
        >
          <FaPlus size={16} />
          Add Committee
        </button>
      </div>

      <div className="relative">
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <table className="w-full table-auto text-sm border-collapse border border-gray-500 rounded-md">
              <thead className="bg-white/15">
                <tr>
                  <th className="px-4 py-2 border border-gray-500 text-left">
                    Year
                  </th>
                  <th className="px-4 py-2 border border-gray-500 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading || isFetching ? (
                  <td colSpan={2} className="px-4 py-6 border border-gray-500">
                    <Loading />
                  </td>
                ) : (
                  <>
                    {getAllCommitteeData?.length === 0 ? (
                      <tr>
                        <td
                          colSpan={2}
                          className="text-center py-4 text-gray-500"
                        >
                          No Committees data available
                        </td>
                      </tr>
                    ) : (
                      getAllCommitteeData?.map((committee, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 border border-gray-500">
                            {committee.year}
                          </td>
                          <td className="px-4 py-3 border border-gray-500">
                            <div className="flex gap-3">
                              <button
                                onClick={() => onEdit(committee?._id)}
                                className="text-blue-600 hover:text-blue-800 p-1"
                              >
                                <FaEdit size={16} />
                              </button>
                              <button
                                onClick={() => deleteCommittee(committee?._id)}
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
        <AddCommittee onClose={onClose} />
      </GlobalModal>
      <GlobalModal isOpen={isEditModalOpen} onClose={onClose}>
        <UpdateCommittee id={singleSessionId} onClose={onClose} />
      </GlobalModal>
    </div>
  );
};

export default CommitteeList;
