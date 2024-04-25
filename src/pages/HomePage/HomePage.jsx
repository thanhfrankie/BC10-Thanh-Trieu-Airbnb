import React from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";

const HomePage = () => {
  return (
    <div className="h-full ">
      {/* Header  */}
      <div className="px-20">
        <Header />
      </div>
      {/* Footer */}
      <div className="h-3/4 w-full mt-3 ">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
