import React from "react";

const ModalFooter = ({button, buttonAction, isSubmitting, retryTimeLeftEmail}) => {
  return (
    <div className="modal-footer">
      {button && <button
        id="button_form_sendMail"
        onClick={() => {
          buttonAction();
        }}
        disabled={isSubmitting || retryTimeLeftEmail}
        className="button_sendMail button_list"
      >
        {isSubmitting ? "Envoi en cours..." : "Valider"}
      </button>}
    </div>
  );
};

export default ModalFooter;
