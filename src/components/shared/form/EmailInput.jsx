import React from "react";
import RetryTimer from "../RetryTimer";

const EmailInput = ({ label, inputValue, inputAction, retryTime }) => {
  return (
    <div>
      <label id="label_email_send" htmlFor="email">
        {label}
      </label>
      <input
        type="email"
        id="input_modal_emailSend"
        value={inputValue}
        onChange={(e) => {
          inputAction(e.target.value);
        }}
      />
      <RetryTimer retryTime={retryTime} />
    </div>
  );
};

export default EmailInput;
