import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const useChangePageTitle = (title) => {
    const location = useLocation();
    useEffect(() => {
      document.title = title;
    }, [location, title]);

}

export default useChangePageTitle