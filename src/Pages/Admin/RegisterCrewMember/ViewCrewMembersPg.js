import classes from "./ViewCrewMembers.module.css"
import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp"
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp"
import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp"
import CrewMemberTableCmp from "../../../Components/Admin/CrewMemberDets/CrewMemberTableCmp"
import { useState } from "react"
import RegisterCrewMemFormPg from "./RegisterCrewMemFormPg"

const ViewCrewMembersPg = () => {

    const [showForm, setShowForm] = useState(false); // State to manage form visibility

    const handleAddUserClick = () => {
        setShowForm(true); // Show the form when "Add User" is clicked
    };

    return (
        <div className={classes.mainContainer}>
            <HeaderCmp/>
            <SidebarAdminCmp visible={true}/>
            <DefaultDashCmp>
                {showForm ? (
                    <RegisterCrewMemFormPg />
                    ) : (
                    <div>
                        <h1 style={{textAlign: "center"}}>Crew Members</h1>
                        <CrewMemberTableCmp onAddUserClick={handleAddUserClick} />
                    </div>
                    )}
                {/* <CrewMemberTableCmp/> */}
            </DefaultDashCmp>
        </div>
    );
}
 
export default ViewCrewMembersPg;