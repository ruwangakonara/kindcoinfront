import React, {useEffect, useState} from 'react';
import { Container, Header, Grid, List, Image, Icon, Segment, Label, Form, Button, Comment, Modal } from 'semantic-ui-react';
import Navbar from '../../../Components/Home/NavBar/NavBar';
import './leaderboard.css';
import axios from 'axios';
import {useParams} from "react-router-dom";
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

const LeaderboardPage = () => {
    const { id, rank } = useParams();

    const [donor, setDonor] = useState({});

    const [comments, setComments] = useState([
        // { name: 'Alice', comment: 'Great job, John!' },
        // { name: 'Bob', comment: 'Keep up the good work!' },
    ]);
    const [newComment, setNewComment] = useState({ name: '', body: '' });
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [achievements, setAchievements] = useState([])


    useEffect(() => {
        getDonor()
        getComments()
    }, []);

    const getDonor = async() => {

        try{
            const response = await axiosInstance.post("/get-donor", {donor_id: id})

            setDonor(response.data.donor);
            // setComments(response.data.comments);

            setAchievements(getAchievements(response.data.tokens));

        } catch (error) {
            console.error(error);
        }
    }


    const getComments = async() => {

        try{
            const response = await axiosInstance.post("/get-comments", {donor_id: id})

            setComments(response.data.comments);


        } catch (error) {
            console.error(error);
        }
    }
    // const handleCommentChange = (e, { name, value }) => {
    //     setNewComment({ ...newComment, [name]: value });
    // };
    //
    // const handleCommentSubmit = async () => {
    //     setComments([...comments, newComment]);
    //     setNewComment({ name: '', body: '' });
    //
    //     try{
    //         const response = await axiosInstance.post("/put-comment", {donor_id: donor._id, name: newComment.name, body: newComment.body});
    //         // setComments(response.data.comments);
    //     } catch (error){
    //         console.error(error);
    //     }
    //
    // };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

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
                                        {!donor?.leaderboard_anonymous ? donor?.username: "Anonymous"}
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
                            {/*<Grid.Column width={16}>*/}
                                <Header as="h3" className="images-header">Images</Header>
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
                                <Header as="h3" className="comments-header">Beneficiary Comments</Header>
                                <Comment.Group className="comments-group">
                                    {comments?.map((comment, index) => (
                                        <Comment key={index}>
                                            <Comment.Content>
                                                <div className="comment-author">
                                                    <Image
                                                        src={(comment?.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/beneficiary/" + comment?.profile_image): "https://via.placeholder.com/150"}
                                                        size="mini"
                                                        circular
                                                        className="comment-author-image"
                                                    />
                                                    <Comment.Author>{comment.name}</Comment.Author>
                                                </div>
                                                <Comment.Text>{comment.body}</Comment.Text>
                                            </Comment.Content>
                                        </Comment>
                                    ))}
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
            </Container>
        </div>
    );
};

export default LeaderboardPage;
