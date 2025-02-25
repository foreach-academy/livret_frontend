import React from "react";
import { navigateTo } from "../../utils/navigate";

const AdminBodyTitle = ({ pageTitle, isAdmin, navigate, navigateUrl, buttonTitle }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h1>{pageTitle}</h1>
      {isAdmin && (
        <button
          className="primary-button"
          onClick={() => navigateTo(navigateUrl, navigate)}
        >
          <span className="material-icons-outlined">add_circle_outline</span>
          <span>{buttonTitle}</span>
        </button>
      )}
    </div>
  );
};

export default AdminBodyTitle;
