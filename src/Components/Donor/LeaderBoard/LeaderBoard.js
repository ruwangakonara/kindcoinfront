import React, {useContext} from 'react';
import { Container, Grid, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './leaderboard.css';
import { UserContext } from '../../Home/UserConext/UserContext';


function LeaderBoard({ name, type, image, rank, id, leaderboard_anonymous, anonymous_id }){

    const { user, userDetails } = useContext(UserContext);
    const donor = userDetails;

    return(
        <Container className="leaderboard-card">
            <Grid>
                <Grid.Column width={4} className="image-column">
                    <div className="image-wrapper">
                        <Image src={(image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/donor/" + image): "https://via.placeholder.com/150"} className="profile-image" circular />
                    </div>
                </Grid.Column>
                <Grid.Column width={8} className="content-column">
                    <div className="card-content">
                        <div className="card-header">{(donor._id != id) ? (!leaderboard_anonymous ? name : ("Anonymous" + anonymous_id)) : (name + "(You)")}</div>
                        <div className="card-meta">{type}</div>
                        <div className="card-description">
                            <h2 className="rank">Rank: {rank}</h2>
                        </div>
                    </div>
                </Grid.Column>
                <Grid.Column width={4} className="button-column">
                    <Button as={Link} to={(donor._id == id) ? `/donor/leaderboard/${rank}` :`/donor/leaderboard/${id}/${rank}`} basic color="green" className='view-button'>
                        Leaderboard
                    </Button>
                </Grid.Column>
            </Grid>
        </Container>
    );
}

export default LeaderBoard;
