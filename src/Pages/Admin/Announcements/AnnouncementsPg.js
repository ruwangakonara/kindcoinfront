import AnnouncementContent from "../../../Components/Admin/Announcements/AnnouncementContent";
import AnnouncementForm from "../../../Components/Admin/Announcements/AnnouncementForm";
import AnnouncementTable from "../../../Components/Admin/Announcements/AnnouncementTable";
import GeneralDashCmp from "../../../Components/Admin/DashboardComp/GeneralDashCmp";
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
import classes from "./AnnouncementsPg.module.css";
import React from "react";

const AnnouncementsPg = () => {
  return (
    <>
      <div>AnnouncementsPg</div>
      <div className={classes.mainContainer}>
        <HeaderCmp />
        <GeneralDashCmp>
          Announcements Related Content Component is here.
          <AnnouncementTable />
          <AnnouncementContent />
          <AnnouncementForm />
        </GeneralDashCmp>
      </div>
    </>
  );
};

export default AnnouncementsPg;
