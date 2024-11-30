import classes from "./AdminSettingsPg.module.css";
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
// import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp";
import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
import AdminSideBarCmp from "../../../Components/Admin/Sidebar/AdminSideBarCmp";

const AdminSettingsPg = () => {
  return (
    <>
      <HeaderCmp />
      <div className={classes.mainContainer}>
        <AdminSideBarCmp />
        {/* <SidebarAdminCmp visible={true} /> */}
        <div className={classes.content}>
          <DefaultDashCmp>
            <h1 style={{ textAlign: "center" }}>Settings</h1>
          </DefaultDashCmp>
        </div>
      </div>
    </>
  );
};

export default AdminSettingsPg;
