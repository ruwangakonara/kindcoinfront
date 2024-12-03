import classes from "./RegisterCrewMemFormPg.module.css";
import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
// import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp";
import AdminSideBarCmp from "../../../Components/Admin/Sidebar/AdminSideBarCmp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormField,
  Button,
  Checkbox,
  Form,
  FormGroup,
  Input,
  Message,
} from "semantic-ui-react";

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:9013",
  withCredentials: true,
});

const RegisterCrewMemFormPg = () => {
  const navigate = useNavigate();

  // do a similar logic to post endpoint.
  // const [announcements, setAnnouncements] = useState([]);

  //   const fetchAnnouncements = async () => {

  //       try{
  //           const response =  await axiosInstance.get('/donor/get_announcements');
  //           setAnnouncements(response.data.announcements)
  //       } catch(error){
  //           console.log(error);
  //       }

  //   }

  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    // stellarId: "",
    // town: "",
    // profileImage: "",
    // certificateImage: "",
    // email: "",
    phoneNo: "",
    // noOfOperations: 0,
    passWord: "",
    status: "crew_member",
  });

  const [formState, setFormState] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      console.log(formData);
      await axiosInstance.post("/admin/register/crew_member", formData);
      // setOpen(false);
      navigate("/admin/view/crew_member");
    } catch (error) {
      console.log(error);
    }
  };
  const handleFormState = (e) => {
    setFormState(!formState);
  };

  return (
    <div className={classes.mainContainer}>
      <HeaderCmp />
      <AdminSideBarCmp />
      <div className={classes.content}>
        {/* <SidebarAdminCmp visible={true} /> */}
        <DefaultDashCmp>
          <h1 style={{ textAlign: "center" }}>Register page</h1>

          <div className={classes.admin_formContainer}>
            <div className={classes.formContent}>
              <Form onSubmit={handleSubmit} success={formState}>
                <FormGroup widths="equal">
                  <FormField
                    required={true}
                    label="Name"
                    control={Input}
                    placeholder="Name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {/*<FormField*/}
                  {/*  required={true}*/}
                  {/*  label="No Of Operations"*/}
                  {/*  control={Input}*/}
                  {/*  placeholder="No Of Operations"*/}
                  {/*  name="noOfOperations"*/}
                  {/*  type="text"*/}
                  {/*  value={formData.noOfOperations}*/}
                  {/*  onChange={handleChange}*/}
                  {/*/>*/}
                </FormGroup>
                <FormGroup widths="equal">
                  {/*<FormField*/}
                  {/*  required={true}*/}
                  {/*  label="Stellar Id"*/}
                  {/*  control={Input}*/}
                  {/*  placeholder="Stellar Id"*/}
                  {/*  name="stellarId"*/}
                  {/*  type="text"*/}
                  {/*  value={formData.stellarId}*/}
                  {/*  onChange={handleChange}*/}
                  {/*/>*/}
                  {/*<FormField*/}
                  {/*  required={true}*/}
                  {/*  label="Town"*/}
                  {/*  control={Input}*/}
                  {/*  placeholder="Town"*/}
                  {/*  name="town"*/}
                  {/*  type="text"*/}
                  {/*  value={formData.town}*/}
                  {/*  onChange={handleChange}*/}
                  {/*/>*/}
                </FormGroup>
                <FormGroup widths="equal">
                  {/*<FormField*/}
                  {/*  required={true}*/}
                  {/*  label="ProfileImage"*/}
                  {/*  control={Input}*/}
                  {/*  placeholder="ProfileImage"*/}
                  {/*  name="profileImage"*/}
                  {/*  type="text"*/}
                  {/*  value={formData.profileImage}*/}
                  {/*  onChange={handleChange}*/}
                  {/*/>*/}
                  {/*<FormField*/}
                  {/*  required={true}*/}
                  {/*  label="CertificateImage"*/}
                  {/*  control={Input}*/}
                  {/*  placeholder="CertificateImage"*/}
                  {/*  name="CertificateImage"*/}
                  {/*  type="text"*/}
                  {/*  value={formData.certificateImage}*/}
                  {/*  onChange={handleChange}*/}
                  {/*/>*/}
                </FormGroup>
                <FormGroup widths="equal">
                  {/* <FormField
                required={true}
                label="Email"
                control={Input}
                placeholder="josch@gmail.com"
                // id="form-input-control-error-email"
                // error={{
                //   content: "Please enter a valid email address",
                //   pointing: "below",
                // }}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              /> */}
                  <FormField
                    required={true}
                    label="PhoneNo"
                    control={Input}
                    placeholder="PhoneNo"
                    name="phoneNo"
                    type="text"
                    value={formData.phoneNo}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup widths="equal">
                  <FormField
                    required={true}
                    label="User Name (Email)"
                    control={Input}
                    placeholder="UserName (Email)"
                    name="userName"
                    type="text"
                    value={formData.userName}
                    onChange={handleChange}
                  />
                  <FormField
                    required={true}
                    label="PassWord"
                    control={Input}
                    placeholder="PassWord"
                    name="passWord"
                    type="text"
                    value={formData.passWord}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormField
                  control={Checkbox}
                  label={"I agree to the Terms and Conditions"}
                  required={true}
                />
                <FormField
                  id="form-button-control-public"
                  control={Button}
                  content="Confirm"
                  label="Confirmation"
                  type="submit"
                />
                <Message
                  success
                  header="Registration Completed"
                  content="Successfully Registered the Crew Member"
                />
              </Form>
            </div>
          </div>
        </DefaultDashCmp>
      </div>
    </div>
  );
};

export default RegisterCrewMemFormPg;
