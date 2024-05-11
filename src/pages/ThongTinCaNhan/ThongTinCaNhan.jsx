import React, { useState, useEffect } from "react";
import "./ThongTinCaNhan.scss";
import { NavLink } from "react-router-dom";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { getUserById, updateUserById } from "../../services/userManagement"; // Import hàm updateUserById từ userManagement
import { getLocalStorage } from "../../utils/util";
import { http } from "../../services/config";
import { Modal, Button, Input, message, Radio } from "antd";
import { getToken } from "../../services/authService"; // Import hàm lấy token
const { TextArea } = Input;

const ThongTinCaNhan = () => {
  const [editedUserData, setEditedUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [gender, setGender] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Thêm state để lưu trữ ảnh được chọn
  const navigate = useNavigate();

  useEffect(() => {
    const user = getLocalStorage("user");
    if (user) {
      const userId = user.user.id;
      const fetchUserData = async () => {
        try {
          const user = await getUserById(userId);
          setEditedUserData(user);
          setGender(user.gender); // Set giá trị ban đầu cho gender
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, []);

  const handleEditProfile = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      // Gửi dữ liệu người dùng chỉnh sửa lên API
      await updateUserById(editedUserData.id, editedUserData);
      message.success("Cập nhật thông tin thành công");
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
    formData.append("formFile", file); // Thêm file vào FormData với key là "formFile"
  
    // Lấy token từ local storage
    const token = getToken();
  
    try {
      const response = await http.post("/users/upload-avatar", formData, {
        headers: {
          token: token, // Thêm token vào header của request
          
        },
      });
  
      const { data } = response;
      setSelectedImage(data.avatarUrl); // Cập nhật ảnh mới vào state
      // Cập nhật avatar của người dùng sau khi tải lên thành công
      setEditedUserData({ ...editedUserData, avatar: data.avatarUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  

  if (!editedUserData) {
    return <div>Loading...</div>;
  }

  const { name, email, phone, birthday, role, avatar } = editedUserData;

  return (
    <div className="container">
      <div>
        <Header />
      </div>
      <div className="grid grid-cols-4 mt-5">
        <div className="col-span-1 pl-24 mt-5">
          <div className="titleTopLeft">
            <div className="relative">
              <img className="imgLeft mt-2" src={selectedImage || avatar} alt="Avatar" />
              <button className="buttonEdit absolute z-5" onClick={handleChooseImage}>
                <i className="fa-duotone fa-camera-retro"></i> Sửa ảnh
              </button>
            </div>
            <p className="texTopLeft mt-2">
              <span
                style={{
                  color: "gray",
                  fontWeight: "bold",
                  fontSize: "35px",
                }}
              >
                {name}
              </span>{" "}
            </p>
          </div>
          <div className="titleBotLeft mt-3 ">
            <p className="texBotLeft">Xác minh danh tính của bạn</p>
            <i
              class="fa-regular fa-shield-check"
              style={{ fontSize: "30px" }}
            ></i>
            <p className=" text-center">
              Bạn cần hoàn tất bước này trước khi đặt phòng/đặt chỗ hoặc đón
              tiếp khách trên Airbnb.
            </p>
            <NavLink to="/xac-minh">
              <button className="buttonleft text-black hover:text-white bg-gray-100 hover:bg-gray-500 ">
                Xác minh
              </button>
            </NavLink>
          </div>
        </div>
        <div className="col-span-3 ml-16 pl-24">
          <div className="mt-4 displayUser ">
            <div>
              <p className="texTopLeft">
                Xin Chào :{" "}
                <span
                  style={{
                    color: "gray",
                    fontWeight: "bold",
                    fontSize: "35px",
                  }}
                >
                  {name}
                </span>{" "}
              </p>
              <hr />
              <p className="texTopLeft">
                Email:{" "}
                <span
                  style={{
                    color: "gray",
                    fontWeight: "bold",
                    fontSize: "35px",
                  }}
                >
                  {email}
                </span>{" "}
              </p>
              <hr />
              
              <p className="texTopLeft">
                Số điện thoại:{" "}
                <span
                  style={{
                    color: "gray",
                    fontWeight: "bold",
                    fontSize: "35px",
                  }}
                >
                  {phone}
                </span>{" "}
              </p>
              <hr />
              <p className="texTopLeft">
                Ngày sinh:{" "}
                <span
                  style={{
                    color: "gray",
                    fontWeight: "bold",
                    fontSize: "35px",
                  }}
                >
                  {birthday}
                </span>{" "}
              </p>
              <hr />
              <p className="texTopLeft">
                Giới tính:{" "}
                <span
                  style={{
                    color: "gray",
                    fontWeight: "bold",
                    fontSize: "35px",
                  }}
                >
                  {gender === 1 ? "Nam" : "Nữ"}
                </span>{" "}
              </p>

              <hr />
              <p className="texTopLeft">
                Vai trò:{" "}
                <span
                  style={{
                    color: "gray",
                    fontWeight: "bold",
                    fontSize: "35px",
                  }}
                >
                  {role}
                </span>{" "}
              </p>
              <hr className="mb-4" />
              <button
                onClick={handleEditProfile}
                className="mr-3 buttonEdit text-black hover:text-white bg-gray-100 hover:bg-gray-400  "
              >
                Chỉnh sửa hồ sơ
              </button>

              {/* Modal của Ant Design */}
              <Modal
                title="Chỉnh sửa thông tin người dùng"
                visible={showModal}
                onCancel={handleCloseModal}
                footer={[
                  <Button key="cancel" onClick={handleCloseModal}>
                    Hủy
                  </Button>,
                  <Button key="save" type="primary" onClick={handleSaveChanges}>
                    Lưu
                  </Button>,
                ]}
              >
                Tên
                <Input
                  name="name"
                  label="Tên"
                  value={editedUserData.name}
                  onChange={handleInputChange}
                  placeholder="Tên"
                  style={{ marginBottom: "20px" }}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên người dùng.",
                    },
                  ]}
                />
                Email
                <Input
                  name="email"
                  label="Email"
                  value={editedUserData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  style={{ marginBottom: "20px" }}
                  rules={[
                    { required: true, message: "Vui lòng nhập địa chỉ email." },
                    { type: "email", message: "Email không hợp lệ." },
                  ]}
                />

                Số điện thoại
                <Input
                  name="phone"
                  label="Số điện thoại"
                  value={editedUserData.phone}
                  onChange={handleInputChange}
                  placeholder="Số điện thoại"
                  style={{ marginBottom: "20px" }}
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại." },
                    {
                      pattern: /^[0-9()+\-\s]+$/,
                      message: "Số điện thoại chỉ được nhập số.",
                    },
                  ]}
                />
                Ngày sinh
                <Input
                  name="birthday"
                  label="Ngày sinh"
                  value={editedUserData.birthday}
                  onChange={handleInputChange}
                  placeholder="Ngày sinh"
                  style={{ marginBottom: "20px" }}
                  rules={[
                    { required: true, message: "Vui lòng nhập ngày sinh." },
                    {
                      pattern: /^[0-9/]+$/,
                      message: "Nhập số theo định dạng DD/MM/YYYY",
                    },
                    {
                      validator: (_, value) => {
                        if (value && value.length >= 8 && value.length <= 10) {
                          const parts = value.split("/");
                          if (
                            parts.length === 3 &&
                            parts[2].length === 4 &&
                            !isNaN(parts[2])
                          ) {
                            return Promise.resolve();
                          }
                        }
                        return Promise.reject(new Error("Ngày sinh chưa đúng"));
                      },
                    },
                  ]}
                />
                Giới tính
                <Radio.Group
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <Radio value={1}>Nam</Radio>
                  <Radio value={0}>Nữ</Radio>
                </Radio.Group>
              </Modal>

              <NavLink to="/tao-ho-so">
                <button className=" buttonEdit text-black hover:text-white bg-gray-100 hover:bg-gray-400  ">
                  Thông tin thêm
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default ThongTinCaNhan;
