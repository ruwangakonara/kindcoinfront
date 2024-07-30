import DefaultDash from "../../../Components/Admin/DashboardComp/DefaultDash";
import Header from "../../../Components/Admin/Header/Header";
import Card from "../../../Components/Admin/NavigationCard/Card";
import SidebarAdmin from "../../../Components/Admin/Sidebar/SidebarAdmin";

const AssignCrewMember = () => {
    return ( 
        <div>
            <Header/>
            <SidebarAdmin visible={true}/>
            <DefaultDash>
                <Card title={"aksdfl"}/>
                <Card title={"aksdfl"}/>
                <Card title={"aksdfl"}/>
            </DefaultDash>
        </div>
    );
}
 
export default AssignCrewMember;