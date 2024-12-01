import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
import AdminSideBarCmp from "../../../Components/Admin/Sidebar/AdminSideBarCmp";
import AdminBeneficiaryListCmp from "../../../Components/Admin/BeneficiaryDetails/AdminBeneficiaryListCmp";
// import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp";
import classes from "./AdminBeneficiaryListPg.module.css";

const AdminBeneficiaryListPg = () => {
  return (
    <>
      <HeaderCmp />
      <div className={classes.mainContainer}>
        {/* <SidebarAdminCmp visible={true} /> */}
        <AdminSideBarCmp />
        <div className={classes.content}>
          <DefaultDashCmp>
            <h1 style={{ textAlign: "center" }} className={classes.title}>
              Beneficiaries List
            </h1>
            <AdminBeneficiaryListCmp />
          </DefaultDashCmp>
        </div>
      </div>
    </>
  );
};

export default AdminBeneficiaryListPg;
