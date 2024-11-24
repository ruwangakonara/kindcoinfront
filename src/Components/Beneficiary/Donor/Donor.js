import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Donor = ({ name, type, image, rank, id, anonymous, anonymous_id  }) => (
    <Card>
        <div style={{ height: '150px', overflow: 'hidden', position: 'relative' }}>
            <Image src={(image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/donor/" + image): "https://via.placeholder.com/150"} wrapped ui={false} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
        </div>
        <Card.Content>
            <Card.Header>{!anonymous ? name : ("Anonymous" + anonymous_id)}</Card.Header>
            <Card.Meta>{type}</Card.Meta>
            <Card.Description>
                {/*{verified ? (*/}
                {/*    <div style={{ display: 'flex', alignItems: 'center', color: 'green' }}>*/}
                {/*        <Icon name='check circle' color='green' />*/}
                {/*        Verified*/}
                {/*    </div>*/}
                {/*) : (*/}
                {/*    <div style={{ display: 'flex', alignItems: 'center', color: 'red' }}>*/}
                {/*        <Icon name='times circle' color='red' />*/}
                {/*        Not Verified*/}
                {/*    </div>*/}
                {/*)}*/}
                <h2 style={{fontStyle: "italic"}}>Rank: {rank}</h2>
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <div className='ui two buttons'>
                <Link to={`/beneficiary/donors/${id}`} className='ui basic green button'>
                    View Account
                </Link>
            </div>
        </Card.Content>
    </Card>
);

export default Donor;
