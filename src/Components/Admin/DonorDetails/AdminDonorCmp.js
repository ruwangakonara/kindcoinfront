import classes from "./AdminDonorCmp.module.css";
import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Image,
} from "semantic-ui-react";

const AdminDonorCmp = ({ donorDetails }) => {
  // Destructure the donor details
  const {
    user_id,
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
    <div className={classes.mainContainer}>
      <div className={classes.subContainer}>
        <Card
          className={classes.donorCardStylings}
          fluid={true}
          centered={true}
          raised
        >
          {/* Profile Image */}
          <Image
            src={
              profile_image ||
              "https://react.semantic-ui.com/images/avatar/large/matthew.png"
            }
            wrapped
            ui={false}
          />
          <CardContent>
            <CardHeader>{anonymous ? "Anonymous Donor" : name}</CardHeader>
            <CardMeta>
              <span className="date">
                Joined on {new Date(created_at).toLocaleDateString()}
              </span>
            </CardMeta>
            <CardDescription textAlign="left">
              <div className={classes.cardDescription}>
                <p>
                  <strong>User ID:</strong> {user_id}
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
  );
};

export default AdminDonorCmp;
