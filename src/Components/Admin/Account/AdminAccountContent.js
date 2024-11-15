import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Input, Button, Image, Message } from "semantic-ui-react";

const AdminAccountContent = () => {
  const [adminData, setAdminData] = useState({
    // user_id: "",
    username: "",
    password: "",
    name: "",
    profile_image: "",
    phoneNo: "",
    created_at: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch admin account data on component mount
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get("http://localhost:9013/admin/account");
        setAdminData(response.data); // Assuming response.data has the admin object
        setLoading(false);
      } catch (error) {
        setError("Error fetching admin data");
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleChange = (e, { name, value }) => {
    setAdminData({
      ...adminData,
      [name]: value,
      //   [e.target.name]: e.target.value,
    });
  };

  // Update admin data handler
  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost:9013/admin/account", adminData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds
      alert("Admin data updated successfully");
    } catch (error) {
      setError("Error updating admin data");
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  // comment this for see the form.
  //   if (error) {
  //     return <h2>{error}</h2>;
  //   }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Admin Account Page</h1>
      <div style={{ textAlign: "center" }}>
        <Image
          src={adminData.profile_image}
          size="large"
          circular
          centered
          alt="Admin Profile"
          style={{ borderRadius: "50%" }}
        />

        {success && (
          <Message positive>Admin data updated successfully!</Message>
        )}

        <Form>
          <Form.Field>
            <label>Username (Email)</label>
            <Input
              placeholder="Username"
              name="username"
              value={adminData.username}
              readOnly
            />
          </Form.Field>
          <Form.Field>
            <label>PassWord</label>
            <Input
              placeholder="PassWord"
              name="password"
              value={adminData.password}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Name</label>
            <Input
              placeholder="Name"
              name="name"
              value={adminData.name}
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field>
            <label>Phone Number</label>
            <Input
              placeholder="Phone Number"
              name="phoneNo"
              value={adminData.phoneNo}
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field>
            <label>Created At</label>
            <Input
              name="created_at"
              value={new Date(adminData.created_at).toLocaleString()}
              readOnly
            />
          </Form.Field>

          <Button primary type="button" onClick={handleUpdate}>
            Update Admin Info
          </Button>
        </Form>

        {/* <form>
          <div>
            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={adminData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Username: </label>
            <input
              type="email"
              name="username"
              value={adminData.username}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div>
            <label>Phone Number: </label>
            <input
              type="text"
              name="phoneNo"
              value={adminData.phoneNo}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Created At: </label>
            <input
              type="text"
              name="created_at"
              value={new Date(adminData.created_at).toLocaleString()}
              readOnly
            />
          </div>
          <button type="button" onClick={handleUpdate}>
            Update Admin Info
          </button>
        </form> */}
      </div>
    </>
  );
};

export default AdminAccountContent;
