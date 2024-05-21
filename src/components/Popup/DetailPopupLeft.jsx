import React from "react";
import ModalButton from "./ModalButton";
import countries from "../../assets/data/countries.json";
import {  Select, DatePicker} from "antd";
const { Option } = Select;
const DetailPopupLeft = () => {
  return(
  <div>
    <ModalButton 
      title="Bạn từng theo học ở đâu?" 
      icon="fa-duotone fa-graduation-cap" 
      buttonText="Nơi tôi từng theo học" 
      placeholder="Dù học tại nhà, trường trung học phổ thông hay trường dạy nghề, hãy ghi tên ngôi trường đã xây dựng nền tảng cho bạn." 
      maxLength={50} 
    />
    <hr />
    <ModalButton 
      title="Nơi bạn sống" 
      icon="fa-solid fa-earth-americas" 
      buttonText="Nơi tôi sống" 
      content={
        <Select
          showSearch
          style={{ width: 200, marginBottom: "20px" }}
          placeholder="Chọn quốc gia"
          optionFilterProp="children"
          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
        >
          {countries.map((country, index) => (
            <Select.Option key={index} value={country}>{country}</Select.Option>
          ))}
        </Select>
      } 
    />
    <hr />
    <ModalButton 
      title="Thập niên bạn sinh ra" 
      icon="fa-solid fa-house-user" 
      buttonText="Thập niên tôi sinh ra" 
      content={<DatePicker placeholder="Chọn ngày sinh" format="DD/MM/YYYY" />} 
    />
    <hr />
    <ModalButton 
      title="Bạn hay nghĩ đến điều gì?" 
      icon="fa-solid fa-heart" 
      buttonText="Thứ mà tôi luôn nghĩ đến" 
      placeholder="Hãy chia sẻ về bất cứ thứ gì mà bạn không bao giờ thấy đủ – theo cách tích cực. Ví dụ: Làm món bánh focaccia hương thảo." 
      maxLength={50} 
    />
    <hr />
    <ModalButton 
      title="Kỹ năng vô dụng nhất của bạn là gì?" 
      icon="fa-sharp fa-regular fa-galaxy" 
      buttonText="Kỹ năng vô dụng nhất của tôi" 
      placeholder="Chia sẻ một tài năng gây bất ngờ nhưng vô ích của bạn. Ví dụ: Trộn bài bằng một tay." 
      maxLength={50} 
    />
    <hr />
    <ModalButton 
      title="Bạn dành quá nhiều thời gian để làm gì?" 
      icon="fa-solid fa-clock" 
      buttonText="Tôi dành quá nhiều thời gian để" 
      placeholder="Chia sẻ một hoạt động hoặc sở thích chiếm rất nhiều thời gian rảnh của bạn. Ví dụ: Xem video về mèo hoặc chơi cờ." 
      maxLength={50} 
    />
    <hr />
    <ModalButton 
      title="Bạn từng sống ở đâu?" 
      icon="fa-solid fa-location-dot" 
      buttonText="Nơi tôi từng sống" 
      placeholder="Kể tên những thành phố hoặc thị trấn mà bạn đã từng sống. Ví dụ: Hạ Long, Đà Nẵng, hoặc Hội An." 
      maxLength={50} 
    />
  </div>
  )
};

export default DetailPopupLeft;
