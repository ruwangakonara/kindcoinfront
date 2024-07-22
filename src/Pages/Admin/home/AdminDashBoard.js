import { useState } from "react";
import Header from "../../../Components/Admin/Header/Header";
import SidebarAdmin from "../../../Components/Admin/Sidebar/SidebarAdmin";
import Card from "../../../Components/Admin/NavigationCard/Card";
import GridTypeDash from "../../../Components/Admin/DashboardComp/GridTypeDash";

const AdminDashBoard = () => {

    const [activeTab, setActiveTab] = useState('');

    const handleSidebarItemClick = (item) => {
        setActiveTab(item);
    };
    return ( 
        <>            
            <Header/>
            <SidebarAdmin onItemClick={handleSidebarItemClick}/>
            <GridTypeDash>
                <Card title="Donor" />
                <Card title="Benificiary" />
                <Card title="Statistics" />
                <Card title="Register" />
                <Card title="Complaints" />
            </GridTypeDash>
        </>
     );
}
 
export default AdminDashBoard;