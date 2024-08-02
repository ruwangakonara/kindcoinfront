import classes from "./AdminBeneficiaryDetails.module.css"
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp";
import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
import AdminBeneficiaryCmp from "../../../Components/Admin/BeneficiaryDetails/AdminBeneficiaryCmp";

const AdminBeneficiaryDetailsPg = () => {
    return (
        <div className={classes.mainContainer}>
            <HeaderCmp/>
            <SidebarAdminCmp visible={true}/>
            <DefaultDashCmp >
                <h1 style={{textAlign: "center"}}>Beneficiary Details</h1>
                <AdminBeneficiaryCmp/>
            </DefaultDashCmp>
        </div>
    );
}
 
export default AdminBeneficiaryDetailsPg;