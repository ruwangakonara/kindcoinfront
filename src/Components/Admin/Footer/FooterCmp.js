import React from "react";
import classes from "./FooterCmp.module.css"; // Optional: To add custom styling

const Footer = ({ leftText, rightText }) => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerLeft}>{leftText}</div>
      <div className={classes.footerRight}>{rightText}</div>
    </footer>
  );
};

export default Footer;
