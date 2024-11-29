import React, {useContext, useEffect, useState} from 'react';
import { Container, Header, Grid, List, Image, Icon, Segment, Label, Form, Button, Comment, Modal } from 'semantic-ui-react';
import Navbar from '../../../Components/Beneficiary/NavBar/NavBar';
import './leaderboard.css';
import Donatenow from "../../../Components/Donor/Donatenow/Donatenow";
import axios from "axios";
import {useParams} from "react-router-dom";
import { UserContext } from '../../../Components/Home/UserConext/UserContext';
import {Typography} from "@mui/material"


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

const BeneficiaryDonorLeaderboardPage = () => {
    const { id, rank } = useParams();

    const [donor, setDonor] = useState({});
    const { user, userDetails } = useContext(UserContext);
    const beneficiary = userDetails;

    const [comments, setComments] = useState([
        // { name: 'Alice', comment: 'Great job, John!' },
        // { name: 'Bob', comment: 'Keep up the good work!' },
    ]);
    const [newComment, setNewComment] = useState({  body: '' });
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editComment, setEditComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);

    const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
    const [deletingCommentId, setDeletingCommentId] = useState(null);

    const handleEditClick = (comment) => {
        setEditingCommentId(comment._id);
        setEditComment(comment.body);
        setIsEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
        setEditingCommentId(null);
        setEditComment('');
    };

    const handleEditCommentChange = (e) => {
        setEditComment(e.target.value);
    };

    const handleEditCommentSubmit = async () => {
        try {
            const response = await axiosInstance.put("/beneficiary/update_comment", { id: editingCommentId, body: editComment });
            setComments(response.data.comments);
            handleEditModalClose();
        } catch (error) {
            console.error(error);
        }
    };


    const handleDeleteClick = (comment) => {
        setDeletingCommentId(comment._id);
        setisDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setisDeleteModalOpen(false);
        setDeletingCommentId(null);
    };

    const handleDeleteComment = async () => {
        try {
            const response = await axiosInstance.put("/beneficiary/delete_comment", { id: deletingCommentId });
            setComments(response.data.comments);
            handleDeleteModalClose();
        } catch (error) {
            console.error(error);
        }
    };

    const [achievements, setAchievements] = useState([])

    const handleCommentChange = (e, { name, value }) => {
        setNewComment({ ...newComment, [name]: value });
    };

    const handleCommentSubmit = async () => {
        // setComments([...comments, newComment]);

        try{
            console.log(newComment.body)
            const response = await axiosInstance.post("/beneficiary/put_comment", {donor_id: donor._id, beneficiary_id: beneficiary._id, body: newComment.body});
            setNewComment({ body: '' });

            setComments(response.data.comments);
        } catch (error){
            console.error(error);
        }

    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    useEffect(() => {
        getDonor()
        // setAchievements(getAchievements(donor?.tokens))

        getComments()
    }, []);

    // useEffect(() => {
    //
    // }, []);

    const getDonor = async() => {

        try{
            const response = await axiosInstance.post("/beneficiary/get_leader_donor", {donor_id: id})

             setDonor(response.data.donor);
            console.log(donor)
            // setComments(response.data.comments);

            // if (donor && donor.tokens) {
                setAchievements(getAchievements(response.data.tokens));
            // }

            console.log(achievements)

        } catch (error) {
            console.error(error);
        }
    }


    const getComments = async() => {

        try{
            const response = await axiosInstance.post("/beneficiary/get_comments", {donor_id: id})

            setComments(response.data.comments);
    console.log(comments)

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <Navbar />
            <Container className="leaderboard-page-container">
                <Segment raised className="donor-segment">
                    <Header style={{ marginTop: '100px' }} as="h1" textAlign="center" className="leaderboard-header">Donor Leaderboard</Header>
                    {donor?.leaderboard_anonymous && (
                        <Segment color="yellow" style={{ marginTop: "20px" }}>
                            <Header as="h3" textAlign="center">
                                This donor has chosen to remain anonymous.
                                {/*They are identified by the ID: {donor.anonymous_id}.*/}
                            </Header>
                        </Segment>
                    )}
                    <Grid stackable>
                        <Grid.Row>
                            <Grid.Column width={4} textAlign="center">
                                <Image src={(donor?.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/donor/" + donor?.profile_image): "https://via.placeholder.com/150"} circular size='medium' className="profile-picture" />
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <List className="donor-info-list">
                                    <List.Item>
                                        <List.Header>Name</List.Header>
                                        {!donor?.leaderboard_anonymous ? donor?.name: ("Anonymous" + donor?.anonymous_id)}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Email</List.Header>
                                        {!donor?.leaderboard_anonymous ? donor?.username: ("Anonymous")}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Address</List.Header>
                                        {!donor?.leaderboard_anonymous ? donor?.address: "Anonymous"}
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
                                src={(donor?.image1 !== "https://via.placeholder.com/300")
                                    ? `http://localhost:9013/images/leaderboard/${donor?.image1}`
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
                                                        <a href={`/beneficiary/beneficiaries/${comment.beneficiary_id}`}>{comment.name}</a>
                                                    </Comment.Author>
                                                </div>
                                                <Comment.Text>{comment.body}</Comment.Text>
                                                {comment.beneficiary_id === beneficiary._id && (
                                                    <Button
                                                        size='mini'
                                                        icon='edit'
                                                        content='Edit'
                                                        onClick={() => handleEditClick(comment)}
                                                    />

                                                )}
                                                {comment.beneficiary_id === beneficiary._id && (
                                                    <Button
                                                        size='mini'
                                                        icon='delete'
                                                        content='Delete'
                                                        color= 'red'
                                                        onClick={() => handleDeleteClick(comment)}
                                                    />

                                                )}
                                            </Comment.Content>
                                        </Comment>
                                    ))}
                                    <Form reply>
                                        <Form.TextArea
                                            label="Comment"
                                            name="body"
                                            value={newComment.body}
                                            onChange={handleCommentChange}
                                            className="comment-textarea"
                                        />
                                        <Button content='Add Comment' labelPosition='left' icon='edit' primary onClick={handleCommentSubmit} />
                                    </Form>
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
                <Modal open={isEditModalOpen} onClose={handleEditModalClose} size='small'>
                    <Modal.Header>Edit Comment</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.TextArea value={editComment} onChange={handleEditCommentChange} />
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='blue' onClick={handleEditCommentSubmit}>Save</Button>
                        <Button color='grey' onClick={handleEditModalClose}>Cancel</Button>
                    </Modal.Actions>
                </Modal>
                <Modal open={isDeleteModalOpen} onClose={handleDeleteModalClose} size='small'>
                    <Modal.Header>Delete Comment</Modal.Header>
                    <Modal.Content>
                        {/*<Form>*/}
                        {/*    <Form.TextArea value={editComment} onChange={handleEditCommentChange} />*/}
                        {/*</Form>*/}
                        <Header>Are you sure you want to delete the comment?</Header>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' onClick={handleDeleteComment}>Delete</Button>
                        <Button color='grey' onClick={handleDeleteModalClose}>Cancel</Button>
                    </Modal.Actions>
                </Modal>
            </Container>
            <Donatenow/>
        </div>
    );
};

export default BeneficiaryDonorLeaderboardPage;
