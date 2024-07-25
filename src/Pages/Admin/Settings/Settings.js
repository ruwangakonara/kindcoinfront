import classes from "./Settings.module.css"

import Header from "../../../Components/Admin/Header/Header";
import SidebarAdmin from "../../../Components/Admin/Sidebar/SidebarAdmin";
import DefaultDash from "../../../Components/Admin/DashboardComp/DefaultDash";

const Settings = () => {
    return (
        <div className={classes.mainContainer}>
            <Header/>
            <SidebarAdmin/>
            <DefaultDash>
                <h1>Settings</h1>
            </DefaultDash>
        </div>
    );
}
 
export default Settings;