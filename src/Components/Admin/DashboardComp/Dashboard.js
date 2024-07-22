import Card from "../NavigationCard/Card";
import classes from "./Dashboard.module.css"

const Dashboard = () => {
    return (
        <div className={classes.mainContainer}>
            <div className={classes.mainContent}>
                <div className={classes.dashboard}>
                    <Card title="Donor" />
                    <Card title="Donee" />
                    <Card title="Statistics" />
                    <Card title="Register" />
                    <Card title="Complaints" />
                </div>
            </div>
        </div>
    );
}
 
export default Dashboard;