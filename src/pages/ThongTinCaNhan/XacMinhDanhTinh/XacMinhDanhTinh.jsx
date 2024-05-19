import React, { useState } from "react";
import { useNavigate,NavLink } from "react-router-dom";
import {  Select,Radio, Button } from "antd";
import "../ThongTinCaNhan.scss";
import Header from "../../../layout/Header/Header";
import Footer from "../../../layout/Footer/Footer";
const { Option } = Select;
const countries = require("../../../assets/data/countries.json");

const XacMinhDanhTinh = () => {
  const navigate = useNavigate();

  const handleCompleteButtonClick = () => {
    alert("Cập nhật thành công");
    navigate("/thong-tin-ca-nhan");
  };

  const [frontImageUrl, setFrontImageUrl] = useState(null);
  const [backImageUrl, setBackImageUrl] = useState(null);

  const handleFrontImageUpload = (e) => {
    const file = e.target.files[0];
    // Xử lý file ảnh mặt trước ở đây
    setFrontImage(file);

    // Lấy đường dẫn của hình ảnh và cập nhật vào state
    const imageUrl = URL.createObjectURL(file);
    setFrontImageUrl(imageUrl);
  };

  const handleBackImageUpload = (e) => {
    const file = e.target.files[0];
    // Xử lý file ảnh mặt sau ở đây
    setBackImage(file);
    const imageUrl = URL.createObjectURL(file);
    setBackImageUrl(imageUrl);
  };

  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showDocumentDetails, setShowDocumentDetails] = useState(false);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const handleDocumentChange = (e) => {
    setSelectedDocument(e.target.value);
    setShowDocumentDetails(false); // Ẩn nội dung khi chọn loại giấy tờ mới
  };

  const handleContinueButtonClick = () => {
    setShowDocumentDetails(true); // Hiển thị nội dung sau khi bấm nút tiếp tục
  };

  return (
    <div className="container" >
      <div className="mb-10">
        <Header />
      </div>
      <div className=" mr-20 ml-20 grid grid-cols-8 mt-5  " >
        <div style={{height:""}} className="col-span-3 ">
          <div style={{ width: "450px" }} className="borderXacMinh ">
            <p
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                margin: "10px 0px",
              }}
            >
              Chọn một loại giấy tờ tùy thân để thêm vào
            </p>
            <Select
              showSearch
              style={{ width: 200, margin: "10px 0px" }}
              placeholder="Chọn quốc gia"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {countries.map((country, index) => (
                <Option key={index} value={country}>
                  {country}
                </Option>
              ))}
            </Select>
            <div style={{ margin: "30px 0px" }}>
              <Radio.Group
                onChange={handleDocumentChange}
                value={selectedDocument}
              >
                <Radio
                  className="flex flex-row-reverse "
                  style={{ margin: "15px 0px" }}
                  value="giayPhepLaiXe"
                >
                  <span>Giấy phép lái xe</span>
                </Radio>
                <br />
                <hr />
                <Radio
                  className="flex flex-row-reverse"
                  style={{ margin: "15px 0px" }}
                  value="hoChieu"
                >
                  <span style={{ paddingRight: "42px" }}>Hộ chiếu</span>
                </Radio>
                <br />
                <hr />
                <Radio
                  className="flex flex-row-reverse"
                  style={{ margin: "15px 0px" }}
                  value="giayToTuTuyThan"
                >
                  <span>Giấy tờ tùy thân</span>
                </Radio>
                <hr />
              </Radio.Group>
            </div>
            <NavLink to="/thong-tin-ca-nhan">
            <Button
              type="primary"
              className=" mt-3 "
              onClick={handleContinueButtonClick}
            >
              Quay lại
            </Button>
            </NavLink>
            <Button
              type="primary"
              className=" mt-3 ml-60"
              onClick={handleContinueButtonClick}
            >
              Tiếp tục
            </Button>
          </div>
        </div>
        <div className="col-span-5 col-start-5 ">
          {showDocumentDetails && selectedDocument && (
            <div className="borderXacMinh">
              {selectedDocument === "giayPhepLaiXe" && (
                <div>
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      margin: "10px 0px",
                    }}
                  >
                    Tải lên ảnh giấy phép lái xe của bạn
                  </p>
                  <p className="mb-3">
                    Đảm bảo ảnh của bạn không bị nhòe, mờ và mặt trước bằng lái
                    xe thể hiện rõ khuôn mặt bạn.(Chỉ định dạng JPEG hoặc PNG)
                  </p>
                  <div className=" grid grid-cols-4">
                    <div
                      className=" col-span-2"
                      style={{
                        borderRadius: "10px",
                        border: "1px dashed black",
                        margin: "20px",
                        padding: "20px",
                        width: "185px",
                        height: "185px",
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFrontImageUpload}
                        style={{ width: "84px", height: "34px" }}
                      />
                      {frontImageUrl && (
                        <img src={frontImageUrl} alt="Ảnh mặt trước" />
                      )}
                      <p>Ảnh mặt trước</p>
                    </div>
                    <div
                      className=" col-span-2"
                      style={{
                        borderRadius: "10px",
                        border: "1px dashed black",
                        margin: "20px",
                        padding: "20px",
                        width: "185px",
                        height: "185px",
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBackImageUpload}
                        style={{ width: "84px", height: "34px" }}
                      />
                      {backImageUrl && (
                        <img src={backImageUrl} alt="Ảnh mặt sau" />
                      )}
                      <p>Ảnh mặt sau</p>
                    </div>
                  </div>
                  <NavLink to="/thong-tin-ca-nhan">
                    <Button
                      className="mt-1"
                      style={{  }}
                      type="primary"
                      onClick={handleCompleteButtonClick}
                    >
                      Hoàn thành
                    </Button>
                  </NavLink>
                </div>
              )}
              {selectedDocument === "hoChieu" && (
                <div>
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      margin: "10px 0px",
                    }}
                  >
                    Tải lên ảnh hộ chiếu của bạn
                  </p>
                  <p className="mb-3">
                    Đảm bảo ảnh của bạn không bị nhòe, mờ và mặt trước bằng lái
                    xe thể hiện rõ khuôn mặt bạn.(Chỉ định dạng JPEG hoặc PNG)
                  </p>
                  <div className=" grid grid-cols-4">
                    <div
                      className=" col-span-2"
                      style={{
                        borderRadius: "10px",
                        border: "1px dashed black",
                        margin: "20px",
                        padding: "20px",
                        width: "185px",
                        height: "185px",
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFrontImageUpload}
                        style={{ width: "84px", height: "34px" }}
                      />
                      {frontImageUrl && (
                        <img src={frontImageUrl} alt="Ảnh mặt trước" />
                      )}
                      <p>Ảnh mặt trước</p>
                    </div>
                    <div
                      className=" col-span-2"
                      style={{
                        borderRadius: "10px",
                        border: "1px dashed black",
                        margin: "20px",
                        padding: "20px",
                        width: "185px",
                        height: "185px",
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBackImageUpload}
                        style={{ width: "84px", height: "34px" }}
                      />
                      {backImageUrl && (
                        <img src={backImageUrl} alt="Ảnh mặt sau" />
                      )}
                      <p>Ảnh mặt sau</p>
                    </div>
                    <NavLink to="/thong-tin-ca-nhan">
                    <Button
                      className="mt-1"
                      style={{  }}
                      type="primary"
                      onClick={handleCompleteButtonClick}
                    >
                      Hoàn thành
                    </Button>
                  </NavLink>
                  </div>                 
                </div>
              )}

              {selectedDocument === "giayToTuTuyThan" && (
                <div>
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      margin: "10px 0px",
                    }}
                  >
                    Tải lên ảnh giấy tờ tuỳ thân của bạn
                  </p>
                  <p className="mb-3">
                    Đảm bảo ảnh của bạn không bị nhòe, mờ và mặt trước bằng lái
                    xe thể hiện rõ khuôn mặt bạn.(Chỉ định dạng JPEG hoặc PNG)
                  </p>
                  <div className=" grid grid-cols-4">
                    <div
                      className=" col-span-2"
                      style={{
                        borderRadius: "10px",
                        border: "1px dashed black",
                        margin: "20px",
                        padding: "20px",
                        width: "185px",
                        height: "185px",
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFrontImageUpload}
                        style={{ width: "84px", height: "34px" }}
                      />
                      {frontImageUrl && (
                        <img src={frontImageUrl} alt="Ảnh mặt trước" />
                      )}
                      <p>Ảnh mặt trước</p>
                    </div>
                    <div
                      className=" col-span-2"
                      style={{
                        borderRadius: "10px",
                        border: "1px dashed black",
                        margin: "20px",
                        padding: "20px",
                        width: "185px",
                        height: "185px",
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBackImageUpload}
                        style={{ width: "84px", height: "34px" }}
                      />
                      {backImageUrl && (
                        <img src={backImageUrl} alt="Ảnh mặt sau" />
                      )}
                      <p>Ảnh mặt sau</p>
                      
                    </div>
                    <NavLink to="/thong-tin-ca-nhan">
                    <Button
                      className="mt-1"
                      style={{  }}
                      type="primary"
                      onClick={handleCompleteButtonClick}
                    >
                      Hoàn thành
                    </Button>
                  </NavLink>
                  </div>
                 
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default XacMinhDanhTinh;
