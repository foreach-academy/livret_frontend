import React, { useState } from "react";
import AdminNavbar from "../../shared/navbar/AdminNavbar";
import Header from "../../shared/navbar/Header";

const AdminLayout = ({ children }) => {
  const [headerHeight, setHeaderHeight] = useState(null);

  return (
    <>
      <Header setHeaderHeight={setHeaderHeight}/>
      <div className="d-flex">
        <AdminNavbar headerHeight={headerHeight}/>
        <div className="w-100 p-3 overflow-auto" style={{height: 'calc(100vh - 80px)'}}>{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
