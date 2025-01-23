import React from "react";

const Modal = ({
  children,
}) => {


  return (
    <div
      id="myModal"
      className="modal"
    //   onClick={() => {
    //     setIsModalOpen(false);
    //   }}
    >
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

export default Modal;
