import React, { useState } from "react";
import SidebarrNew from "./SBar";
import Header from "./Header";
import "./DashboardLayout.css"; // Custom styles
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-layout">
      {/* Header */}
      <Header toggleSidebar={toggleSidebar} />
      {/* <HeaderCmp toggleSidebar={toggleSidebar} /> */}

      <div className="dashboard-body">
        {/* Sidebar */}
        <SidebarrNew isOpen={sidebarOpen} />

        {/* Main Content Area */}
        <div
          className={`content-area ${sidebarOpen ? "expanded" : "collapsed"}`}
        >
          {children} {/* Dynamic content goes here */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
