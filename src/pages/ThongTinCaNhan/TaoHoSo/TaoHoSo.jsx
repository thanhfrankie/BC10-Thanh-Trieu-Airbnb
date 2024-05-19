import React from "react";
import "./TaoHoSo.scss";
import Header from "../../../layout/Header/Header";
import Footer from "../../../layout/Footer/Footer";
import DetailPopupLeft from "../../../components/Popup/DetailPopupLeft";
import DetailPopupright from "../../../components/Popup/DetailPopupRight";
import DetailPopupBot from "../../../components/Popup/DetailPopupBot";
import ScrollToTopButton from "../../../components/ScrollToTopButton/ScrollToTopButton";
const TaoHoSo = () => {
  return (
    <div>
      <div className="container" >
        <div>
          <Header />
        </div>
        <div className=" mt-10 pr-24 paddingR24">
          <div className=" pr-28 paddingR28  pl-52 paddingL52">
            <div className=" pb-4">
              <p className="textTitle">Hồ sơ của bạn</p>
              <p>
                Thông tin mà bạn chia sẻ sẽ được sử dụng trên khắp nền tảng
                Airbnb để giúp các khách và Chủ nhà/Người tổ chức khác biết thêm
                về bạn.
              </p>
            </div>
            <div className="grid taoHoSoGrid grid-cols-6 gap-1 ">
              <div className="col-span-3 taoHoSoCol ">
                <DetailPopupLeft />
              </div>
              <div className="col-span-3 taoHoSoCol " >
                <DetailPopupright />
              </div>
            </div>
            <div>
              <DetailPopupBot />
            </div>
          </div>
        </div>
        <div>
          <Footer />
        </div>
        <ScrollToTopButton/>
      </div>
    </div>
  );
};

export default TaoHoSo;
