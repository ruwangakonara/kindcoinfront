import AdminBeneficiaryEditFormCmp from "../../../Components/Admin/BeneficiaryDetails/AdminBeneficiaryEditFormCmp";
import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp";
import classes from "./AdminBeneficiaryEditFormPg.module.css"

const AdminBeneficiaryEditFormPg = () => {
    return (
        <div className={classes.mainContainer}>
            <HeaderCmp/>
            <SidebarAdminCmp visible={true}/>
            <DefaultDashCmp>
                <h1 style={{textAlign: "center"}}>Edit</h1>
                <div>
                    <AdminBeneficiaryEditFormCmp/>
                </div>
            </DefaultDashCmp>
        </div>
    );
}
 
export default AdminBeneficiaryEditFormPg;