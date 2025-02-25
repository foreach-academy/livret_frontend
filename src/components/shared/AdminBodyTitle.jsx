import React from "react";
import { navigateTo } from "../../utils/navigate";
import Button from "../shared/Button";

const AdminBodyTitle = ({ pageTitle, isAdmin, navigate, navigateUrl, buttonTitle, action, buttonClassName }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h1>{pageTitle}</h1>
      {isAdmin && buttonTitle && (
        <Button
          buttonTitle={
            <>
              <span className="material-icons-outlined">add_circle_outline</span>
              <span className="ms-2">{buttonTitle}</span>
            </>
          }
          className={buttonClassName ? buttonClassName : "bg-fe-orange"}
          setAction={() => {
            if (navigate) navigateTo(navigateUrl, navigate);
            if (action) action();
          }}
        />
      )}
    </div>
  );
};

export default AdminBodyTitle;
