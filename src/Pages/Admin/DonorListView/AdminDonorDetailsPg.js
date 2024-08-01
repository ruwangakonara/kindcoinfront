import classes from "./AdminDonorDetailsPg.module.css"
// import { useParams } from 'react-router-dom';
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp";
import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
import AdminDonorCmp from "../../../Components/Admin/DonorDetails/AdminDonorCmp";

const AdminDonorDetailsPg = () => {
    return (
        <div className={classes.mainContainer}>
            <HeaderCmp/>
            <SidebarAdminCmp visible={true}/>
            <DefaultDashCmp >
                <h1 style={{textAlign: "center"}}>Donor Details</h1>
                <AdminDonorCmp/>
            </DefaultDashCmp>
            
        </div>
    );
}
 
export default AdminDonorDetailsPg;