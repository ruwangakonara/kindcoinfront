import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp";
import CardCmp from "../../../Components/Admin/NavigationCard/CardCmp";
import GridTypeDashCmp from "../../../Components/Admin/DashboardComp/GridTypeDashCmp";
import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
import classes from "./AdminDashBoardPg.module.css";
// import Footer from "../../../Components/Admin/Footer/FooterCmp";

const AdminDashBoardPg = () => {
  return (
    <>
      <div className={classes.mainContainer}>
        <HeaderCmp />
        <SidebarAdminCmp visible={true} />
        <DefaultDashCmp>
          <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>
        </DefaultDashCmp>
        <GridTypeDashCmp>
          <CardCmp title="Donors" link="/admin/Donor_List/Donors" iconName="" />
          <CardCmp
            title="Benificiaries"
            link="/admin/Beneficiary_List/Beneficiaries"
            iconName=""
          />
          <CardCmp title="Statistics" link="/admin/overall_stats" iconName="" />
          <CardCmp
            title="Complaints"
            link="/admin/view/complaints"
            iconName=""
          />
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
      {/* <Footer /> */}
    </>
  );
};

export default AdminDashBoardPg;
