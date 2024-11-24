import React, {useContext, useEffect, useState} from 'react';
import {Container, Grid, Header, Image, List, Segment, Button, Modal, Form, Icon, Label} from 'semantic-ui-react';
import Navbar2 from '../../../Components/Donor/NavBar/NavBar2';
import Sidebar2 from '../../../Components/Donor/Sidebar/Sidebar2';
import './myListingPage.css';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../../Components/Home/UserConext/UserContext';
import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

const dummyDonation = {
    donorName: 'John Doe',
    donorProfilePic: 'https://via.placeholder.com/150',
    recipientName: 'Charity Org',
    recipientProfilePic: 'https://via.placeholder.com/150',
    donationType: 'goods',
    donationTitle: 'Winter Clothes Donation',
    donationDescription: 'This is a donation for winter clothes including jackets, sweaters, and gloves.',
    goodsList: [
        { item: 'Clothes', amount: '50 pieces' },
        { item: 'Books', amount: '30 pieces' },
        { item: 'Toys', amount: '20 pieces' }
    ],
    moneyAmount: '',
    requestTitle: 'Request for Winter Clothes',
    requestDescription: 'We are in need of winter clothes for the upcoming cold season. Your help will be greatly appreciated.',
    recipientPhone: '123-456-7890',
    donationPhone: '987-654-3210',
    verified: false,
    images: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150'
    ]
};

