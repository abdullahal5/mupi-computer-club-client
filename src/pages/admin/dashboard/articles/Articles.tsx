import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import AddArticles from "./AddArticles";
import GlobalModal from "../../../../components/modal/GlobalModal";
import { useState } from "react";
import {
  useDeleteArticleMutation,
  useGetAllArticleQuery,
} from "../../../../redux/features/article/articleApi";
import { IArticle } from "../../../../types";
import UpdateArticle from "./UpdateArticle";
import Loading from "../../../../components/ui/Loading";

const Articles = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [singleSessionId, setSingleSessionId] = useState<string>("");

  const { data: getAllArticleInfo, isLoading, isFetching } = useGetAllArticleQuery(undefined);
  const getAllArticleData = getAllArticleInfo?.data as IArticle[];

  const [deleteArticle] = useDeleteArticleMutation();

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
        <h1 className="text-2xl md:text-3xl font-bold">Articles Management</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition w-full md:w-auto justify-center"
        >
          <FaPlus size={16} />
          Add Article
        </button>
      </div>

      {/* Scrollable table container */}
      <div className="relative">
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            <table className="w-full table-auto text-sm border-collapse border border-gray-500 rounded-md">
              <thead className="bg-white/15">
                <tr>
                  <th className="px-4 py-2 border border-gray-500 text-left">
                    Article Name
                  </th>
                  <th className="px-4 py-2 border border-gray-500 text-left">
                    Author Name
                  </th>
                  <th className="px-4 py-2 border border-gray-500 text-left">
                    Date
                  </th>
                  <th className="px-4 py-2 border border-gray-500 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading || isFetching ? (
                  <td colSpan={4} className="px-4 py-6 border border-gray-500">
                    <Loading />
                  </td>
                ) : (
                  <>
                    {getAllArticleData?.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="text-center py-4 text-gray-500"
                        >
                          No articles data available
                        </td>
                      </tr>
                    ) : (
                      getAllArticleData?.map((article, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 border border-gray-500">
                            {article.title}
                          </td>
                          <td className="px-4 py-3 border border-gray-500">
                            {article.authorName}
                          </td>
                          <td className="px-4 py-3 border border-gray-500">
                            {article.createdAt}
                          </td>
                          <td className="px-4 py-3 border border-gray-500">
                            <div className="flex gap-3">
                              <button
                                onClick={() => onEdit(article._id)}
                                className="text-blue-600 hover:text-blue-800 p-1"
                              >
                                <FaEdit size={16} />
                              </button>
                              <button
                                onClick={() => deleteArticle(article._id)}
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

      {/* Add Modal */}
      <GlobalModal isOpen={isOpen} onClose={onClose}>
        <AddArticles onClose={onClose} />
      </GlobalModal>

      {/* Edit Modal */}
      <GlobalModal isOpen={isEditModalOpen} onClose={onClose}>
        <UpdateArticle onClose={onClose} id={singleSessionId} />
      </GlobalModal>
    </div>
  );
};

export default Articles;
