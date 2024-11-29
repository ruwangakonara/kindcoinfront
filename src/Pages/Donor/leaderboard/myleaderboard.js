import React, {useContext, useEffect, useState} from 'react';
import { Container, Header, Grid, List, Image, Icon, Segment, Label, Form, Button, Comment, Modal } from 'semantic-ui-react';
import Navbar2 from '../../../Components/Donor/NavBar/NavBar2';
import './leaderboard.css';
import Donatenow from "../../../Components/Donor/Donatenow/Donatenow";
import axios from "axios";
import { UserContext } from '../../../Components/Home/UserConext/UserContext';
import {useParams} from "react-router-dom";
import {Typography} from "@mui/material";


const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});



const donoro = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Charity Lane, Kindness City, CA',
    type: 'Individual',
    profilePicture: 'https://via.placeholder.com/300',
    raisedAmount: '$1,200,000',
    tokensEarned: 15000000,
    description: 'Generous donor helping various causes.',
    numberOfDonations: 20,
    rank: 1,
    images: [
        'https://via.placeholder.com/300x300',
        'https://via.placeholder.com/300x300',
        'https://via.placeholder.com/300x300',
        'https://via.placeholder.com/300x300'
    ]
};

const getAchievements = (tokens) => {
    const achievements = [];
    if (tokens >= 10000) {
        achievements.push({ icon: 'star', color: 'yellow', name: 'Bronze Star' });
    }
    if (tokens >= 100000) {
        achievements.push({ icon: 'star', color: 'grey', name: 'Silver Star' });
    }
    if (tokens >= 1000000) {
        achievements.push({ icon: 'star', color: 'yellow', name: 'Gold Star' });
    }
    if (tokens >= 10000000) {
        achievements.push({ icon: 'trophy', color: 'red', name: 'Platinum Trophy' });
    }
    return achievements;
};

