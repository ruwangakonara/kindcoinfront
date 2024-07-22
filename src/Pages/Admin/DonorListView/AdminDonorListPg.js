import { useState } from "react";
import Header from "../../../Components/Admin/Header/Header";
import AdminDonorList from "../../../Components/Admin/DonorDetails/AdminDonorList";
import "./AdminDonorListPg.css";
import { CssBaseline } from '@mui/material';
import SidebarAdmin from "../../../Components/Admin/Sidebar/SidebarAdmin";
// import SidebarAdmin from "../../../Components/Admin/Sidebar/SidebarAdmin";

const AdminDonorListPg = () => {

    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <div>
            <CssBaseline />
            <SidebarAdmin visible={sidebarVisible}/>
            <Header toggleSidebar={toggleSidebar}>
            </Header>
            <h1 style={{textAlign: "center"}}>Donors List</h1>
            <AdminDonorList/>
        </div>
    );
}

export default AdminDonorListPg