import React, { useState } from "react";
import { Modal, Button } from "antd";
import { Input, message } from "antd";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./DetailPopup.scss";
const { TextArea } = Input;

const DetailPopupBot = () => {
  const navigate = useNavigate();

  const handleCompleteButtonClick = () => {
    alert("Cập nhật thành công");
    navigate("/thong-tin-ca-nhan");
  };

  const [comment, setComment] = useState("");
  const handleCommentChange = (e) => {
    const inputComment = e.target.value;
    if (inputComment.length <= 450) {
      setComment(inputComment);
    } else {
      message.error("Vui lòng nhập không quá 450 ký tự");
    }
  };
  const [visible1, setVisible1] = useState(false);

  const showModal1 = () => {
    setVisible1(true);
  };

  const handleOk1 = () => {
    setVisible1(false);
  };

  const handleCancel1 = () => {
    setVisible1(false);
  };
  return (
    <div className="mt-5  ">
      <p className="textPopup mb-3"> Giới thiệu về bạn</p>
      <Button
        className=" buttonPopup text-left w-full"
        type="primary"
        onClick={showModal1}
      >
        {" "}
        <input
          className=" w-80"
          type="text"
          placeholder=" Viết nội dung thú vị và ấn tượng."
        />{" "}
        <br />{" "}
        <span style={{ textDecoration: "underline" }}>
          Thêm phần giới thiệu
        </span>
      </Button>
      <Modal
        title="Giới thiệu về bạn"
        visible={visible1}
        onOk={handleOk1}
        onCancel={handleCancel1}
      >
        <p>
          Hãy chia sẻ đôi chút về bản thân để các Chủ nhà/Người tổ chức hoặc
          khách sau này có thể biết thêm về bạn.
        </p>
        <br />
        <div className="comment-box">
          <TextArea
            rows={6}
            value={comment}
            onChange={handleCommentChange}
            placeholder="Tối đa 450 ký tự"
          />
        </div>
      </Modal>
      <hr className="mt-5 mb-5" />
      <div className=" flex justify-between  ">
        <NavLink to="/thong-tin-ca-nhan">
          <button
            
            className="buttonleft mb-8 text-white bg-slate-700 hover:bg-slate-600 "
          >
            Quay lại
          </button>
        </NavLink>
      
      
        <NavLink to="/thong-tin-ca-nhan">
          <button
            onClick={handleCompleteButtonClick}
            className="buttonleft mb-8 text-white bg-slate-700 hover:bg-slate-600 "
          >
            Hoàn Tất
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default DetailPopupBot;
