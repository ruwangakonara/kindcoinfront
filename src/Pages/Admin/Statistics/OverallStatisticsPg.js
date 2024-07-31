import GridTypeDashCmp from "../../../Components/Admin/DashboardComp/GridTypeDashCmp";
import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
import CardCmp from "../../../Components/Admin/NavigationCard/CardCmp";
import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp";
import classes from "./OverallStatisticsPg.module.css"

const OverallStatisticsPg = () => {
    return(
        <div className={classes.mainContainer}>
            <HeaderCmp/>
            <SidebarAdminCmp visible={true}/>
            <DefaultDashCmp>
                <h1 style={{textAlign: "center"}}>Statistics</h1>
            </DefaultDashCmp>
            <GridTypeDashCmp>
                {/* <Card title={"aksdfl"}/> */}
                <CardCmp title={"aksdfl"}/>
                <CardCmp title={"aksdfl"}/>
            </GridTypeDashCmp>
        </div>
    )
};

export default OverallStatisticsPg