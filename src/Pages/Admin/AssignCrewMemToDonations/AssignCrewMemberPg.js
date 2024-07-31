import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
// import CardCmp from "../../../Components/Admin/NavigationCard/CardCmp";
import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp";

const AssignCrewMemberPg = () => {
    return ( 
        <div>
            <HeaderCmp/>
            <SidebarAdminCmp visible={true}/>
            <DefaultDashCmp>
                <h1 style={{textAlign: "center"}}>Assign Crew Member For Operations</h1>
            </DefaultDashCmp>
        </div>
    );
}
 
export default AssignCrewMemberPg;