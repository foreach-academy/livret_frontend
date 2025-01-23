import React from "react";

const ModalHeader = ({modalHeaderTitle, modalHeaderAction}) => {
  return (
    <div className="modal-header">
      <span className="close" onClick={() => {modalHeaderAction(false)}}>
        &times;
      </span>
      <h2>{modalHeaderTitle}</h2>
    </div>
  );
};

export default ModalHeader;
