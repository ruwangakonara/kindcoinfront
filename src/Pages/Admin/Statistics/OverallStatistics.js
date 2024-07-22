import GridTypeDash from "../../../Components/Admin/DashboardComp/GridTypeDash";
import Header from "../../../Components/Admin/Header/Header";
import Card from "../../../Components/Admin/NavigationCard/Card";
import SidebarAdmin from "../../../Components/Admin/Sidebar/SidebarAdmin";
// import classes from "./OverallStatistics.module.css"

const Statistics = () => {
    return(
        <div>
            <Header/>
            <SidebarAdmin/>
            <GridTypeDash>
                <Card title={"aksdfl"}/>
                <Card title={"aksdfl"}/>
                <Card title={"aksdfl"}/>
            </GridTypeDash>
        </div>
    )
};

export default Statistics