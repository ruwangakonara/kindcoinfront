import classes from "./RegisterCrewMemberPg.module.css"
import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp"
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp"
import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp"
import CrewMemberTableCmp from "../../../Components/Admin/CrewMemberDets/CrewMemberTableCmp"

const RegisterCrewMemberPg = () => {
    return (
        <div className={classes.mainContainer}>
            <HeaderCmp/>
            <SidebarAdminCmp visible={true}/>
            <DefaultDashCmp>
                <h1 style={{textAlign: "center"}}>Register page</h1>
                <CrewMemberTableCmp/>
            </DefaultDashCmp>
        </div>
    )
}

export default RegisterCrewMemberPg