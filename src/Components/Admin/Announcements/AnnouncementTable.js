import classes from "./AnnouncementTable.module.css";

import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
import AdminSideBarCmp from "../Sidebar/AdminSideBarCmp";
import AdminDonorListCmp from "../../../Components/Admin/DonorDetails/AdminDonorListCmp";

const AnnouncementTable = () => {
  return (
    <>
      <div className={classes.mainContainer}>AnnouncementTable</div>

      <HeaderCmp />
      <div className={classes.mainContainer}>
        {/* <SidebarAdminCmp visible={true} /> */}
        <AdminSideBarCmp />
        <div className={classes.content}>
          <DefaultDashCmp>
            {/* <h1 style={{ textAlign: "center" }}>Donors List</h1> */}
            <AdminDonorListCmp />
            {/* <TableExamplePagination /> */}
          </DefaultDashCmp>
        </div>
      </div>
    </>
  );
};

export default AnnouncementTable;
