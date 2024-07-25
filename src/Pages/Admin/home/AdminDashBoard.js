// import { useState } from "react";
import Header from "../../../Components/Admin/Header/Header";
import SidebarAdmin from "../../../Components/Admin/Sidebar/SidebarAdmin";
import Card from "../../../Components/Admin/NavigationCard/Card";
import GridTypeDash from "../../../Components/Admin/DashboardComp/GridTypeDash";
import classes from "./AdminDashBoard.module.css"

const AdminDashBoard = () => {

    // const [activeTab, setActiveTab] = useState('');

    // const handleSidebarItemClick = (item) => {
    //     setActiveTab(item);
    // };

    return ( 
        <>     
            <div className={classes.mainContainer}>
                <Header/>
                <SidebarAdmin/>
                <GridTypeDash>
                    <Card title="Donor" link="/admin/Donor_List/Donors"/>
                    <Card title="Benificiary" link="/admin/Beneficiary_List/Beneficiaries" />
                    <Card title="Statistics" link="/admin/overall_stats"/>
                    <Card title="Register" link="/admin/register/crew_member" />
                    <Card title="Complaints" link="/admin/view/complaints"/>
                </GridTypeDash>
            </div>
        </>
     );
}
 
export default AdminDashBoard;