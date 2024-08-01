import classes from "./AdminSettingsPg.module.css"
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp";
import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";

const AdminSettingsPg = () => {
    return (
        <div className={classes.mainContainer}>
            <HeaderCmp/>
            <SidebarAdminCmp visible={true}/>
            <DefaultDashCmp>
                <h1 style={{textAlign: "center"}}>Settings</h1>
            </DefaultDashCmp>
        </div>
    );
}
 
export default AdminSettingsPg;