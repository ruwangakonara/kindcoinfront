import React from "react";
import classes from "./GeneralDashCmp.module.css";

const GeneralDashCmp = ({ children }) => {
  return (
    <>
      <div className={classes.admin_generalDash}>{children}</div>
    </>
  );
};

export default GeneralDashCmp;
