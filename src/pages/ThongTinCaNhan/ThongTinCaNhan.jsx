import React, { useState, useEffect } from "react";
import "./ThongTinCaNhan.scss";
import { NavLink } from "react-router-dom";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import { getUserById, updateUserById } from "../../services/userManagement";
import { getLocalStorage } from "../../utils/util";
import { http } from "../../services/config";
import { Modal, Button, Input, message, Radio, notification, Row, Col } from "antd";
import { getToken } from "../../services/authService";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";
import { CheckOutlined } from "@ant-design/icons";
import Loading from "../../components/Loading/Loading";

const ThongTinCaNhan = () => {
  const [editedUserData, setEditedUserData] = useState(null);
  const [tempUserData, setTempUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchUserData = async () => {
    const user = getLocalStorage("user");
    if (user) {
      const userId = user.user.id;
      try {
        const userData = await getUserById(userId);
        setEditedUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    setTempUserData({ ...editedUserData });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempUserData({ ...tempUserData, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      await updateUserById(tempUserData.id, tempUserData);
      message.success("Cập nhật thông tin thành công");
      setEditedUserData(tempUserData);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating user data:", error);
      message.error("Cập nhật thông tin không thành công");
    }
  };

  const handleChooseImage = () => {
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = "image/*";
    inputFile.onchange = handleImageChange;
    inputFile.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("formFile", file);
    const token = getToken();
    try {
      const response = await http.post("/users/upload-avatar", formData, {
        headers: {
          token: token,
        },
      });

      fetchUserData();
      notification.success({
        placement: "top",
        message: "Tải ảnh lên thành công",
        duration: 3,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const shortenName = (name) => {
    return name.length > 15 ? `${name.substring(0, 15)}...` : name;
  };

  if (!editedUserData) {
    return <div><Loading /></div>;
  }

  const { name, email, phone, birthday, role, avatar } = editedUserData;
  const gender = editedUserData.gender ? "Nam" : "Nữ";

  return (
    <div className="container">
      <Header />
      <div
        style={{
          height: "60px",
          background: "#7A8B8B",
          color: "white",
          fontSize: "40px",
          fontWeight: "bold",
          marginTop: "30px",
          textAlign: "center",
        }}
      >
        Thông Tin Của Bạn
      </div>
      <div className="mt-5 mb-5">
        <Row gutter={[16, 16]} className="pl-20">
          <Col xs={24} sm={24} md={10} lg={10} xl={6} xxl={6}>
            <div className="titleTopLeft">
              <div className="relative">
                <img className="imgLeft mt-2" src={avatar} alt="" />
                <button
                  className="buttonEdit absolute z-5"
                  onClick={handleChooseImage}
                >
                  <i className="fa-duotone fa-camera-retro"></i> Sửa ảnh
                </button>
              </div>
              <p className="texTopLeft">
                <span
                  style={{
                    color: "gray",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  {shortenName(name)}
                </span>{" "}
              </p>
            </div>
            <div className="titleBotLeft mt-3 ">
              <p
                className="texBotLeft"
                style={{ fontSize: "20px", marginTop: "10px" }}
              >
                {" "}
                <i
                  className="fa-regular fa-shield-check"
                  style={{
                    fontSize: "25px",
                    color: "green",
                    marginRight: "5px",
                  }}
                ></i>
                Xác minh danh tính{" "}
              </p>

              <p style={{ padding: "6px" }} className=" text-center">
                Xác minh danh tính của bạn với huy hiệu xác minh danh tính.
              </p>
              <Button className="m-1" type="default">
                Nhận huy hiệu
              </Button>
              <hr style={{ width: "200px", marginTop: "10px" }} />
              <p className="texTopLeft">
                <span
                  style={{
                    display: "block",
                    color: "",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  {shortenName(name)} đã xác nhận
                </span>
                {"  "}
              </p>
              <p className=" mb-5" style={{ fontSize: "15px" }}>
                {" "}
                <CheckOutlined
                  style={{
                    color: "green",
                    marginRight: "5px",
                    fontSize: "20px",
                  }}
                />{" "}
                địa chỉ email
              </p>
            </div>
          </Col>
          <Col className="plThongTin" xs={24} sm={24} md={14} lg={14} xl={18} xxl={18}>
            <div className="mt-4 displayUser ">
              <div>
                <p className="texTopLeft">
                  Tên :{" "}
                  <span
                    style={{
                      color: "gray",
                      fontWeight: "bold",
                      fontSize: "25px",
                    }}
                  >
                    {name}
                  </span>{" "}
                </p>
                <hr />
                <p className="texTopLeft">
                  Email :{" "}
                  <span
                    style={{
                      color: "gray",
                      fontWeight: "bold",
                      fontSize: "25px",
                    }}
                  >
                    {email}
                  </span>{" "}
                </p>
                <hr />

                <p className="texTopLeft">
                  Số điện thoại :{" "}
                  <span
                    style={{
                      color: "gray",
                      fontWeight: "bold",
                      fontSize: "25px",
                    }}
                  >
                    {phone}
                  </span>{" "}
                </p>
                <hr />
                <p className="texTopLeft">
                  Ngày sinh :{" "}
                  <span
                    style={{
                      color: "gray",
                      fontWeight: "bold",
                      fontSize: "25px",
                    }}
                  >
                    {birthday}
                  </span>{" "}
                </p>
                <hr />
                <p className="texTopLeft">
                  Giới tính :{" "}
                  <span
                    style={{
                      color: "gray",
                      fontWeight: "bold",
                      fontSize: "25px",
                    }}
                  >
                    {gender}
                  </span>{" "}
                </p>

                <hr />
                <p className="texTopLeft">
                  Vai trò :{" "}
                  <span
                    style={{
                      color: "gray",
                      fontWeight: "bold",
                      fontSize: "25px",
                    }}
                  >
                    {role}
                  </span>{" "}
                </p>
                <hr className="mb-4" />
                <div className="layoutRes mb-4 ">
                  <button
                    onClick={handleEditProfile}
                    className="buttonEdit text-black hover:text-white bg-gray-100 hover:bg-gray-400"
                  >
                    Chỉnh sửa hồ sơ
                  </button>

                  <Modal
                    title="Chỉnh sửa thông tin người dùng"
                    visible={showModal}
                    onCancel={handleCloseModal}
                    footer={[
                      <Button
                        key="save"
                        type="primary"
                        onClick={handleSaveChanges}
                      >
                        Lưu
                      </Button>,
                    ]}
                  >
                    Tên
                    <Input
                      name="name"
                      label="Tên"
                      value={tempUserData?.name}
                      onChange={handleInputChange}
                      placeholder="Tên"
                      style={{ marginBottom: "25px" }}
                    />
                    Email
                    <Input
                      name="email"
                      label="Email"
                      disabled
                      value={tempUserData?.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      style={{ marginBottom: "25px" }}
                    />
                    Số điện thoại
                    <Input
                      name="phone"
                      label="Số điện thoại"
                      value={tempUserData?.phone}
                      onChange={handleInputChange}
                      placeholder="Số điện thoại"
                      style={{ marginBottom: "25px" }}
                    />
                    Ngày sinh
                    <Input
                      name="birthday"
                      label="Ngày sinh"
                      value={tempUserData?.birthday}
                      onChange={handleInputChange}
                      placeholder="Ngày sinh"
                      style={{ marginBottom: "20px" }}
                    />
                    Giới tính
                    <Radio.Group
                      name="gender"
                      value={tempUserData?.gender}
                      onChange={(e) => handleInputChange(e)}
                    >
                      <Radio value={true}>Nam</Radio>
                      <Radio value={false}>Nữ</Radio>
                    </Radio.Group>
                  </Modal>
                </div>
                <NavLink  to="/tao-ho-so">
                    <button className=" buttonEdit text-black hover:text-white bg-gray-100 hover:bg-gray-400">
                      Thông tin thêm
                    </button>
                  </NavLink>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div
        style={{
          height: "40px",
          background: "#7A8B8B",
          marginTop: "20px",
        }}
      ></div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default ThongTinCaNhan;