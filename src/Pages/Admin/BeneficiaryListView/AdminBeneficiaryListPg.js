import classes from "./AdminBeneficiaryListPg.module.css";
import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp";
import AdminBeneficiaryListCmp from "../../../Components/Admin/BeneficiaryDetails/AdminBeneficiaryListCmp";

const AdminBeneficiaryListPg = () => {
    return (
        <div className={classes.mainContainer}>
            <HeaderCmp />
            <SidebarAdminCmp visible={true}/>
            <DefaultDashCmp>
                <h1 style={{textAlign: "center"}} className={classes.title}>Beneficiaries List</h1>
                <AdminBeneficiaryListCmp/>
            </DefaultDashCmp>
        </div>
    );
}

export default AdminBeneficiaryListPg