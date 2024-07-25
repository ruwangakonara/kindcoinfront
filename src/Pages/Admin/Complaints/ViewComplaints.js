import SidebarAdmin from "../../../Components/Admin/Sidebar/SidebarAdmin";
import Header from "../../../Components/Admin/Header/Header";
import DefaultDash from "../../../Components/Admin/DashboardComp/DefaultDash";
import classes from "./ViewComplaints.module.css"

const ViewComplaints = () => {
    return (
        <div className={classes.mainContainer}>
            <Header/>
            <SidebarAdmin/>
            <DefaultDash>
                <h1>Complaints</h1>
            </DefaultDash>
        </div>
    );
}
 
export default ViewComplaints;