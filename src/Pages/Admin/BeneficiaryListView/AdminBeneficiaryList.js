// import classes from "./AdminBeneficiaryList.module.css";
import DefaultDash from "../../../Components/Admin/DashboardComp/DefaultDash";
import Header from "../../../Components/Admin/Header/Header";
import SidebarAdmin from "../../../Components/Admin/Sidebar/SidebarAdmin";

const AdminBeneficiaryList = () => {
    return (
        <div>
            <Header />
            <SidebarAdmin/>
            <DefaultDash/>
        </div>
    );
}

export default AdminBeneficiaryList