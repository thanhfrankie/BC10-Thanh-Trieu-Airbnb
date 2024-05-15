import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.css'; 

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    // Kiểm tra vị trí cuộn của trang
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  //  listener cho sự kiện cuộn trang khi component được mount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  //  xử lý sự kiện khi nhấn nút
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Cuộn lên đầu trang một cách mượt mà
    });
  };

  return (
    <div>
      {isVisible && (
        <button className="scroll-to-top-btn" onClick={scrollToTop}>
          <i class="fa-duotone fa-up-to-line"></i>
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
