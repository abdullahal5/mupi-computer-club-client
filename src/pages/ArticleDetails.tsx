import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { CiShare2 } from "react-icons/ci";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetAllArticleQuery,
  useGetSingleArticleQuery,
} from "../redux/features/article/articleApi";
import { IArticle } from "../types";
import { formatDate } from "../utils/formatDate";
import Loading from "../components/ui/Loading";

export default function ArticleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const { data: getSingleArticleInfo, isLoading, isFetching } = useGetSingleArticleQuery(
    id,
    {
      skip: !id,
    }
  );

  const { data: allArticlesInfo } = useGetAllArticleQuery(undefined);
  const articles = allArticlesInfo?.data || [];

  const currentIndex = articles.findIndex(
    (article: IArticle) => article._id === id
  );
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  const articleData = getSingleArticleInfo?.data as IArticle;

  const handleShare = () => {
    const fullUrl = `${window.location.origin}/articles/${articleData?._id}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen pt-36 p-4">
      <div className="bg-[#1D1B3F] text-white max-w-4xl w-full p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate("/articles")}
            className="flex items-center text-gray-300 hover:text-white"
          >
            <BsArrowLeft size={24} className="mr-2" />
            <span>Back</span>
          </button>
        </div>

        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">{articleData?.title}</h1>
          <div className="relative">
            <button
              onClick={handleShare}
              className="text-gray-400 hover:text-white transition-transform duration-200 hover:scale-110"
            >
              <CiShare2 size={22} />
            </button>
            {copied && (
              <div className="absolute -top-7 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md z-10">
                Copied!
              </div>
            )}
          </div>
        </div>

        <p className="text-gray-300 mb-4">{articleData?.bio}</p>
        <div className="flex items-center text-gray-400 text-sm mb-4">
          <span>📅 {formatDate(articleData?.createdAt)}</span>
          <span className="mx-2">•</span>
          <span>✍️ {articleData?.authorName}</span>
        </div>
        <img
          src={articleData?.thumbnailImage}
          alt="Thumbnail"
          className="w-full rounded-lg mb-6"
        />
        <hr />
        <div
          dangerouslySetInnerHTML={{ __html: articleData?.content }}
          className="prose dark:prose-invert max-w-full"
        />

        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={!prevArticle}
            onClick={() =>
              prevArticle && navigate(`/articles/${prevArticle._id}`)
            }
            className={`px-4 py-2 rounded-lg ${
              prevArticle
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-800 text-gray-500 cursor-not-allowed"
            }`}
          >
            ⬅ Prev
          </button>

          <button
            disabled={!nextArticle}
            onClick={() =>
              nextArticle && navigate(`/articles/${nextArticle._id}`)
            }
            className={`px-4 py-2 rounded-lg ${
              nextArticle
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-800 text-gray-500 cursor-not-allowed"
            }`}
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
}
