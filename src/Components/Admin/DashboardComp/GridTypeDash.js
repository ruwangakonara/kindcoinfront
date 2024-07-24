import React from 'react'
import classes from "./GridTypeDash.module.css"

const GridTypeDash = (props) => {
    return (
        <div className={classes.mainContainer}>
            <div className={classes.mainContent}>
                <div className={classes.dashboard}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}
 
export default GridTypeDash;