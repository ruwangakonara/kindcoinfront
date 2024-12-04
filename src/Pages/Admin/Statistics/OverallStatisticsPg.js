import GridTypeDashCmp from "../../../Components/Admin/DashboardComp/GridTypeDashCmp";
import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp";
import ChartACmp from "../../../Components/Admin/Charts/ChartACmp";
import ChartBCmp from "../../../Components/Admin/Charts/ChartBCmp";
import ChartCCmp from "../../../Components/Admin/Charts/ChartCCmp";
import classes from "./OverallStatisticsPg.module.css";
import AdminSideBarCmp from "../../../Components/Admin/Sidebar/AdminSideBarCmp";
import { Grid, GridColumn, GridRow } from "semantic-ui-react";
import React from "react";
import ChartDCmp from "../../../Components/Admin/Charts/ChartDCmp";

const donationData = [
  { type: "goods", created: "2024-01-10" },
  { type: "monetary", created: "2024-01-15" },
  { type: "monetary", created: "2024-01-5" },
  { type: "monetary", created: "2024-01-25" },
  { type: "goods", created: "2024-02-20" },
  { type: "monetary", created: "2024-02-25" },
  { type: "monetary", created: "2024-02-22" },
  { type: "monetary", created: "2024-02-14" },
  { type: "monetary", created: "2024-02-19" },
  { type: "monetary", created: "2024-02-11" },
  { type: "goods", created: "2024-03-15" },
  { type: "goods", created: "2024-03-15" },
  { type: "goods", created: "2024-03-15" },
  { type: "goods", created: "2024-03-15" },
  { type: "monetary", created: "2024-03-10" },
  { type: "goods", created: "2024-04-22" },
  { type: "monetary", created: "2024-04-30" },
  { type: "goods", created: "2024-05-03" },
  { type: "monetary", created: "2024-06-07" },
  { type: "goods", created: "2024-06-14" },
  { type: "monetary", created: "2024-07-21" },
  { type: "goods", created: "2024-07-10" },
  { type: "monetary", created: "2024-07-15" },
  { type: "goods", created: "2024-07-15" },
  { type: "goods", created: "2024-07-15" },
  { type: "goods", created: "2024-07-15" },
  { type: "goods", created: "2024-07-15" },
  { type: "monetary", created: "2024-08-02" },
  { type: "monetary", created: "2024-08-02" },
  { type: "monetary", created: "2024-08-02" },
  { type: "monetary", created: "2024-08-02" },
  { type: "monetary", created: "2024-08-02" },
  { type: "monetary", created: "2024-09-02" },
  { type: "monetary", created: "2024-09-02" },
  { type: "goods", created: "2024-09-05" },
  { type: "goods", created: "2024-10-05" },
  { type: "goods", created: "2024-10-05" },
  { type: "goods", created: "2024-10-05" },
  { type: "goods", created: "2024-10-05" },
  { type: "goods", created: "2024-11-05" },
  { type: "monetary", created: "2024-11-05" },
  { type: "monetary", created: "2024-11-22" },
];

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
            {/* <GridTypeDashCmp> */}
            {/* <Grid
              columns={3}
              padded
              celled
              style={{ marginLeft: "200px", alignItems: "center" }}
            > */}
            <div className={classes.chartCnt}>
              <GridColumn>
                <div className={classes.chartGap}>
                  <ChartCCmp />
                </div>
                <div className={classes.chartGap}>
                  <ChartACmp />
                </div>
                <div className={classes.chartGap}>
                  <ChartBCmp />
                </div>
                <div className={classes.chartGap}>
                  <ChartDCmp donationData={donationData} />
                </div>
              </GridColumn>
            </div>
            {/* </Grid> */}
            {/* </GridTypeDashCmp> */}
          </DefaultDashCmp>
        </div>
      </div>
    </>
  );
};

export default OverallStatisticsPg;
