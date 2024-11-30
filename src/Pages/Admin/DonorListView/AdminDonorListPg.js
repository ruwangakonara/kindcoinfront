import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
import AdminDonorListCmp from "../../../Components/Admin/DonorDetails/AdminDonorListCmp";
import classes from "./AdminDonorListPg.module.css";
// import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp";
import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
// import TableExamplePagination from "../../../Components/Admin/DonorDetails/DummyTable";
import AdminSideBarCmp from "../../../Components/Admin/Sidebar/AdminSideBarCmp";

const AdminDonorListPg = () => {
  return (
    <>
      <HeaderCmp />
      <div className={classes.mainContainer}>
        {/* <SidebarAdminCmp visible={true} /> */}
        <AdminSideBarCmp />
        <div className={classes.content}>
          <DefaultDashCmp>
            <h1 style={{ textAlign: "center" }}>Donors List</h1>
            <AdminDonorListCmp />
            {/* <TableExamplePagination /> */}
          </DefaultDashCmp>
        </div>
      </div>
    </>
  );
};

export default AdminDonorListPg;
