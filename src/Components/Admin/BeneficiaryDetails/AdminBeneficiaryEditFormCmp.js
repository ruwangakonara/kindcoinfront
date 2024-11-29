import React, { useState, useEffect } from "react";
import classes from "./AdminBeneficiaryEditFormCmp.module.css";
import { useNavigate } from "react-router-dom";
import { Form, Button, Image, FormGroup, Input } from "semantic-ui-react";
import axios from "axios";

const AdminBeneficiaryEditFormCmp = ({ beneficiaryDetails }) => {
  const navigate = useNavigate();

  // Destructure the beneficiary details
  //   const {
  //     certificate_image,
  //     created_at,
  //     date_of_birth,
  //     district,
  //     email,
  //     image1,
  //     image2,
  //     image3,
  //     name,
  //     phoneNo,
  //     profile_image,
  //     raised_amount,
  //     type,
  //     user_id,
  //          isEthical,
  //          status,
  //          username,
  //          _id,
  //     username,
  //     verified,
  //     _id
  //   } = beneficiaryDetails;

  // Sample initial state, replace with actual data fetching logic
  const [formData, setFormData] = useState({
    userId: "",
    userName: "",
    name: "",
    district: "",
    type: "",
    contact: "",
    image: "",
    certificate: "",
    amountRaised: 0,
    verified: false,
    created: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (beneficiaryDetails) {
        setFormData({
          userId: beneficiaryDetails.user_id,
          userName: beneficiaryDetails.username,
          name: beneficiaryDetails.name,
          district: beneficiaryDetails.district,
          type: beneficiaryDetails.type,
          contact: beneficiaryDetails.phoneNo,
          image: beneficiaryDetails.profile_image,
          certificate: beneficiaryDetails.certificate_image,
          amountRaised: beneficiaryDetails.raised_amount,
          verified: beneficiaryDetails.verified,
          created: beneficiaryDetails.created_at,
        });
        console.log(beneficiaryDetails);
      }
    };
    fetchData();
  }, [beneficiaryDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // data before submitting
    console.log("Data before submitting:", formData);

    try {
      const response = await axios.put(
        `http://localhost:9013/admin/Beneficiary_List/Beneficiaries/edit/${formData.userId}`,
        {
          user_id: formData.userId,
          username: formData.userName,
          name: formData.name,
          district: formData.district,
          type: formData.type,
          phoneNo: formData.contact,
          profile_image: formData.image,
          certificate_image: formData.certificate,
          raised_amount: formData.amountRaised,
          verified: formData.verified,
          created_at: formData.created,
        }
      );

      console.log("Response:", response);
      navigate("/admin/Beneficiary_List/Beneficiaries");
    } catch (error) {
      console.error("Error updating Beneficiary:", error);
    }

    navigate("/admin/Beneficiary_List/Beneficiaries");
  };

  return (
    // <div className={classes.mainContainer}>
    <Form onSubmit={handleSubmit} size="big">
      <FormGroup widths="equal">
        <Form.Field
          label="User ID"
          control={Input}
          name="userId"
          type="text"
          value={formData.userId}
          readOnly
        />
        <Form.Field
          required={true}
          label="User Name"
          control={Input}
          placeholder="User Name"
          name="userName"
          type="text"
          value={formData.userName}
          onChange={handleChange}
        />
      </FormGroup>
      {/* <Form.Field>
        <label>User ID</label>
        <input name="userId" value={formData.userId} readOnly />
      </Form.Field> */}
      {/* <Form.Field>
        <label>User Name</label>
        <input
          name="userName"
          value={formData.userName}
          onChange={handleChange}
        />
      </Form.Field> */}
      <Form.Field>
        <label>Name</label>
        <input name="name" value={formData.name} onChange={handleChange} />
      </Form.Field>
      <Form.Field>
        <label>District</label>
        <input
          name="district"
          value={formData.district}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Address</label>
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Contact</label>
        <input
          name="contact"
          value={formData.contact}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Profile Image</label>
        <Image src={formData.image} size="small" />
        <input
          type="file"
          name="image"
          onChange={handleChange} // Adjust this for image file uploads
        />
      </Form.Field>
      <Button type="submit" secondary>
        Save
      </Button>
      <Button
        type="button"
        onClick={() => navigate("/admin/Beneficiary_List/Beneficiaries")}
      >
        Cancel
      </Button>
    </Form>
    // </div>
  );
};

export default AdminBeneficiaryEditFormCmp;
