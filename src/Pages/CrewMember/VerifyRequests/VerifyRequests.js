import React from "react";
import HeaderCrew from "../../../Components/CrewMember/Header/HeaderCrew";
import Sidebar from "../../../Components/CrewMember/Sidebar/Sidebar";
import VerifyRequestsTable from "../../../Components/CrewMember/VerifyRequests/VerifyRequestsTable";
import "./VerifyRequests.css";
import { useAuthCheck } from "../../../hooks/useAuthHook";

const VerifyRequests = () => {
    // useAuthCheck();
    return (
        <div className="app-container">
            <HeaderCrew />
            <div className="main-container">
                <Sidebar />
                <div className="crew-verify-request-container">
                    <VerifyRequestsTable />
                </div>
            </div>
        </div>
    );
};

export default VerifyRequests;
