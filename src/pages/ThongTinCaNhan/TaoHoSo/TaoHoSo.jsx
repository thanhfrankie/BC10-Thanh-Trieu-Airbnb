import React from "react";
import "./TaoHoSo.scss";
import Header from "../../../layout/Header/Header";
import Footer from "../../../layout/Footer/Footer";
import DetailPopupLeft from "../../../components/Popup/DetailPopupLeft";
import DetailPopupright from "../../../components/Popup/DetailPopupRight";
import DetailPopupBot from "../../../components/Popup/DetailPopupBot";

const TaoHoSo = () => {
  return (
    <div>
      <div className="container" >
        <div>
          <Header />
        </div>
        <div className=" mt-5 pr-24">
          <div className=" pr-60 pl-80">
            <div className=" pb-4">
              <p className="textTitle">Hồ sơ của bạn</p>
              <p>
                Thông tin mà bạn chia sẻ sẽ được sử dụng trên khắp nền tảng
                Airbnb để giúp các khách và Chủ nhà/Người tổ chức khác biết thêm
                về bạn.
              </p>
            </div>
            <div className="grid grid-cols-6 gap-1 ">
              <div className="col-span-3 ">
                <DetailPopupLeft />
              </div>
              <div className="col-span-3 " >
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
      </div>
    </div>
  );
};

export default TaoHoSo;
