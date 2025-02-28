import React from "react";
import { navigateTo } from "../../utils/navigate";
import Button from "../shared/Button";

const AdminBodyTitle = ({ pageTitle, isAdmin, navigate, navigateUrl, buttonTitle, action, buttonClassName, icon }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h1>{pageTitle}</h1>
      {isAdmin && buttonTitle && (
        <Button
          buttonTitle={
            <>
              {icon === "add" && (<span className="material-icons-outlined">add_circle_outline</span>)}
              {icon === "delete" && (<span className="material-icons-outlined">delete</span>)}
              {icon === "modify" && (<span className="material-icons-outlined">contract_edit</span>)}


              <span className="ms-2">{buttonTitle}</span>
            </>
          }
          className={buttonClassName ? `${buttonClassName} d-flex justify-content-between align-items-center` : "bg-fe-orange d-flex justify-content-between align-items-center"}
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
