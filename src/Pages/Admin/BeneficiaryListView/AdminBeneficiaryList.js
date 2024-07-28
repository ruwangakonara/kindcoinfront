import classes from "./AdminBeneficiaryList.module.css";
import AdminBeneficiary from "../../../Components/Admin/BeneficiaryDetails/AdminBeneficiary";
import DefaultDash from "../../../Components/Admin/DashboardComp/DefaultDash";
import Header from "../../../Components/Admin/Header/Header";
import SidebarAdmin from "../../../Components/Admin/Sidebar/SidebarAdmin";

const AdminBeneficiaryList = () => {
    return (
        <div className={classes.mainContainer}>
            <Header />
            <SidebarAdmin/>
            <DefaultDash>
                <h1 style={{textAlign: "center"}}>BeneficiaryList</h1>
                <AdminBeneficiary/>
            </DefaultDash>
        </div>
    );
}

export default AdminBeneficiaryList