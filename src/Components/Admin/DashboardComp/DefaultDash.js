import classes from "./DefaultDash.module.css"

const DefaultDash = ({children}) => {
    return (
        <div className={classes.mainContainer}>
            <div className={classes.mainContent}>
                <div className={classes.dashboard}>
                    {children}
                </div>
            </div>
        </div>
    );
}
 
export default DefaultDash;