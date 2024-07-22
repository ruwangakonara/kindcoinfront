import classes from "./GridTypeDash.module.css"

const GridTypeDash = ({children}) => {
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
 
export default GridTypeDash;