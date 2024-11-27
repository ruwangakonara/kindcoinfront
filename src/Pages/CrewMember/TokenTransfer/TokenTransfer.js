import React from "react";
import HeaderCrew from "../../../Components/CrewMember/Header/HeaderCrew";
import Sidebar from "../../../Components/CrewMember/Sidebar/Sidebar";
import ExchangeRate from "../../../Components/CrewMember/ExchangeRate/ExchangeRate";
import TokenTransferTable from "../../../Components/CrewMember/TokenTransfer/TokenTransferTable";
import './TokenTransfer.css';

const TokenTransfer = () => {
    return (
        <div className="app-container">
            <HeaderCrew />
            <div className="main-container">
                <Sidebar />
                <div className="exchange-rate">
                    <ExchangeRate />
                </div>
                <div className="token-transfer">
                    <TokenTransferTable />
                </div>
            </div>
        </div>
    );
}

export default TokenTransfer;