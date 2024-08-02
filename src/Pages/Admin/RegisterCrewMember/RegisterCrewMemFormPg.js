import classes from "./RegisterCrewMemFormPg.module.css"
import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp"
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp"
import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp"
import { useState } from "react"

const RegisterCrewMemFormPg = () => {

    const [formData, setFormData] = useState({
        // userId: '',
        name: '',
        registrationDate: '',
        userName: '',
        email: '',
        // noOfOps: '',
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to a server
    };

    return (
        <div className={classes.mainContainer}>
            <HeaderCmp/>
            <SidebarAdminCmp visible={true}/>
            <DefaultDashCmp>
                <h1 style={{textAlign: "center"}}>Register page</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div>
                        <label>UserName:</label>
                        <input type="text" name="userName" value={formData.userName} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Registration Date:</label>
                        <input type="date" name="registrationDate" value={formData.registrationDate} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </DefaultDashCmp>
        </div>
    )
}

export default RegisterCrewMemFormPg