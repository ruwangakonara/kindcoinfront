// import { useState } from "react";
import Header from "../../../Components/Admin/Header/Header";
import AdminDonorList from "../../../Components/Admin/DonorDetails/AdminDonorList";
// import classes from "./AdminDonorListPg.module.css";
import SidebarAdmin from "../../../Components/Admin/Sidebar/SidebarAdmin";

const AdminDonorListPg = () => {

    return (
        <div>
            <Header/>
            <SidebarAdmin/>
            <h1 style={{textAlign: "center"}}>Donors List</h1>
            <AdminDonorList/>
        </div>
    );
}

export default AdminDonorListPg