import React from "react";
import "./ThongTinCaNhan.css";
import { NavLink } from 'react-router-dom';
import Header from "../../layout/Header/Header";
import { useState } from "react";

const ThongTinCaNhan = () => {
    const [image, setImage] = useState('/users');

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
    <div className="container">
        <div><Header/></div>
      <div className="row">
        <div className="col-4 pl-24 mt-3">
          <div className="titleTopLeft">
            <div className="relative">
            <img
              className="  imgLeft"
              src="https://antimatter.vn/wp-content/uploads/2023/02/hinh-anh-avatar-ff.jpg"
              alt="imgUser"
            />
            <button className="buttonEdit absolute z-5" onClick={handleEditImage}>Sửa ảnh</button>
            </div>
            <input 
            
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={inputFileRef}
          onChange={handleImageChange}
        />
            <p className="texTopLeft mt-2">Ten user</p>
            <p >Khách</p>
          </div >
          <div className="titleBotLeft mt-3 ">
            <p className="texBotLeft">Xác minh danh tính của bạn</p>
            <i class="fa-regular fa-shield-check" style={{fontSize:"30px"}}></i>
            <p className=" text-center">
              Bạn cần hoàn tất bước này trước khi đặt phòng/đặt chỗ hoặc đón
              tiếp khách trên Airbnb.
            </p>
            <NavLink to="/xac-minh">
            
            <button className="buttonleft text-black hover:text-white bg-gray-100 hover:bg-gray-500 ">Xác minh</button>
            </NavLink>
          </div>
        </div>
        <div className="col-8">

            <div className=" mt-4 displayUser ">
              <div>
                <p className="texTopLeft" >Xin Chào Tôi Là : </p>
                <NavLink 
                to="/tao-ho-so">
                <button className=" buttonEdit text-black hover:text-white bg-gray-100 hover:bg-gray-400  ">Chỉnh sửa hồ sơ</button>
                </NavLink>

              </div>
              <hr className="mt-5" />
            </div>

            <div className=" mt-56 pl-40">
                <hr style={{width:"60%"}} />
                <div className="titleRight mt-5">
                <p className="texTopLeft">Đã đến lúc tạo hồ sơ của bạn</p>
                <p className="line-clamp-5 w-50 mt-3">Hồ sơ Airbnb của bạn là một phần quan trọng đối với mọi yêu cầu đặt phòng/đặt chỗ. Hãy tạo hồ sơ để giúp các Chủ nhà/Người tổ chức và khách khác tìm hiểu về bạn.</p>
                <NavLink 
                to="/tao-ho-so">
                <button className="buttonleft text-white bg-rose-600 hover:bg-rose-700 ">Tạo hồ sơ</button>
                </NavLink>
                </div>
            </div>
        </div>
      </div>
      <div>Footer</div>
    </div>
  );
};

export default ThongTinCaNhan;
