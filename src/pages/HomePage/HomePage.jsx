import React from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";

const HomePage = () => {
  return (
    <div className="px-20">
      {/* Header  */}
      <div className=""> 

          <Header/>
      </div>
          {/* Footer */}
          <Footer/>
    </div>
  );
};

export default HomePage;
