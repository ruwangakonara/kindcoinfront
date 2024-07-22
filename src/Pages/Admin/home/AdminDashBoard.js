// import { useState } from "react";
import Header from "../../../Components/Admin/Header/Header";
import SidebarAdmin from "../../../Components/Admin/Sidebar/SidebarAdmin";
import Dashboard from "../../../Components/Admin/DashboardComp/Dashboard";

const AdminDashBoard = () => {
    return ( 
        <>            
            <Header/>
            <SidebarAdmin/>
            <Dashboard/>
        </>
     );
}
 
export default AdminDashBoard;