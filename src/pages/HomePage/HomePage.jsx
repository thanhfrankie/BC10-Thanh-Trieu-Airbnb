import React from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import ListRoom from "../../layout/ListRoom/ListRoom";
import RoomFilter from "../../layout/RoomFilter/RoomFilter";

const HomePage = () => {
  
  return (
    <div className="h-full ">
      {/* Header  */}
      <div className="px-20">
        <Header />
      </div>
      <div className="h-full px-20">
        <RoomFilter/>
        <ListRoom />
      </div>
      {/* Footer */}
      <div className="h-3/4 w-full mt-3 ">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
