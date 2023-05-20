import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Notification from "../Components/Notification";

const Errors = () => {
  const errors = useSelector((state) => state.errors);
  const [toShowError, setToShowError] = useState(false);
  useEffect(() => {
    if (errors.error && (errors.error.data || errors.error.message)) {
      setToShowError(true);
      setTimeout(() => {
        setToShowError(false);
      }, 3000);
    }
  }, [errors]);

  let statusCode = "";
  let message = "";
  if (errors.error?.status) {
    statusCode = errors.error?.status;
  } else if (errors.error?.data?.status) {
    statusCode = errors.error.data.status;
  }

  if (errors.error.data?.error?.message) {
    message = errors.error.data?.error?.message;
  } else if (errors.error.message) {
    message = errors.error.message;
  } else {
    message = "Something went wrong! We're working on fixing it.";
  }

  let redError = false;
  // whether to show red border/box
  // weirdly formated second condition. But
  if (errors.error.data?.error?.message || errors.error.error) {
    redError = true;
  }

  return (
    <div>
      <Notification
        show={toShowError}
        setShow={setToShowError}
        statusCode={statusCode}
        message={message}
        redError={redError}
      />
    </div>
  );
};

export default Errors;
