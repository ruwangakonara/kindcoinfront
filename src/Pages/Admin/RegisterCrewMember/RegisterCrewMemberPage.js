import classes from "./RegisterCrewMember.module.css"
import DefaultDash from "../../../Components/Admin/DashboardComp/DefaultDash"
import Header from "../../../Components/Admin/Header/Header"
import SidebarAdmin from "../../../Components/Admin/Sidebar/SidebarAdmin"
import CrewMemberTable from "../../../Components/Admin/CrewMemberDets/CrewMemberTable"

const RegisterCrewMemberPage = () => {
    return (
        <div className={classes.mainContainer}>
            <Header/>
            <SidebarAdmin visible={true}/>
            <DefaultDash>
                <h1>Register page</h1>
                <CrewMemberTable/>
            </DefaultDash>
        </div>
    )
}

export default RegisterCrewMemberPage