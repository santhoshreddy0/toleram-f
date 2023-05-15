import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Notification from "../../Components/Notification";

const NotificationsPopup = () => {
  const [show, setShow] = useState(false);
  const notifications = useSelector((state) => state.notificationsPopup.notify);

  const timer = () => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, [3000]);
    return timeout;
  };
  useEffect(() => {
    let id =  timer();
    if ((notifications?.isLoading || notifications?.message || notifications?.isSuccess) ) {
      setShow(true);
    }else {
      setShow(false);
    }
    return () => clearTimeout(id);
  }, [notifications]);
  return (
    <Notification
      show={show}
      setShow={setShow}
      style={
        notifications?.isLoading
          ? "processing"
          : notifications?.isSuccess
          ? "success"
          : "info"
      }
      message={
        notifications?.isLoading
          ? notifications?.processingMessage
          : notifications?.isSuccess
          ? notifications?.successMessage
          : notifications?.message
      }
    />
  );
};

export default NotificationsPopup;
