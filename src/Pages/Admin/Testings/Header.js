import React from "react";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <button className="toggle-btn" onClick={toggleSidebar}>
        Toggle Sidebar
      </button>
      <h1>Admin Dashboard</h1>
    </header>
  );
};

export default Header;
