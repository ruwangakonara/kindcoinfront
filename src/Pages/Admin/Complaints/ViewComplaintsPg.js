import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp";
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
import classes from "./ViewComplaintsPg.module.css"
import RaisedTicketsTableCmp from "../../../Components/Admin/TicketsRaised/RaisedTicketsTableCmp";

const ViewComplaintsPg = () => {
    return (
        <div className={classes.mainContainer}>
            <HeaderCmp/>
            <SidebarAdminCmp visible={true}/>
            <DefaultDashCmp>
                <h1 style={{textAlign: "center"}}>Complaints</h1>
                <RaisedTicketsTableCmp/>
            </DefaultDashCmp>
        </div>
    );
}
 
export default ViewComplaintsPg;