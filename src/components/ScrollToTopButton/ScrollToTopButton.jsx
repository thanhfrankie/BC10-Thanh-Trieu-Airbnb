import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.scss'; 

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
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
