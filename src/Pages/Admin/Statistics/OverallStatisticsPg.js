import GridTypeDashCmp from "../../../Components/Admin/DashboardComp/GridTypeDashCmp";
import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp";
import ChartACmp from "../../../Components/Admin/Charts/ChartACmp";
import ChartBCmp from "../../../Components/Admin/Charts/ChartBCmp";
import ChartCCmp from "../../../Components/Admin/Charts/ChartCCmp";
import classes from "./OverallStatisticsPg.module.css";
import AdminSideBarCmp from "../../../Components/Admin/Sidebar/AdminSideBarCmp";

const OverallStatisticsPg = () => {
  return (
    <>
      <HeaderCmp />
      <div className={classes.mainContainer}>
        {/* <SidebarAdminCmp visible={true} /> */}
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
      </div>
    </>
  );
};

export default OverallStatisticsPg;
