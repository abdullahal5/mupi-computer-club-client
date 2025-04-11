import Banner from "../components/home/Banner";
import Extra from "../components/home/Extra";
import FAQ from "../components/home/FAQ";
import LatestBlog from "../components/home/LatestBlog";
import UpcomingEvents from "../components/home/UpcomingEvents";

const Home = () => {
  return (
    <div>
      <Banner />
      <UpcomingEvents />
      <LatestBlog />
      <FAQ />
      <Extra />
    </div>
  );
};

export default Home;
