import React from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import ListRoom from "../../layout/ListRoom/ListRoom";
import WithIcons from "../../layout/RoomFilter/WithIcons/WithIcons";
import WithLocation from "../../layout/RoomFilter/WithLocation/WithLocation";
import PastExperiences from "../../layout/RoomFilter/PastExperiences/PastExperiences";
import useChangePageTitle from "../../hooks/useChangePageTitle";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";

const HomePage = () => {
  useChangePageTitle("Airbnb | Nhà nghỉ dưỡng cho thuê, cabin, nhà trên bãi biển, v.v.")
  return (
    <div className="h-full ">
      <div className="px-20">
        <Header />
      </div>
      <div className="h-full sm:px-3 lg:px-10 md:px-8 xl:px-20">
        <WithIcons />
        <WithLocation/>
        <ListRoom />
        <div>
          <PastExperiences/>
        </div>
      </div>
      <div className="h-3/4 w-full mt-3 ">
        <Footer />
      </div>
      <ScrollToTopButton/>
    </div>
  );
};

export default HomePage;
