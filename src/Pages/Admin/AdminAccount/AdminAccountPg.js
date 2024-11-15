import GeneralDashCmp from "../../../Components/Admin/DashboardComp/GeneralDashCmp";
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
import classes from "./AdminAccountPg.module.css";
import AdminAccountContent from "../../../Components/Admin/Account/AdminAccountContent";

const AdminAccountPg = () => {
  // you have to pass the necessary data using useEffect to the AdminAccountContent Component.

  return (
    <>
      <div className={classes.mainContainer}>
        <HeaderCmp />
        <GeneralDashCmp>
          <AdminAccountContent />
        </GeneralDashCmp>
      </div>
    </>
  );
};

export default AdminAccountPg;
