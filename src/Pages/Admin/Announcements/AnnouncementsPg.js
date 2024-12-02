import AnnouncementContent from "../../../Components/Admin/Announcements/AnnouncementContent";
import AnnouncementForm from "../../../Components/Admin/Announcements/AnnouncementForm";
import AnnouncementTable from "../../../Components/Admin/Announcements/AnnouncementTable";
import GeneralDashCmp from "../../../Components/Admin/DashboardComp/GeneralDashCmp";
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
import classes from "./AnnouncementsPg.module.css";
import React from "react";
import AdminSideBarCmp from "../../../Components/Admin/Sidebar/AdminSideBarCmp";
import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";

const AnnouncementsPg = () => {
  return (
    <>
      <HeaderCmp />
      <div className={classes.mainContainer}>
        <AdminSideBarCmp />
        <div className={classes.content}>
          <DefaultDashCmp>
            <h1 style={{ textAlign: "center" }}>Announcements</h1>
          </DefaultDashCmp>
          <GeneralDashCmp>
            <AnnouncementTable />
            Announcements Related Content Component is here.
            {/* <AnnouncementContent />
            <AnnouncementForm /> */}
          </GeneralDashCmp>
        </div>
      </div>
      <HeaderCmp />
      {/* <div className={classes.mainContainer}>
      <AdminSideBarCmp />
      <div className={classes.content}>
        <DefaultDashCmp>
          <h1 style={{ textAlign: "center" }}>Statistics</h1>
        </DefaultDashCmp>
        <GridTypeDashCmp>
          <ChartACmp />
          <ChartBCmp />
          <ChartCCmp />
        </GridTypeDashCmp>
      </div>
    </div> */}
    </>
  );
};

export default AnnouncementsPg;
