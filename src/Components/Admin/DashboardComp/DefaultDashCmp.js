import React from "react";
import classes from "./DefaultDashCmp.module.css"

const DefaultDashCmp = ({children}) => {
    return (  
        <div className={classes.dashboard}>
            {children}
        </div>
    );
}
 
export default DefaultDashCmp ;