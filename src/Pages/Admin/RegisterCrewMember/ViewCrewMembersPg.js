import classes from "./ViewCrewMembers.module.css"
import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp"
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp"
import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp"
import CrewMemberTableCmp from "../../../Components/Admin/CrewMemberDets/CrewMemberTableCmp"

const ViewCrewMembersPg = () => {

    return (
        <div className={classes.mainContainer}>
            <HeaderCmp/>
            <SidebarAdminCmp visible={true}/>
            <DefaultDashCmp>
                <h1 style={{textAlign: "center"}}>Crew Members</h1>
                <CrewMemberTableCmp />
            </DefaultDashCmp>
        </div>
    );
}
 
export default ViewCrewMembersPg;