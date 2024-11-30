import React from "react";
import classes from "./DefaultDashCmp.module.css";

const DefaultDashCmp = ({ children }) => {
  return <div className={classes.admin_dashboard}>{children}</div>;
};

export default DefaultDashCmp;
