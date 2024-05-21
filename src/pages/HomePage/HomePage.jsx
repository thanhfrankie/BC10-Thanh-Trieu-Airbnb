import React from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import ListRoom from "../../layout/ListRoom/ListRoom";
import WithIcons from "../../layout/RoomFilter/WithIcons/WithIcons";
import WithLocation from "../../layout/RoomFilter/WithLocation/WithLocation";
import PastExperiences from "../../layout/RoomFilter/PastExperiences/PastExperiences";
import useChangePageTitle from "../../hooks/useChangePageTitle";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";
import "./HomePage.scss";
const HomePage = () => {
  useChangePageTitle("Airbnb | Nhà nghỉ dưỡng cho thuê, cabin, nhà trên bãi biển, v.v.")
  return (
    <div className="homepage h-full mx-auto">
      <div className="homepage-header w-full fixed top-0 left-0 z-20 bg-white">
        <Header />
        <div className="homepage-filter__icon h-full w-full sm:px-3 lg:px-8 md:px-8 xl:px-20">
        <WithIcons />
        </div>
      </div>
      <div className="main-container h-full w-full sm:px-3 lg:px-10 md:px-8 xl:px-20">
        <div className="homepage-filter__location">

        <WithLocation/>
        </div>
        <ListRoom />
        <div className="w-full ">
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
