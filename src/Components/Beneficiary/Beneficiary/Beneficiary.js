import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Beneficiary = ({ name, type, image, verified, id }) => (
    <Card>
        <div style={{ height: '150px', overflow: 'hidden', position: 'relative' }}>
            <Image src={image} wrapped ui={false} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
        </div>
        <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Meta>{type}</Card.Meta>
            <Card.Description>
                {verified ? (
                    <div style={{ display: 'flex', alignItems: 'center', color: 'green' }}>
                        <Icon name='check circle' color='green' />
                        Verified
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', color: 'red' }}>
                        <Icon name='times circle' color='red' />
                        Not Verified
                    </div>
                )}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <div className='ui two buttons'>
                <Link to={`/donor/beneficiaries/${id}`} className='ui basic green button'>
                    View Account
                </Link>
            </div>
        </Card.Content>
    </Card>
);

export default Beneficiary;
