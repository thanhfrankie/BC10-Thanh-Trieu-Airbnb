import React, { useState } from "react";
import { Modal, Button } from "antd";
import { Input, message } from "antd";
import { DatePicker } from "antd";
import "./DetailPopup.scss";
import { Select } from "antd";
const { Option } = Select;

const { TextArea, Search } = Input;

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];


function DetailPopupLeft() {
  const [comment, setComment] = useState("");

  const handleDateChange = (date, dateString) => {
    console.log("Selected date:", dateString);
    // Thực hiện xử lý với ngày tháng được chọn ở đây
  };

  const handleSearch = (value) => {
    console.log("Search value:", value);
    // Thực hiện xử lý tìm kiếm tại đây
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
  // Thêm các trạng thái visible cho các Modal khác

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
  // Thêm các hàm showModal cho các Modal khác

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
  // Thêm các hàm handleOk cho các Modal khác
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
  // Thêm các hàm handleCancel cho các Modal khác

  return (
    <div className=" w-full ">
      <div >
        <Button className="btnPopup" type="primary" onClick={showModal1}>
          <i class="fa-duotone fa-graduation-cap mr-2"></i>{" "}
          <span> Nơi tôi từng theo học</span>
        </Button>
        <Modal
          title="Bạn từng theo học ở đâu?"
          visible={visible1}
          onOk={handleOk1}
          onCancel={handleCancel1}
        >
          <p>
            Dù học tại nhà, trường trung học phổ thông hay trường dạy nghề, hãy
            ghi tên ngôi trường đã xây dựng nền tảng cho bạn.
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
          <i class="fa-solid fa-earth-americas mr-2"></i>{" "}
          <span> Nơi tôi sống</span>
        </Button>
        <Modal
          style={{ height: "300px" }}
          title="Nơi bạn sống"
          visible={visible2}
          onOk={handleOk2}
          onCancel={handleCancel2}
        >
          <Select
      showSearch
      style={{ width: 200 }}
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
        </Modal>
        <hr />
      </div>
      <div>
        <Button className="btnPopup" type="primary" onClick={showModal3}>
          <i class="fa-solid fa-house-user mr-2"></i>{" "}
          <span> Thập niên tôi sinh ra</span>
        </Button>
        <Modal
          title="Thập niên bạn sinh ra"
          visible={visible3}
          onOk={handleOk3}
          onCancel={handleCancel3}
        >
          <DatePicker
            placeholder="Chọn ngày sinh"
            format="DD/MM/YYYY"
            onChange={handleDateChange}
          />
        </Modal>
        <hr />
      </div>
      <div>
        <Button className="btnPopup" type="primary" onClick={showModal4}>
          <i class="fa-solid fa-heart mr-2"></i>{" "}
          <span> Thứ mà tôi luôn nghĩ đến</span>
        </Button>
        <Modal
          title="Bạn hay nghĩ đến điều gì?"
          visible={visible4}
          onOk={handleOk4}
          onCancel={handleCancel4}
        >
          <p>
            Hãy chia sẻ về bất cứ thứ gì mà bạn không bao giờ thấy đủ – theo
            cách tích cực. Ví dụ: Làm món bánh focaccia hương thảo.
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
          <i class="fa-sharp fa-regular fa-galaxy mr-2"></i>{" "}
          <span> Kỹ năng vô dụng nhất của tôi</span>
        </Button>
        <Modal
          title="Kỹ năng vô dụng nhất của bạn là gì?"
          visible={visible5}
          onOk={handleOk5}
          onCancel={handleCancel5}
        >
          <p>
            Chia sẻ một tài năng gây bất ngờ nhưng vô ích của bạn. Ví dụ: Trộn
            bài bằng một tay.
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
          <i class="fa-solid fa-clock mr-2"></i>{" "}
          <span>Tôi dành quá nhiều thời gian để</span>
        </Button>
        <Modal
          title="Bạn dành quá nhiều thời gian để làm gì?"
          visible={visible6}
          onOk={handleOk6}
          onCancel={handleCancel6}
        >
          <p>
            Chia sẻ một hoạt động hoặc sở thích chiếm rất nhiều thời gian rảnh
            của bạn. Ví dụ: Xem video về mèo hoặc chơi cờ.
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

export default DetailPopupLeft;