const MyLeaderboardPage = () => {

    const { rank } = useParams();

    const { user, userDetails, setUserDetails } = useContext(UserContext);
    var donor = userDetails;

    // console.
    const [comments, setComments] = useState([]);
    // const [newComment, setNewComment] = useState({ name: '', comment: '' });
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const [editedDetails, setEditedDetails] = useState({});
    const [selectedFiles, setSelectedFiles] = useState({
        image1: null,
        image2: null,
        image3: null,
        image4:null,
        image5:null

    });

    const handleEditModalOpen = () => {
        setEditModalOpen(true);
        setEditedDetails({
            image1: donor.image1,
            image2: donor.image2,
            image3: donor.image3,
            image4: donor.image4,
            image5: donor.image5,
        })
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
    };
    const handleEditFormSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        // Perform logic to update donation details (e.g., API call)
        // console.log('Updated Images:', editedImages);
        const data = new FormData();
        Object.keys(selectedFiles).forEach((key) => {
            if (selectedFiles[key]) {
                data.append(key, selectedFiles[key]);
            }
        });
        data.append('id', donor._id);
        data.append('user_id', user._id);
        try {
            const response =  await axiosInstance.put('/donor/update_leaderboard_image', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // getDonor()

            const mdonor = response.data.donor;

            setUserDetails(mdonor)
            donor = mdonor

            setSelectedFiles({
                image1: null,
                image2: null,
                image3: null,
                image4: null,
                image5: null,
            })
            setEditModalOpen(false);

        } catch (error) {
            console.error('Error updating donation:', error);
        }

    };

    const [achievements, setAchievements] = useState([])

    // const handleCommentChange = (e, { name, value }) => {
    //     setNewComment({ ...newComment, [name]: value });
    // };
    //
    // const handleCommentSubmit = () => {
    //     setComments([...comments, newComment]);
    //     setNewComment({ name: '', comment: '' });
    // };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setSelectedFiles({ ...selectedFiles, [fieldName]: file });
            setEditedDetails({ ...editedDetails, [fieldName]: previewUrl });
        }
    };


    // const handleAddImage = () => {
    //     if (newImageUrl.trim() !== '') {
    //         const updatedImages = [...donor.images, newImageUrl];
    //         donor.images = updatedImages;
    //         setNewImageUrl('');
    //     }
    // };
    //
    // const handleRemoveImage = (index) => {
    //     const updatedImages = [...donor.images];
    //     updatedImages.splice(index, 1);
    //     donor.images = updatedImages;
    // };

    useEffect(() => {
        getComments()
    }, []);

    const getComments = async() => {

        try{
            const response = await axiosInstance.post("/donor/get_comments", {donor_id: donor._id})

            setComments(response.data.comments);
            setAchievements(getAchievements(donor.tokens));

            console.log(comments)

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <Navbar2 />
            <Container className="leaderboard-page-container">
                <Segment raised className="donor-segment">
                    <Header style={{ marginTop: '100px' }} as="h1" textAlign="center" className="leaderboard-header">Donor Leaderboard</Header>
                    <Grid stackable>
                        <Grid.Row>
                            <Grid.Column width={4} textAlign="center">
                                <Image src={(donor?.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/donor/" + donor?.profile_image): "https://via.placeholder.com/150"} circular size='medium' className="profile-picture" />
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <List className="donor-info-list">
                                    <List.Item>
                                        <List.Header>Name</List.Header>
                                        {donor?.name}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Email</List.Header>
                                        {donor?.username}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Address</List.Header>
                                        {donor?.address}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Type</List.Header>
                                        {donor?.type}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Rank</List.Header>
                                        {/*#{donor.rank}*/}
                                        {rank}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Number of Donations</List.Header>
                                        {donor?.no_donations}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Donated Amount</List.Header>
                                        {donor?.donated}
                                    </List.Item>
                                    <List.Item>
                                        <Typography>
                                            <List.Header style={{ display: 'flex', alignItems: 'center' }}>
                                                KINDCOIN Earned
                                                <span style={{ marginLeft: '0.5rem' }}>
                <Image centered rounded size="small" src="/tag.png" />
            </span>
                                            </List.Header>
                                        </Typography>
                                        {donor?.tokens}
                                    </List.Item>

                                </List>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Header as="h3" className="achievements-header">Achievements</Header>
                                <List horizontal className="achievements-list">
                                    {achievements.map((achievement, index) => (
                                        <List.Item key={index}>
                                            <Label
                                                color={achievement.color}
                                                size="large"
                                                image
                                            >
                                                <Icon name={achievement.icon} />
                                                {achievement.name}
                                            </Label>
                                        </List.Item>
                                    ))}
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Header as="h3" className="description-header">Description</Header>
                                <p className="donor-description">{donor?.description}</p>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Header as="h3" className="images-header">Images</Header>
                            </Grid.Column>
                        </Grid.Row>

                                    <Grid.Row>

                                        {/*<div className="images-grid">*/}
                                        {/*    {donor.images.map((image, index) => (*/}
                                        {/*        <Image*/}
                                        {/*            key={index}*/}
                                        {/*            src={image}*/}
                                        {/*            size='small'*/}
                                        {/*            className="thumbnail-image"*/}
                                        {/*            onClick={() => handleImageClick(image)}*/}
                                        {/*        />*/}
                                        {/*    ))}*/}
                                        {/*</div>*/}
                                        <Image
                                            key={1}
                                            src={(donor.image1 !== "https://via.placeholder.com/300")
                                                ? `http://localhost:9013/images/leaderboard/${donor.image1}`
                                                : "https://via.placeholder.com/300"}
                                            size='small'
                                            className="thumbnail-image"
                                            onClick={(e) => handleImageClick(e.target.src)}
                                        />
                                        <Image
                                            key={2}
                                            src={(donor?.image2 !== "https://via.placeholder.com/300")
                                                ? `http://localhost:9013/images/leaderboard/${donor?.image2}`
                                                : "https://via.placeholder.com/300"}
                                            size='small'
                                            className="thumbnail-image"
                                            onClick={(e) => handleImageClick(e.target.src)}
                                        />
                                        <Image
                                            key={3}
                                            src={(donor?.image3 !== "https://via.placeholder.com/300")
                                                ? `http://localhost:9013/images/leaderboard/${donor?.image3}`
                                                : "https://via.placeholder.com/300"}
                                            size='small'
                                            className="thumbnail-image"
                                            onClick={(e) => handleImageClick(e.target.src)}
                                        />
                                        <Image
                                            key={4}
                                            src={(donor?.image4 !== "https://via.placeholder.com/300")
                                                ? `http://localhost:9013/images/leaderboard/${donor?.image4}`
                                                : "https://via.placeholder.com/300"}
                                            size='small'
                                            className="thumbnail-image"
                                            onClick={(e) => handleImageClick(e.target.src)}
                                        />
                                        <Image
                                            key={5}
                                            src={(donor?.image5 !== "https://via.placeholder.com/300")
                                                ? `http://localhost:9013/images/leaderboard/${donor?.image5}`
                                                : "https://via.placeholder.com/300"}
                                            size='small'
                                            className="thumbnail-image"
                                            onClick={(e) => handleImageClick(e.target.src)}
                                        />
                                        {/*</Grid.Column>*/}
                                    </Grid.Row>
                        <Grid.Row>
                            <Button primary size='tiny' floated='right'
                                    onClick={handleEditModalOpen}>Edit</Button>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Header as="h3" className="comments-header">Comments</Header>
                                <Comment.Group className="comments-group">
                                    {comments.map((comment, index) => (
                                        <Comment key={index}>
                                            <Comment.Content>
                                                <div className="comment-author">
                                                    <Image
                                                        src={comment?.profile_image !== "https://via.placeholder.com/150"
                                                            ? `http://localhost:9013/images/profileimages/beneficiary/${comment?.profile_image}`
                                                            : "https://via.placeholder.com/150"}
                                                        size="mini"
                                                        circular
                                                        className="comment-author-image"
                                                    />
                                                    <Comment.Author>
                                                        <a href={`/donor/beneficiaries/${comment.beneficiary_id}`}>{comment.name}</a>
                                                    </Comment.Author>
                                                </div>
                                                <Comment.Text>{comment.body}</Comment.Text>
                                                {/*{comment.beneficiary_id === beneficiary._id && (*/}
                                                {/*    <Button*/}
                                                {/*        size='mini'*/}
                                                {/*        icon='edit'*/}
                                                {/*        content='Edit'*/}
                                                {/*        onClick={() => handleEditClick(comment)}*/}
                                                {/*    />*/}

                                                {/*)}*/}
                                                {/*{comment.beneficiary_id === beneficiary._id && (*/}
                                                {/*    <Button*/}
                                                {/*        size='mini'*/}
                                                {/*        icon='delete'*/}
                                                {/*        content='Delete'*/}
                                                {/*        color= 'red'*/}
                                                {/*        onClick={() => handleDeleteClick(comment)}*/}
                                                {/*    />*/}

                                                {/*)}*/}
                                            </Comment.Content>
                                        </Comment>
                                    ))}
                                    {/*<Form reply>*/}
                                    {/*    <Form.TextArea*/}
                                    {/*        label="Comment"*/}
                                    {/*        name="body"*/}
                                    {/*        value={newComment.body}*/}
                                    {/*        onChange={handleCommentChange}*/}
                                    {/*        className="comment-textarea"*/}
                                    {/*    />*/}
                                    {/*    <Button content='Add Comment' labelPosition='left' icon='edit' primary onClick={handleCommentSubmit} />*/}
                                    {/*</Form>*/}
                                </Comment.Group>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Modal open={isModalOpen} onClose={handleCloseModal} size='large' centered={false}>
                    <Modal.Content image>
                        <Image src={selectedImage} wrapped fluid />
                    </Modal.Content>
                </Modal>
                <Modal size='tiny' open={editModalOpen} onClose={handleEditModalClose}>
                    <Modal.Header>Edit Leaderboard Images</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={handleEditFormSubmit}>
                            {/*<Form.Field>*/}
                            {/*    <label>Upload New Image</label>*/}
                            {/*    <input type="file" accept="image/*" onChange={handleAddImage} />*/}
                            {/*</Form.Field>*/}
                            <Form.Field>
                                <label>Current Images</label>
                                {/*<div className="additional-images">*/}
                                {/*    {editedImages.map((image, index) => (*/}
                                {/*        <div key={index} style={{ display: 'inline-block', position: 'relative' }}>*/}
                                {/*            <Image src={image} size='small' spaced />*/}
                                {/*            <Button*/}
                                {/*                icon='trash'*/}
                                {/*                negative*/}
                                {/*                onClick={() => handleRemoveImage(index)}*/}
                                {/*                style={{ position: 'absolute', top: 0, right: 0 }}*/}
                                {/*                type='button'*/}
                                {/*            />*/}
                                {/*        </div>*/}
                                {/*    ))}*/}
                                {/*</div>*/}
                                <Grid>
                                    <Grid.Column width={4}>
                                        <Image
                                            src={selectedFiles.image1
                                                ? editedDetails.image1
                                                : editedDetails.image1 !== "https://via.placeholder.com/300"
                                                    ? `http://localhost:9013/images/leaderboard/${editedDetails.image1}`
                                                    : "https://via.placeholder.com/300"
                                            }
                                            className="proof-image"
                                        />
                                        <Button
                                            as="label"
                                            htmlFor="image1Upload"
                                            icon="upload"
                                            content="Change Image 1"
                                        />
                                        <input
                                            type="file"
                                            id="image1Upload"
                                            accept="image/*"
                                            hidden
                                            onChange={(e) => handleFileChange(e, 'image1')}
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Image
                                            src={selectedFiles.image2
                                                ? editedDetails.image2
                                                : editedDetails.image2 !== "https://via.placeholder.com/300"
                                                    ? `http://localhost:9013/images/leaderboard/${editedDetails.image2}`
                                                    : "https://via.placeholder.com/300"
                                            }
                                            className="proof-image"
                                        />
                                        <Button
                                            as="label"
                                            htmlFor="image2Upload"
                                            icon="upload"
                                            content="Change Image 2"
                                        />
                                        <input
                                            type="file"
                                            id="image2Upload"
                                            accept="image/*"
                                            hidden
                                            onChange={(e) => handleFileChange(e, 'image2')}
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Image
                                            src={selectedFiles.image3
                                                ? editedDetails.image3
                                                : editedDetails.image3 !== "https://via.placeholder.com/300"
                                                    ? `http://localhost:9013/images/leaderboard/${editedDetails.image3}`
                                                    : "https://via.placeholder.com/300"
                                            }
                                            className="proof-image"
                                        />
                                        <Button
                                            as="label"
                                            htmlFor="image3Upload"
                                            icon="upload"
                                            content="Change Image 3"
                                        />
                                        <input
                                            type="file"
                                            id="image3Upload"
                                            accept="image/*"
                                            hidden
                                            onChange={(e) => handleFileChange(e, 'image3')}
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Image
                                            src={selectedFiles.image4
                                                ? editedDetails.image4
                                                : editedDetails.image4 !== "https://via.placeholder.com/300"
                                                    ? `http://localhost:9013/images/leaderboard/${editedDetails.image4}`
                                                    : "https://via.placeholder.com/300"
                                            }
                                            className="proof-image"
                                        />
                                        <Button
                                            as="label"
                                            htmlFor="image4Upload"
                                            icon="upload"
                                            content="Change Image 4"
                                        />
                                        <input
                                            type="file"
                                            id="image4Upload"
                                            accept="image/*"
                                            hidden
                                            onChange={(e) => handleFileChange(e, 'image4')}
                                        />
                                    </Grid.Column>
                                    <Grid.Row>
                                        <Grid.Column width={4}>

                                        <Image
                                            src={selectedFiles.image5
                                                ? editedDetails.image5
                                                : editedDetails.image5 !== "https://via.placeholder.com/300"
                                                    ? `http://localhost:9013/images/leaderboard/${editedDetails.image5}`
                                                    : "https://via.placeholder.com/300"
                                            }
                                            className="proof-image"
                                        />
                                        <Button
                                            as="label"
                                            htmlFor="image5Upload"
                                            icon="upload"
                                            content="Change Image 5"
                                        />
                                        <input
                                            type="file"
                                            id="image5Upload"
                                            accept="image/*"
                                            hidden
                                            onChange={(e) => handleFileChange(e, 'image')}
                                        />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Form.Field>
                            <Button type='submit'>Save</Button>
                        </Form>
                    </Modal.Content>
                </Modal>
            </Container>
            <Donatenow/>
        </div>
    );
};

export default MyLeaderboardPage;
