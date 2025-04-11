import { useGetAllArticleQuery } from "../../redux/features/article/articleApi";
import { IArticle } from "../../types";
import ArticleCard from "../ui/ArticleCard";
import Loading from "../ui/Loading";
import NotAvailableMessage from "../ui/NotAvailableMessage";

const LatestBlog = () => {
  const { data: getAllArticleInfo, isLoading } =
    useGetAllArticleQuery(undefined);
  const getAllArticleData = getAllArticleInfo?.data as IArticle[];

  return (
    <>
      <div className="bg-[#070838] py-10 my-10">
        <h1 className="text-3xl font-semibold text-center pb-10">
          Expand your learning
        </h1>

        <div className="flex items-center px-5 justify-center flex-col gap-5">
          {isLoading ? (
            <Loading />
          ) : getAllArticleData?.length ? (
            getAllArticleData
              .slice(0, 2)
              .map((article: IArticle, index) => (
                <ArticleCard key={index} article={article} />
              ))
          ) : (
            <NotAvailableMessage message="No blog articles available." />
          )}
        </div>
      </div>
    </>
  );
};

export default LatestBlog;
