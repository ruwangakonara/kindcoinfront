import React from "react";
import HeaderCrew from "../../../Components/CrewMember/Header/HeaderCrew";
import Sidebar from "../../../Components/CrewMember/Sidebar/Sidebar";
import TokenTransferComp from "../../../Components/CrewMember/TokenTransfer/TokenTransferTable/TokenTransferTable";
import ExchangeRate from "../../../Components/CrewMember/ExchangeRate/ExchangeRate";
import TokenTransferTable from "../../../Components/CrewMember/TokenTransfer/TokenTransferTable";
import './TokenTransfer.css';
import { useAuthCheck } from '../../../hooks/useAuthHook';

const TokenTransfer = () => {
    // useAuthCheck();
    // return (
    //     <div className="app-container">
    //         <HeaderCrew />
    //         <div className="main-container">
    //             <Sidebar />
    //             <div className="crew-exchange-rate">
    //                 <ExchangeRate />
    //             </div>
    //             <div className="crew-token-transfer">
    //                 <TokenTransferTable />
    //             </div>
    //         </div>
    //     </div>
    // );

    return (
        <div className="app-container">
            <HeaderCrew />
            <div className="main-container">
                <Sidebar />
        <div>
            <TokenTransferComp />
        </div>
        </div>
        </div>
    );
    
}

export default TokenTransfer;