function OnGoingDonationPage(){
    const { donation_id } = useParams();
    const { user, userDetails } = useContext(UserContext);
    const donor = userDetails;

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    // const [editedImages, setEditedImages] = useState(null);
    const [editedDetails, setEditedDetails] = useState({});

    const [donation, setDonation] = useState({});
    const [request, setRequest] = useState({});
    const [beneficiary, setBeneficiary] = useState({});
    const [member, setMember] = useState({});

    const [selectedFiles, setSelectedFiles] = useState({
        image1: null,
        image2: null,
        image3: null,
        certificate_image: null,
    });

    useEffect(() => {
        get_donation();
    }, []);

    const get_donation = async () => {
        try {
            const response = await axiosInstance.post('/donor/get_donation', { accepted: true, _id: donation_id });
            setDonation(response.data.donation);
            setBeneficiary(response.data.beneficiary);
            setRequest(response.data.request);
            if(response.data.member){
                setMember(response.data.member);
            }
            console.log(beneficiary)
        } catch (error) {
            console.log(error);
        }
    };

    // Handle opening and closing of edit modal
    const handleEditModalOpen = () => {
        setEditModalOpen(true);
        setEditedDetails({
            image1: donation.image1,
            image2: donation.image2,
            image3: donation.image3,
            image4: donation.image4,
        })
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
    };

    // Handle opening and closing of image modal
    const handleImageModalOpen = (image) => {
        setSelectedImage(image);
        setImageModalOpen(true);
    };

    const handleImageModalClose = () => {
        setImageModalOpen(false);
        setSelectedImage(null);
    };

    // Handle form submission for editing donation details
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
        data.append('donation_id', donation_id);
        data.append('user_id', user._id);
        try {
            await axiosInstance.put('/donor/update_donation_image', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            get_donation()
            setSelectedFiles({
                image1: null,
                image2: null,
                image3: null,
                image4: null,
            })
            setEditModalOpen(false);

        } catch (error) {
            console.error('Error updating donation:', error);
        }

    };

    // Handle adding a new image
    // const handleAddImage = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setEditedImages([...editedImages, reader.result]);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setSelectedFiles({ ...selectedFiles, [fieldName]: file });
            setEditedDetails({ ...editedDetails, [fieldName]: previewUrl });
        }
    };

    // Handle removing an image
    // const handleRemoveImage = (index) => {
    //     const newImages = [...editedImages];
    //     newImages.splice(index, 1);
    //     setEditedImages(newImages);
    // };

    return (
        <div>
            <Navbar2 />
            <Grid>
                <Grid.Column width={1}>
                    <Sidebar2 />
                </Grid.Column>
                <Grid.Column width={15}>
                    <Container className="donation-page-container">
                        <Header as="h2" style = {{marginTop: "50px"}} className="page-header">Ongoing Donation</Header>
                        <Segment raised>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={8} textAlign="center">
                                        <Image src={(donor.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/donor/" + donor.profile_image): "https://via.placeholder.com/150"} circular className="profile-picture" />
                                        <Header as="h3" className="image-label">Donor: {donor.name}</Header>
                                    </Grid.Column>
                                    <Grid.Column width={8} textAlign="center">
                                        <Image src={(beneficiary?.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/beneficiary/" + beneficiary?.profile_image): "https://via.placeholder.com/150"} circular className="profile-picture" />
                                        <Header as="h3" className="image-label">Recipient: <a href={`http://localhost:3000/donor/beneficiaries/${beneficiary?._id}`}>{beneficiary?.name}</a></Header>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <List className="donation-details">
                                            <List.Item>
                                                <List.Header>Donation Title</List.Header>
                                                {donation.title}
                                                <div style={{textAlign: "right", marginBottom: "5px"}}>
                                                    {!donation.verified && (
                                                        <Label color='red' className='status-label'>
                                                            <Icon name='warning'/> Not Verified
                                                        </Label>
                                                    )}

                                                </div>
                                                {!donation.verified && request.type === "monetary" && (
                                                    <Button primary size='tiny' floated='right'
                                                            onClick={handleEditModalOpen}>Edit</Button>
                                                )}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Request Title</List.Header>
                                                {request.open ?
                                                    <a href={`http://localhost:3000/donor/open-requests/${request?._id}`}>{request?.title}</a>
                                                    :
                                                    <a href={`http://localhost:3000/donor/closed-requests/${request?._id}`}>{request?.title}</a>
                                                }
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Request Description</List.Header>
                                                {request?.description}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Recipient(Request) Phone</List.Header>
                                                {request?.phone}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Donation Phone</List.Header>
                                                {donation?.phone}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Donation Type</List.Header>
                                                {donation.type === 'monetary' ? 'Monetary Donation' : 'Goods Donation'}
                                            </List.Item>
                                            {donation.type === 'goods' && (
                                                <List.Item>
                                                    <List.Header>Goods List</List.Header>
                                                    <List>
                                                        {donation.goods.map((goods, index) => (
                                                            <List.Item key={index}>{goods.item}: {goods.amount}</List.Item>
                                                        ))}
                                                    </List>
                                                </List.Item>
                                            )}
                                            {donation.type === 'monetary' && (
                                                <List.Item>
                                                    <List.Header>Amount</List.Header>
                                                    {
                                                        (donation.type === 'monetary') ?(
                                                            donation.value
                                                        ) : (
                                                            "Pending: Upon Transaction"
                                                        )
                                                    }
                                                </List.Item>
                                            )}
                                        </List>
                                    </Grid.Column>
                                </Grid.Row>
                                {donation.type === "monetary" && (
                                    <Grid.Row>

                                        <Grid.Column width={4} key={1}>

                                            <Image
                                                src={(donation?.image1 !== "https://via.placeholder.com/300")
                                                    ? `http://localhost:9013/images/donation_proof/${donation?.image1}`
                                                    : "https://via.placeholder.com/300"}
                                                className="proof-image"
                                                onClick={() => handleImageModalOpen((donation?.image1 !== "https://via.placeholder.com/300")
                                                    ? `http://localhost:9013/images/donation_proof/${donation?.image1}`
                                                    : "https://via.placeholder.com/300")}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </Grid.Column>
                                        <Grid.Column width={4} key={2}>
                                            <Image
                                                src={(donation?.image2 !== "https://via.placeholder.com/300")
                                                    ? `http://localhost:9013/images/donation_proof/${donation?.image2}`
                                                    : "https://via.placeholder.com/300"}
                                                className="proof-image"
                                                onClick={() => handleImageModalOpen((donation?.image2 !== "https://via.placeholder.com/300")
                                                    ? `http://localhost:9013/images/donation_proof/${donation?.image2}`
                                                    : "https://via.placeholder.com/300")}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </Grid.Column>
                                        <Grid.Column width={4} key={3}>
                                            <Image
                                                src={(donation?.image3 !== "https://via.placeholder.com/300")
                                                    ? `http://localhost:9013/images/donation_proof/${donation?.image3}`
                                                    : "https://via.placeholder.com/300"}
                                                className="proof-image"
                                                onClick={() => handleImageModalOpen((donation?.image3 !== "https://via.placeholder.com/300")
                                                    ? `http://localhost:9013/images/donation_proof/${donation?.image3}`
                                                    : "https://via.placeholder.com/300")}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </Grid.Column>
                                        <Grid.Column width={4} key={3}>
                                            <Image
                                                src={(donation?.image4 !== "https://via.placeholder.com/300")
                                                    ? `http://localhost:9013/images/donation_proof/${donation?.image4}`
                                                    : "https://via.placeholder.com/300"}
                                                className="proof-image"
                                                onClick={() => handleImageModalOpen((donation?.image4 !== "https://via.placeholder.com/300")
                                                    ? `http://localhost:9013/images/donation_proof/${donation?.image4}`
                                                    : "https://via.placeholder.com/300")}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                )}

                            </Grid>
                        </Segment>
                        {(donation.type === "goods") &&

                            <Segment raised>
                                {donation.member_id && (
                                    <Grid>

                                        <Grid.Row>
                                            <Grid.Column width={16}>
                                                <List className="donation-details">
                                                    <Grid.Column width={8} textAlign="center">
                                                        <Image src={(member.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/member/" + member.profile_image): "https://via.placeholder.com/150"} circular className="profile-picture" />
                                                    </Grid.Column>
                                                    <List.Item>
                                                        <List.Header>Member Name</List.Header>
                                                        {member?.name}
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Header>Member Phone</List.Header>
                                                        {member?.phone}
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Header>Member Email</List.Header>
                                                        {member?.email}
                                                    </List.Item>

                                                </List>
                                            </Grid.Column>
                                        </Grid.Row>


                                    </Grid>
                                    )}
                                {!donation.member_id && (
                                    <Grid>

                                        <Grid.Row>
                                            <Grid.Column width={16}>
                                                <List className="donation-details">
                                                    <List.Item>
                                                        <List.Header>Member</List.Header>
                                                        Not Assigned Yet
                                                    </List.Item>

                                                </List>
                                            </Grid.Column>
                                        </Grid.Row>


                                    </Grid>
                                )}
                            </Segment>

                        }
                    </Container>
                </Grid.Column>
            </Grid>

            {/* Image Modal */}
            <Modal size='small' open={imageModalOpen} onClose={handleImageModalClose} className="image-modal">
                <Modal.Content image>
                    <Image src={selectedImage} centered wrapped style={{ maxWidth: '100%', maxHeight: '80vh' }} />
                </Modal.Content>
            </Modal>

            {/* Edit Modal */}
            <Modal size='tiny' open={editModalOpen} onClose={handleEditModalClose}>
                <Modal.Header>Edit Donation Images</Modal.Header>
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
                                                ? `http://localhost:9013/images/donation_proof/${editedDetails.image1}`
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
                                                ? `http://localhost:9013/images/donation_proof/${editedDetails.image2}`
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
                                                ? `http://localhost:9013/images/donation_proof/${editedDetails.image3}`
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
                                                ? `http://localhost:9013/images/donation_proof/${editedDetails.image4}`
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
                            </Grid>
                        </Form.Field>
                        <Button type='submit'>Save</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        </div>
    );
}

export default OnGoingDonationPage;
