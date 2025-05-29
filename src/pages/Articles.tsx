import ArticleCard from "../components/ui/ArticleCard";
import { useGetAllArticleQuery } from "../redux/features/article/articleApi";
import { IArticle } from "../types";
import Loading from "../components/ui/Loading";
import NotAvailableMessage from "../components/ui/NotAvailableMessage";

const Articles = () => {
  const { data: getAllArticleInfo, isLoading } =
    useGetAllArticleQuery(undefined);
  const getAllArticleData = getAllArticleInfo?.data as IArticle[];

  return (
    <div className="pt-36">
      <div className="max-w-3xl px-5 mx-auto space-y-3">
        {isLoading ? (
          <Loading />
        ) : getAllArticleData?.length ? (
          getAllArticleData.map((article: IArticle, index) => (
            <ArticleCard index={index} key={index} article={article} />
          ))
        ) : (
          <NotAvailableMessage message="No Article Available" />
        )}
      </div>
    </div>
  );
};

export default Articles;
