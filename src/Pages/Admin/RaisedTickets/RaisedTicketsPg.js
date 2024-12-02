import React from "react";
import classes from "./RaisedTicketsPg.module.css";
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
// import GeneralDashCmp from "../../../Components/Admin/DashboardComp/GeneralDashCmp";
import RaisedTicketsTableCmp from "../../../Components/Admin/TicketsRaised/RaisedTicketsTableCmp";
import AdminSideBarCmp from "../../../Components/Admin/Sidebar/AdminSideBarCmp";
import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";

const RaisedTicketsPg = () => {
  return (
    <>
      <HeaderCmp />
      <div className={classes.mainContainer}>
        <AdminSideBarCmp />
        <div className={classes.content}>
          <DefaultDashCmp>
            {/* <div>User Report</div> */}
            <RaisedTicketsTableCmp />
          </DefaultDashCmp>
        </div>
      </div>
    </>
  );
};

export default RaisedTicketsPg;
