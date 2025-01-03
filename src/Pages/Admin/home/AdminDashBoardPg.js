import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
import GridTypeDashCmp from "../../../Components/Admin/DashboardComp/GridTypeDashCmp";
import CardCmp from "../../../Components/Admin/NavigationCard/CardCmp";
import AdminSideBarCmp from "../../../Components/Admin/Sidebar/AdminSideBarCmp";
// import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp";
// import Footer from "../../../Components/Admin/Footer/FooterCmp";
import classes from "./AdminDashBoardPg.module.css";

const AdminDashBoardPg = () => {
  return (
    <>
      <HeaderCmp />
      <div className={classes.mainContainer}>
        {/* Sidebar component */}
        <AdminSideBarCmp />
        {/* Main content */}
        <div className={classes.content}>
          <DefaultDashCmp>
            <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>
          </DefaultDashCmp>
          <GridTypeDashCmp>
            <CardCmp
              title="Donors"
              link="/admin/Donor_List/Donors"
              iconName=""
            />
            <CardCmp
              title="Benificiaries"
              link="/admin/Beneficiary_List/Beneficiaries"
              iconName=""
            />
            <CardCmp
              title="Statistics"
              link="/admin/overall_stats"
              iconName=""
            />
            <CardCmp title="Tickets" link="/admin/view/tickets" iconName="" />
            <CardCmp
              title="Sign Up Crew Member"
              link="/admin/register/crew_member"
              iconName="registered outline"
            />
            <CardCmp
              title="Assign Crew Member"
              link="/admin/assign/crew_member"
              iconName=""
            />
          </GridTypeDashCmp>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default AdminDashBoardPg;
