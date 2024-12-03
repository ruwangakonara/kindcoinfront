import React from "react";
import HeaderCrew from "../../../Components/CrewMember/Header/HeaderCrew";
import Sidebar from "../../../Components/CrewMember/Sidebar/Sidebar";
import VerifyRecipientsTable from "../../../Components/CrewMember/VerifyRecipients/VerifyRecipientsTable";
// import SearchBar from "../../../Components/CrewMember/SearchBar/Searchbar";
import "./VerifyRecipients.css";
import { useAuthCheck } from "../../../hooks/useAuthHook";


const VerifyRecipients = () => {
    // useAuthCheck();
  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

    return (
        <div className="app-container">
            <HeaderCrew />
            <div className="main-container">
                <Sidebar />
                <div className="crew-verify-recipients-container">
                    {/* <SearchBar onSearch={handleSearch} /> */}
                    <VerifyRecipientsTable />
                </div>
            </div>
        </div>
    );
};

export default VerifyRecipients;
