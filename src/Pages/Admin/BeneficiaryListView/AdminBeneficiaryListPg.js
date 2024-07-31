import classes from "./AdminBeneficiaryListPg.module.css";
import DefaultDash from "../../../Components/Admin/DashboardComp/DefaultDash";
import Header from "../../../Components/Admin/Header/Header";
import SidebarAdmin from "../../../Components/Admin/Sidebar/SidebarAdmin";
import AdminBeneficiaryList from "../../../Components/Admin/BeneficiaryDetails/AdminBeneficiaryList";

const AdminBeneficiaryListPg = () => {
    return (
        <div className={classes.mainContainer}>
            <Header />
            <SidebarAdmin visible={true}/>
            <DefaultDash>
                <h1 style={{textAlign: "center"}} className={classes.title}>BeneficiaryList</h1>
                <AdminBeneficiaryList/>
            </DefaultDash>
        </div>
    );
}

export default AdminBeneficiaryListPg