import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
import AdminDonorEditFormCmp from "../../../Components/Admin/DonorDetails/AdminDonorEditFormCmp";
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp";
import classes from "./AdminDonorEditFormPg.module.css"

const AdminDonorEditFormPg = () => {
    return (
        <div className={classes.mainContainer}>
            <HeaderCmp/>
            <SidebarAdminCmp visible={true}/>
            <DefaultDashCmp>
                <h1 style={{textAlign: "center"}}>Edit</h1>
                <div className={classes.mainContainer}>
                    <AdminDonorEditFormCmp/>
                </div>
            </DefaultDashCmp>
        </div>
    );
}
 
export default AdminDonorEditFormPg;