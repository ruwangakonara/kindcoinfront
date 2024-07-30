import React from "react";
import classes from "./DefaultDash.module.css"

const DefaultDash = ({children}) => {
    return (  
        <div className={classes.dashboard}>
            {/* <h1>Default Dashboard</h1> */}
            <h2>{children}</h2>
        </div>
    );
}
 
export default DefaultDash;