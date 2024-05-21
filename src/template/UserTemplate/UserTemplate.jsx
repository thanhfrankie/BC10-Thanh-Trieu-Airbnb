import React, {  useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { useSelector } from "react-redux";
export const NotifyContext = React.createContext(null);
const UserTemplate = () => {
  const { isLoading } = useSelector((state) => state.loadingSlice);
  const [closeTime, setCloseTime] = useState(1500);
  const renderNotify = (notify) => {
    return toast(notify);
  };
  
    return (
      <NotifyContext.Provider
        value={renderNotify}
      >
        {isLoading ? <Loading /> : null}
        <Outlet />
        <ToastContainer
          position="top-center"
          autoClose={closeTime}
          theme="dark"
        />
      </NotifyContext.Provider>
    );
  
};

export default UserTemplate;
