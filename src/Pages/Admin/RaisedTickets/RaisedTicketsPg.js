import React from "react";
import classes from "./RaisedTicketsPg.module.css";
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
import GeneralDashCmp from "../../../Components/Admin/DashboardComp/GeneralDashCmp";
import RaisedTicketsTableCmp from "../../../Components/Admin/TicketsRaised/RaisedTicketsTableCmp";

const RaisedTicketsPg = () => {
  return (
    <>
      <div className={classes.mainContainer}>
        <HeaderCmp />
        <GeneralDashCmp>
          Tickets Related Content Component is here.
          <RaisedTicketsTableCmp />
        </GeneralDashCmp>
      </div>
    </>
  );
};

export default RaisedTicketsPg;
