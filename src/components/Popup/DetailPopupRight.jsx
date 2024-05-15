import React, { useState } from "react";
import { Modal, Button } from "antd";
import { Checkbox, Input, message, Select } from "antd";
import "./DetailPopup.scss";

const { TextArea, Search } = Input;
const { Option } = Select;
const languages = require("../../data/languages.json");

function DetailPopupRight() {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [fee, setFee] = useState("");

  const handleLanguageChange = (checkedValues) => {
    setSelectedLanguages(checkedValues);
  };

  const handleFeeChange = (e) => {
    setFee(e.target.value);
  };

  const [comment, setComment] = useState("");
  const handleSearch = (value) => {
    console.log("Search value:", value);
    
  };

  const handleCommentChange = (e) => {
    const inputComment = e.target.value;
    if (inputComment.length <= 50) {
      setComment(inputComment);
    } else {
      message.error("Vui lòng nhập không quá 50 ký tự");
    }
  };

  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);
  const [visible6, setVisible6] = useState(false);

  const showModal1 = () => {
    setVisible1(true);
  };

  const showModal2 = () => {
    setVisible2(true);
  };
  const showModal3 = () => {
    setVisible3(true);
  };

  const showModal4 = () => {
    setVisible4(true);
  };
  const showModal5 = () => {
    setVisible5(true);
  };

  const showModal6 = () => {
    setVisible6(true);
  };

  const handleOk1 = () => {
    setVisible1(false);
  };

  const handleOk2 = () => {
    setVisible2(false);
  };
  const handleOk3 = () => {
    setVisible3(false);
  };

  const handleOk4 = () => {
    setVisible4(false);
  };
  const handleOk5 = () => {
    setVisible5(false);
  };

  const handleOk6 = () => {
    setVisible6(false);
  };
  
  const handleCancel1 = () => {
    setVisible1(false);
  };

  const handleCancel2 = () => {
    setVisible2(false);
  };
  const handleCancel3 = () => {
    setVisible3(false);
  };

  const handleCancel4 = () => {
    setVisible4(false);
  };
  const handleCancel5 = () => {
    setVisible5(false);
  };

  const handleCancel6 = () => {
    setVisible6(false);
  };


  return (
    <div className=" w-full ">
      <div>
        <Button className="btnPopup" type="primary" onClick={showModal1}>
          <i class="fa-sharp fa-solid fa-briefcase mr-2"></i>{" "}
          <span> Công việc của tôi</span>
        </Button>
        <Modal
          title="Bạn làm công việc gì?"
          visible={visible1}
          onOk={handleOk1}
          onCancel={handleCancel1}
        >
          <p>
            Hãy cho chúng tôi biết nghề nghiệp của bạn. Nếu công việc của bạn
            không phải là công việc truyền thống, hãy cho biết thiên hướng nghề
            nghiệp của bạn. Ví dụ: Y tá, cha/mẹ của 4 đứa con, hoặc vận động
            viên lướt sóng đã giải nghệ
          </p>
          <br />
          <div className="comment-box">
            <TextArea
              rows={4}
              value={comment}
              onChange={handleCommentChange}
              placeholder="Tối đa 50 ký tự"
            />
          </div>
        </Modal>
        <hr />
      </div>
      <div>
        <Button className="btnPopup" type="primary" onClick={showModal2}>
          <i class="fa-regular fa-language mr-2"></i>{" "}
          <span> Ngôn ngữ của tôi</span>
        </Button>
        <Modal
          title="Ngôn ngữ bạn sử dụng"
          visible={visible2}
          onOk={handleOk2}
          onCancel={handleCancel2}
        >
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <div style={{ flex: "1", marginRight: "8px" }}>
              <Checkbox.Group onChange={handleLanguageChange}>
                {languages.slice(0, 10).map((lang, index) => (
                  <Checkbox key={index} value={lang.name}>
                    {lang.name}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </div>
            <div style={{ flex: "1", marginRight: "8px" }}>
              <Checkbox.Group onChange={handleLanguageChange}>
                {languages.slice(10, 20).map((lang, index) => (
                  <Checkbox key={index} value={lang.name}>
                    {lang.name}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </div>
            <div style={{ flex: "1" }}>
              <Checkbox.Group onChange={handleLanguageChange}>
                {languages.slice(20).map((lang, index) => (
                  <Checkbox key={index} value={lang.name}>
                    {lang.name}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </div>
          </div>
        </Modal>
        <hr />
      </div>
      <div>
        <Button className="btnPopup" type="primary" onClick={showModal3}>
          <i class="fa-sharp fa-solid fa-music mr-2"></i>{" "}
          <span> Bài hát yêu thích của tôi</span>
        </Button>
        <Modal
          title="Bài hát yêu thích của bạn là gì?"
          visible={visible3}
          onOk={handleOk3}
          onCancel={handleCancel3}
        >
          <p>Đừng ngại ngần chia sẻ giai điệu bạn từng nghe suốt nhé.</p>
          <br />
          <div className="comment-box">
            <TextArea
              rows={4}
              value={comment}
              onChange={handleCommentChange}
              placeholder="Tối đa 50 ký tự"
            />
          </div>
        </Modal>
        <hr />
      </div>
      <div>
        <Button className="btnPopup" type="primary" onClick={showModal4}>
          <i class="fa-solid fa-lightbulb-on mr-2"></i>{" "}
          <span> Sự thật thú vị của tôi</span>
        </Button>
        <Modal
          title="Sự thật thú vị về bạn là gì?"
          visible={visible4}
          onOk={handleOk4}
          onCancel={handleCancel4}
        >
          <p>
            Hãy chia sẻ về điều gì đó độc đáo hoặc bất ngờ về bạn. Ví dụ: Tôi
            từng góp mặt trong một video ca nhạc, hoặc Tôi có tài tung hứng.
          </p>
          <br />
          <div className="comment-box">
            <TextArea
              rows={4}
              value={comment}
              onChange={handleCommentChange}
              placeholder="Tối đa 50 ký tự"
            />
          </div>
        </Modal>
        <hr />
      </div>
      <div>
        <Button className="btnPopup" type="primary" onClick={showModal5}>
          <i class="fa-solid fa-book-open-cover mr-2"></i>{" "}
          <span> Tên sách tiểu sử của tôi sẽ là</span>
        </Button>
        <Modal
          title="Tên sách tiểu sử của bạn sẽ là gì?"
          visible={visible5}
          onOk={handleOk5}
          onCancel={handleCancel5}
        >
          <p>
            Nếu có ai đó viết sách về cuộc đời bạn, họ sẽ đặt tên sách là gì? Ví
            dụ: Sinh ra để xê dịch hay Những ghi chép về một cô gái yêu chó.
          </p>
          <br />
          <div className="comment-box">
            <TextArea
              rows={4}
              value={comment}
              onChange={handleCommentChange}
              placeholder="Tối đa 50 ký tự"
            />
          </div>
        </Modal>
        <hr />
      </div>
      <div>
        <Button className="btnPopup" type="primary" onClick={showModal6}>
          <i class="fa-solid fa-paw-simple mr-2"></i> <span> Thú cưng</span>
        </Button>
        <Modal
          title="Bạn có nuôi thú cưng không?"
          visible={visible6}
          onOk={handleOk6}
          onCancel={handleCancel6}
        >
          <p>
            Hãy chia sẻ về bất kỳ thú cưng nào bạn có và tên của chúng. Ví dụ:
            Cô mèo tam thể tên Whiskers hay chú rùa tốc độ Leonardo.
          </p>
          <br />
          <div className="comment-box">
            <TextArea
              rows={4}
              value={comment}
              onChange={handleCommentChange}
              placeholder="Tối đa 50 ký tự"
            />
          </div>
        </Modal>
        <hr />
      </div>
    </div>
  );
}

export default DetailPopupRight;
