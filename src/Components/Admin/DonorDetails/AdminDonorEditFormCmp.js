import React, { useState, useEffect } from "react";
import { Form, Image, FormGroup, Input } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import classes from "./AdminDonorEditFormCmp.module.css";
import axios from "axios";

const AdminDonorEditFormCmp = ({ donorDetails }) => {
  const navigate = useNavigate();

  // Destructure the donor details
  //   const {
  //     anonymous,
  //     anonymous_id,
  //     created_at,
  //     date_of_birth,
  //     description,
  //     district,
  //     donated,
  //     image1,
  //     image2,
  //     image3,
  //     image4,
  //     image5,
  //     images:[],
  //     name,
  //     no_donations,
  //     phoneNo,
  //     profile_image,
  //     stellar_address,
  //     tokens,
  //     type,
  //     user_id,
  //        isEthical,
  //        status,
  //        username,
  //        _id,
  //     username,
  //     usual_donations:[]
  //   } = donorDetails;

  // Sample initial state, replace with actual data fetching logic
  const [formData, setFormData] = useState({
    userId: "",
    userName: "",
    name: "",
    district: "",
    stellarAddress: "",
    contact: "",
    profileImage: "",
  });

  useEffect(() => {
    if (donorDetails) {
      setFormData({
        userId: donorDetails.user_id,
        userName: donorDetails.username,
        name: donorDetails.name,
        district: donorDetails.district,
        stellarAddress: donorDetails.stellar_address,
        contact: donorDetails.phoneNo,
        profileImage: donorDetails.profile_image,
      });
      console.log(donorDetails);
    }
  }, [donorDetails]); // This effect runs whenever donorDetails changes

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
        `http://localhost:9013/admin/Donor_List/Donors/edit/${formData.userId}`,
        {
          username: formData.userName,
          name: formData.name,
          district: formData.district,
          stellar_address: formData.stellarAddress,
          phoneNo: formData.contact,
          profile_image: formData.profileImage, // You might need to handle file upload differently
        }
      );

      console.log("Response:", response);
      // Redirect to the Donors List after a successful update
      navigate("/admin/Donor_List/Donors");
    } catch (error) {
      console.error("Error updating donor:", error);
    }
  };

  return (
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
      <FormGroup widths="equal">
        <Form.Field
          required={true}
          label="Name"
          control={Input}
          placeholder="Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
        <Form.Field
          required={true}
          label="District"
          control={Input}
          placeholder="District"
          name="district"
          type="text"
          value={formData.district}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup widths="equal">
        <Form.Field
          //   required={true}
          label="Stellar Address"
          control={Input}
          placeholder="Stellar Address"
          name="stellarAddress"
          type="text"
          value={formData.stellarAddress}
          onChange={handleChange}
        />
        <Form.Field
          required={true}
          label="Contact"
          control={Input}
          placeholder="Contact"
          name="contact"
          type="text"
          value={formData.contact}
          onChange={handleChange}
        />
      </FormGroup>
      <Form.Field>
        <label>Profile Image</label>
        <Image src={formData.profileImage} size="small" />
        <input
          type="file"
          name="profileImage"
          onChange={handleChange} // Adjust this for image file uploads
        />
      </Form.Field>
      <Form.Group>
        <Form.Button type="submit" content="Update" positive />
        <Form.Button
          type="button"
          onClick={() => navigate("/admin/Donor_List/Donors")}
          content="Cancel"
          negative
        />
      </Form.Group>
    </Form>
  );
};

export default AdminDonorEditFormCmp;
