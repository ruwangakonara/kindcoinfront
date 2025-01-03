import React from 'react';
import { Container, Grid, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './leaderboard.css';

const LeaderBoard = ({ name, type, image, rank, id }) => (
    <Container className="leaderboard-card">
        <Grid>
            <Grid.Column width={4} className="image-column">
                <div className="image-wrapper">
                    <Image src={image} className="profile-image" circular />
                </div>
            </Grid.Column>
            <Grid.Column width={8} className="content-column">
                <div className="card-content">
                    <div className="card-header">{name}</div>
                    <div className="card-meta">{type}</div>
                    <div className="card-description">
                        <h2 className="rank">Rank: {rank}</h2>
                    </div>
                </div>
            </Grid.Column>
            <Grid.Column width={4} className="button-column">
                <Button as={Link} to={`/leaderboard/${id}`} basic color="green" className='view-button'>
                    Leaderboard
                </Button>
            </Grid.Column>
        </Grid>
    </Container>
);

export default LeaderBoard;
