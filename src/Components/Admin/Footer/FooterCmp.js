import React from "react";
import classes from "./FooterCmp.module.css"; // Optional: To add custom styling

const Footer = ({ leftText, rightText }) => {
  return (
    <footer className={classes.admin_footer}>
      <div className={classes.admin_footerLeft}>{leftText}</div>
      <div className={classes.admin_footerRght}>{rightText}</div>
    </footer>
  );
};

export default Footer;
