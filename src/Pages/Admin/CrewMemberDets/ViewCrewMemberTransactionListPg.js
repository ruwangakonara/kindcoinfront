// import classes from "./ViewCrewMemberTransactionListPg.module.css"

import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp"
import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp"

const ViewCrewMemberTransactionListPg = () => {
    return (
        <div>
            {/* Transaction List */}
            <HeaderCmp/>
            <SidebarAdminCmp visible={true}/>
        </div>
    )
}

export default ViewCrewMemberTransactionListPg