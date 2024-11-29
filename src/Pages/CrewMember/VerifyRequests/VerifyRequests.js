import React from "react";
import HeaderCrew from "../../../Components/CrewMember/Header/HeaderCrew";
import Sidebar from "../../../Components/CrewMember/Sidebar/Sidebar";
import VerifyRequestsTable from "../../../Components/CrewMember/VerifyRequests/VerifyRequestsTable";
import "./VerifyRequests.css";

const VerifyRequests = () => {

    return (
        <div className="app-container">
            <HeaderCrew />
            <div className="main-container">
                <Sidebar />
                <div className="crew-verify-requests-container">
                    <VerifyRequestsTable />
                </div>
            </div>
        </div>
    );
};

export default VerifyRequests;
