import React from "react";
import { formatRetryTime } from "../../utils/timeFormat";

const RetryTimer = ({ retryTime }) => {
  return (
    <>
      {retryTime !== null && (
        <p className="errorSécurité">
          Veuillez attendre {formatRetryTime(retryTime)} avant de réessayer.
        </p>
      )}
    </>
  );
};

export default RetryTimer;
