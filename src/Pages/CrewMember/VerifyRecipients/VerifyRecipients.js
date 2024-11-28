import React from "react";
import HeaderCrew from "../../../Components/CrewMember/Header/HeaderCrew";
import Sidebar from "../../../Components/CrewMember/Sidebar/Sidebar";
import VerifyRecipientsTable from "../../../Components/CrewMember/VerifyRecipients/VerifyRecipientsTable";
import SearchBar from "../../../Components/CrewMember/SearchBar/SearchBar";
import "./VerifyRecipients.css";

const VerifyRecipients = () => {
  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  return (
    <div className="app-container">
      <HeaderCrew />
      <div className="main-container">
        <Sidebar />
        <div className="verify-recipients-container">
          <SearchBar onSearch={handleSearch} />
          <VerifyRecipientsTable />
        </div>
      </div>
    </div>
  );
};

export default VerifyRecipients;
