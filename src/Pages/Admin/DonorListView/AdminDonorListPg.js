// import { useState } from "react";
import Header from "../../../Components/Admin/Header/Header";
import AdminDonorList from "../../../Components/Admin/DonorDetails/AdminDonorList";
import classes from "./AdminDonorListPg.module.css";
import SidebarAdmin from "../../../Components/Admin/Sidebar/SidebarAdmin";
import DefaultDash from "../../../Components/Admin/DashboardComp/DefaultDash";

const AdminDonorListPg = () => {

    return (
        <div className={classes.mainContainer}>
            <Header/>
            <SidebarAdmin/>
            <DefaultDash>
                <h1 style={{textAlign: "center"}}>Donors List</h1>
                <AdminDonorList/>
            </DefaultDash>
        </div>
    );
}

export default AdminDonorListPg