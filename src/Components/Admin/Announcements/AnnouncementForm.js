import React, { useState } from "react";
import classes from "./AnnouncementForm.module.css";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Image,
  FormGroup,
  Input,
  FormSelect,
  Message,
} from "semantic-ui-react";
import axios from "axios";

const options = [
  { key: "b", text: "Beneficiary", value: "beneficiary" },
  { key: "d", text: "Donor", value: "donor" },
];

const AnnouncementForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    donor: false, // Initially, neither donor nor beneficiary is selected
    beneficiary: false,
  });
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(""); // For error handling
  const [success, setSuccess] = useState(""); // For success handling

  // Handle form field changes
  const handleChange = (e, { name, value }) => {
    if (name === "user") {
      // Set donor or beneficiary based on user selection
      if (value === "donor") {
        setFormData({ ...formData, donor: true, beneficiary: false });
      } else if (value === "beneficiary") {
        setFormData({ ...formData, donor: false, beneficiary: true });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Make a POST request to create the announcement
      const response = await axios.post(
        "http://localhost:9013/admin/handle/announcements/create",
        formData
      );
      setLoading(false);
      setSuccess("Announcement created successfully!");
      console.log("Response:", response.data);

      // Optional: Redirect after a successful submission
      setTimeout(() => {
        navigate("/admin/handle/announcements");
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      setLoading(false);
      setError("Failed to create the announcement. Please try again.");
      console.error("Error creating announcement:", err);
    }
  };

  return (
    <>
      <div className={classes.admin_formContainer}>
        <div className={classes.formContent}>
          <Form onSubmit={handleSubmit} size="medium" loading={loading}>
            <Form.Field
              fluid
              label="Title"
              control={Input}
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleChange}
            />
            <Form.Group widths="equal">
              <Form.Field
                label="Body"
                control={Input}
                name="body"
                type="text"
                required
                value={formData.body}
                onChange={handleChange}
              />
            </Form.Group>
            <FormSelect
              fluid
              label="User"
              options={options}
              placeholder="Select User Type"
              name="user"
              onChange={handleChange}
              required
            />
            <Form.Group>
              <Form.Button type="submit" content="Submit" positive />
              <Form.Button
                type="button"
                onClick={() => navigate("/admin/handle/announcements")}
                content="Cancel"
                negative
              />
            </Form.Group>
          </Form>

          {/* Success Message */}
          {success && <Message positive>{success}</Message>}

          {/* Error Message */}
          {error && <Message negative>{error}</Message>}
        </div>
      </div>
    </>
  );
};

export default AnnouncementForm;
