import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
import AdminDonorListCmp from "../../../Components/Admin/DonorDetails/AdminDonorListCmp";
import classes from "./AdminDonorListPg.module.css";
import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp";
import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
// import TableExamplePagination from "../../../Components/Admin/DonorDetails/DummyTable";

const AdminDonorListPg = () => {
  return (
    <div className={classes.mainContainer}>
      <HeaderCmp />
      <SidebarAdminCmp visible={true} />
      <DefaultDashCmp>
        <h1 style={{ textAlign: "center" }}>Donors List</h1>
        <AdminDonorListCmp />
        {/* <TableExamplePagination /> */}
      </DefaultDashCmp>
    </div>
  );
};

export default AdminDonorListPg;
