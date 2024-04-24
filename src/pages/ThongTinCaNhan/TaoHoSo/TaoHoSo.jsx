import React from "react";
import "./TaoHoSo.css";
import Header from "../../../layout/Header/Header";
import { useState } from "react";
import DetailPopupLeft from "../../../components/Popup/DetailPopupLeft";
import DetailPopupright from "../../../components/Popup/DetailPopupRight";
import DetailPopupBot from "../../../components/Popup/DetailPopupBot";


const TaoHoSo = () => {
  const [image, setImage] = useState("/users");

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
        <div className="row mt-5">
          <div className="col-4">
            <div className="relative ml-24">
              <img
                className="  imgLeft"
                src="https://antimatter.vn/wp-content/uploads/2023/02/hinh-anh-avatar-ff.jpg"
                alt="imgUser"
              />
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
          <div className="col-8">
            <div className=" pb-4">
              <p className="textTitle">Hồ sơ của bạn</p>
              <p>
                Thông tin mà bạn chia sẻ sẽ được sử dụng trên khắp nền tảng
                Airbnb để giúp các khách và Chủ nhà/Người tổ chức khác biết thêm
                về bạn. Tìm hiểu thêm
              </p>
            </div>
            <div className="row ">
              <div  >
              <DetailPopupLeft/>
              </div>
              <div >
                <DetailPopupright/>
              </div>
            </div>
            <div >
              <DetailPopupBot/>

            </div>
          </div>
        </div>
        <div>Footer</div>
      </div>
    </div>
  );
};

export default TaoHoSo;
