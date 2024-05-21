import React ,{ useState } from "react";
import ModalButton from "./ModalButton";
import languages from "../../assets/data/languages.json";
import { Select, Checkbox, } from "antd";
const { Option } = Select;
const DetailPopupRight = () =>{
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const handleLanguageChange = (checkedValues) => {
    setSelectedLanguages(checkedValues);
  };  
  return(  
  <div className="w-full">
    <ModalButton 
      title="Bạn làm công việc gì?" 
      icon="fa-sharp fa-solid fa-briefcase" 
      buttonText="Công việc của tôi" 
      placeholder="Hãy cho chúng tôi biết nghề nghiệp của bạn. Nếu công việc của bạn không phải là công việc truyền thống, hãy cho biết thiên hướng nghề nghiệp của bạn. Ví dụ: Y tá, cha/mẹ của 4 đứa con, hoặc vận động viên lướt sóng đã giải nghệ." 
      maxLength={50} 
    />
    <hr />
    <ModalButton 
  title="Ngôn ngữ bạn sử dụng" 
  icon="fa-regular fa-language" 
  buttonText="Ngôn ngữ của tôi" 
  content={
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
  } 
/>

    <hr />
    <ModalButton 
      title="Bài hát yêu thích của bạn là gì?" 
      icon="fa-sharp fa-solid fa-music" 
      buttonText="Bài hát yêu thích của tôi" 
      placeholder="Đừng ngại ngần chia sẻ giai điệu bạn từng nghe suốt nhé." 
      maxLength={50} 
    />
    <hr />
    <ModalButton 
      title="Sự thật thú vị về bạn là gì?" 
      icon="fa-solid fa-lightbulb-on" 
      buttonText="Sự thật thú vị của tôi" 
      placeholder="Hãy chia sẻ về điều gì đó độc đáo hoặc bất ngờ về bạn. Ví dụ: Tôi từng góp mặt trong một video ca nhạc, hoặc Tôi có tài tung hứng." 
      maxLength={50} 
    />
    <hr />
    <ModalButton 
      title="Tên sách tiểu sử của bạn sẽ là gì?" 
      icon="fa-solid fa-book-open-cover" 
      buttonText="Tên sách tiểu sử của tôi sẽ là" 
      placeholder="Nếu có ai đó viết sách về cuộc đời bạn, họ sẽ đặt tên sách là gì? Ví dụ: Sinh ra để xê dịch hay Những ghi chép về một cô gái yêu chó." 
      maxLength={50} 
    />
    <hr />
    <ModalButton 
      title="Bạn có nuôi thú cưng nào không?" 
      icon="fa-solid fa-paw" 
      buttonText="Thú cưng của tôi" 
      placeholder="Hãy chia sẻ về những người bạn bốn chân hoặc có cánh của bạn." 
      maxLength={50} 
    />
    <hr />
    <ModalButton 
      title="Bạn từng du lịch ở đâu?" 
      icon="fa-solid fa-plane" 
      buttonText="Nơi tôi từng đến" 
      placeholder="Kể tên những địa điểm mà bạn đã từng du lịch. Ví dụ: Paris, Tokyo, hoặc Sydney." 
      maxLength={50} 
    />
  </div>
);
}
  
export default DetailPopupRight;
