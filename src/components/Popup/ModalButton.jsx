import React, { useState } from "react";
import { Modal, Button } from "antd";
import {  Input, message } from "antd";
import "./DetailPopup.scss";
const { TextArea } = Input;
const ModalButton = ({ title, icon, buttonText, content, placeholder, maxLength, }) => {
  const [visible, setVisible] = useState(false);
  const [comment, setComment] = useState("");

  const showModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  const handleCommentChange = (e) => {
    const inputComment = e.target.value;
    if (inputComment.length <= maxLength) {
      setComment(inputComment);
    } else {
      message.error(`Vui lòng nhập không quá ${maxLength} ký tự`);
    }
  };
  return (
    <div>
      <Button className="btnPopup" type="primary" onClick={showModal}>
        <i className={`fa ${icon} mr-2`}></i><span>{buttonText}</span>
      </Button>
      <Modal title={title} visible={visible} onOk={closeModal} onCancel={closeModal}>
        {content || (
          <>
            <p>{placeholder}</p>
            <div className="comment-box">
              <TextArea rows={4} value={comment} onChange={handleCommentChange} placeholder={`Tối đa ${maxLength} ký tự`} />
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ModalButton;
