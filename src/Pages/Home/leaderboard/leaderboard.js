import React, { useState } from 'react';
import { Container, Header, Grid, List, Image, Icon, Segment, Label, Form, Button, Comment, Modal } from 'semantic-ui-react';
import Navbar from '../../../Components/Home/NavBar/NavBar';
import './leaderboard.css';

const donor = {
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
    const [comments, setComments] = useState([
        { name: 'Alice', comment: 'Great job, John!' },
        { name: 'Bob', comment: 'Keep up the good work!' },
    ]);
    const [newComment, setNewComment] = useState({ name: '', comment: '' });
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const achievements = getAchievements(donor.tokensEarned);

    const handleCommentChange = (e, { name, value }) => {
        setNewComment({ ...newComment, [name]: value });
    };

    const handleCommentSubmit = () => {
        setComments([...comments, newComment]);
        setNewComment({ name: '', comment: '' });
    };

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
                    <Grid stackable>
                        <Grid.Row>
                            <Grid.Column width={4} textAlign="center">
                                <Image src={donor.profilePicture} circular size='medium' className="profile-picture" />
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <List className="donor-info-list">
                                    <List.Item>
                                        <List.Header>Name</List.Header>
                                        {donor.name}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Email</List.Header>
                                        {donor.email}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Address</List.Header>
                                        {donor.address}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Type</List.Header>
                                        {donor.type}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Rank</List.Header>
                                        #{donor.rank}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Number of Donations</List.Header>
                                        {donor.numberOfDonations}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Donated Amount</List.Header>
                                        {donor.raisedAmount}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Tokens Earned</List.Header>
                                        {donor.tokensEarned}
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
                                <p className="donor-description">{donor.description}</p>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Header as="h3" className="images-header">Images</Header>
                                <div className="images-grid">
                                    {donor.images.map((image, index) => (
                                        <Image
                                            key={index}
                                            src={image}
                                            size='small'
                                            className="thumbnail-image"
                                            onClick={() => handleImageClick(image)}
                                        />
                                    ))}
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Header as="h3" className="comments-header">Comments</Header>
                                <Comment.Group className="comments-group">
                                    {comments.map((comment, index) => (
                                        <Comment key={index}>
                                            <Comment.Content>
                                                <Comment.Author>{comment.name}</Comment.Author>
                                                <Comment.Text>{comment.comment}</Comment.Text>
                                            </Comment.Content>
                                        </Comment>
                                    ))}
                                    <Form reply>
                                        <Form.Input
                                            label="Name"
                                            name="name"
                                            value={newComment.name}
                                            onChange={handleCommentChange}
                                            className="comment-input"
                                        />
                                        <Form.TextArea
                                            label="Comment"
                                            name="comment"
                                            value={newComment.comment}
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
            </Container>
        </div>
    );
};

export default LeaderboardPage;
