import { BiUser } from "react-icons/bi";
import { CiShare2 } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IArticle } from "../../types";
import { formatDate } from "../../utils/formatDate";

const ArticleCard = ({ article }: { article: IArticle }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();

    const fullUrl = `${window.location.origin}/articles/${article?._id}`;
    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <Link to={`/articles/${article?._id}`} className="group">
      <div className="lg:min-w-[40rem] md:min-w-[40rem] w-full h-auto bg-[#17163A] border border-gray-800 hover:border-blue-500/30 rounded-xl p-4 text-white my-4 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Content Section */}
          <div className="flex-1 space-y-3 order-2 md:order-1">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-xs sm:text-sm">
                {formatDate(article?.createdAt)}
              </span>
              <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-300 rounded-full">
                Latest
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-semibold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
              {article?.title}
            </h2>

            <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">
              {article?.bio}
            </p>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                <BiUser className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{article?.authorName || "Unknown Author"}</span>
              </div>
              <div className="relative flex items-center gap-3 text-gray-400">
                {copied && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white bg-gray-800 px-2 py-0.5 p-1 rounded shadow-md">
                    Copied!
                  </span>
                )}
                <button
                  className="hover:text-white transition-colors duration-300 hover:scale-110"
                  onClick={handleShare}
                >
                  <CiShare2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-44 order-1 md:order-2">
            <div className="relative overflow-hidden rounded-lg aspect-video md:aspect-auto md:h-full">
              <img
                src={article?.thumbnailImage || "/placeholder-article.jpg"}
                alt="Blog thumbnail"
                className="w-96 lg:h-32 md:h-32 h-48 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
