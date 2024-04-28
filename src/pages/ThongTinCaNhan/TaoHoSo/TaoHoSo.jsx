import React from "react";
import "./TaoHoSo.scss";
import Header from "../../../layout/Header/Header";
import Footer from "../../../layout/Footer/Footer";
import { useState } from "react";
import DetailPopupLeft from "../../../components/Popup/DetailPopupLeft";
import DetailPopupright from "../../../components/Popup/DetailPopupRight";
import DetailPopupBot from "../../../components/Popup/DetailPopupBot";

const TaoHoSo = () => {
  const [image, setImage] = useState(
    "https://antimatter.vn/wp-content/uploads/2023/02/hinh-anh-avatar-ff.jpg"
  );

  const handleEditImage = () => {
    // Gọi click() trên input element ẩn
    inputFileRef.current.click();
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setImage(imageUrl);
  };

  // Tham chiếu đến input file element
  const inputFileRef = React.createRef();

  return (
    <div>
      <div className="container">
        <div>
          <Header />
        </div>
        <div className="grid grid-cols-5 mt-5 pr-24">
          <div className="col-span-2">
            <div className="relative ml-24">
              <img className="  imgLeft" src={image} alt="" />
              <button
                className="buttonEdit absolute z-5"
                onClick={handleEditImage}
              >
                {" "}
                <i class="fa-duotone fa-camera-retro"></i> Thêm
              </button>
            </div>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={inputFileRef}
              onChange={handleImageChange}
            />
          </div>
          <div className="col-span-3">
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
              <div className="col-span-3 ">
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
