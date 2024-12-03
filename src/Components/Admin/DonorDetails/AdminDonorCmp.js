import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import classes from "./AdminDonorCmp.module.css";
import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Image,
} from "semantic-ui-react";

const AdminDonorCmp = () => {
  const { user_id } = useParams(); // 'id' will come from the URL
  console.log("parameter", user_id);
  const [donorDetails, setDonorDetails] = useState(null); // State to store the donor data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Function to fetch donor details
    const fetchDonorDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9013/admin/Donor_List/Donors/${user_id}`
        );
        setDonorDetails(response.data); // Assuming API response returns the donor data
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error("Error fetching donor details:", error);
        setError(error);
        setLoading(false);
      }
    };
    if (user_id) {
      fetchDonorDetails();
    }

    // fetchDonorDetails();
  }, [user_id]); // Fetch data whenever the 'id' changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching donor details</div>;
  }

  if (!donorDetails) {
    return <div>No donor details found</div>;
  }

  // return donorDetails ? (
  //   <AdminDonorCmp donorDetails={donorDetails} />
  // ) : (
  //   <div>No donor details found</div>
  // );

  // Destructure the donor details
  const {
    user_id: userId,
    name,
    username,
    profile_image,
    district,
    phoneNo,
    stellar_address,
    type,
    date_of_birth,
    description,
    anonymous,
    no_donations,
    donated,
    tokens,
    created_at,
    image1,
    image2,
    image3,
    image4,
    image5,
  } = donorDetails;

  return (
    <div className={classes.admin_mainContainer}>
      <div className={classes.admin_subContainer}>
        {/* Profile Image */}
        {/* <div className={classes.admin_imageWrapper}>
          <Image
            className={classes.admin_image}
            style={{ width: "200px", height: "200px" }}
            src={
              profile_image ||
              "https://react.semantic-ui.com/images/avatar/large/matthew.png"
            }
            wrapped
            ui={false}
          />
        </div> */}
        <div className={classes.admin_cardWrapper}>
          <Card
            fluid={true}
            centered={true}
            raised
            style={{ display: "flex", flexDirection: "row", width: "600px" }}
          >
            <CardContent>
              <CardHeader>{anonymous ? "Anonymous Donor" : name}</CardHeader>
              <CardMeta>
                <span className="date">
                  Joined on {new Date(created_at).toLocaleDateString()}
                </span>
              </CardMeta>
              <CardDescription textAlign="left">
                <div className={classes.admin_cardDescription}>
                  <p>
                    <strong>User ID:</strong> {userId}
                  </p>
                  <p>
                    <strong>Email (Username):</strong> {username}
                  </p>
                  <p>
                    <strong>District:</strong> {district}
                  </p>
                  <p>
                    <strong>Phone Number:</strong> {phoneNo}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong>{" "}
                    {new Date(date_of_birth).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Stellar Address:</strong> {stellar_address}
                  </p>
                  <p>
                    <strong>Type:</strong> {type}
                  </p>
                  <p>
                    <strong>No. of Donations:</strong> {no_donations}
                  </p>
                  <p>
                    <strong>Total Donated:</strong> {donated}
                  </p>
                  <p>
                    <strong>Tokens Remaining:</strong> {tokens}
                  </p>
                  <p>
                    <strong>Description:</strong> {description || "N/A"}
                  </p>
                </div>
              </CardDescription>
            </CardContent>
            <Image
              className={classes.admin_image}
              style={{ width: "200px", height: "200px" }}
              src={
                profile_image ||
                "https://react.semantic-ui.com/images/avatar/large/matthew.png"
              }
              wrapped
              ui={false}
            />

            {/* Images Section */}
            {/* <CardContent>
            <h3>Images</h3>
            <div className={classes.imagesContainer}>
              {image1 && <Image src={image1} size="small" />}
              {image2 && <Image src={image2} size="small" />}
              {image3 && <Image src={image3} size="small" />}
              {image4 && <Image src={image4} size="small" />}
              {image5 && <Image src={image5} size="small" />}
            </div>
          </CardContent> */}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDonorCmp;
