import React, {useContext, useEffect, useState, useRef} from 'react';
import {Container, Grid, Header, Image, List, Segment, Button, Modal, Form, Icon, Label, TextArea, Checkbox} from 'semantic-ui-react';
import Navbar2 from '../../../Components/Donor/NavBar/NavBar2';
import Sidebar2 from '../../../Components/Donor/Sidebar/Sidebar2';
import './myListingPage.css';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../../Components/Home/UserConext/UserContext';
import axios from "axios";
import html2pdf from 'html2pdf.js';
import { useReactToPrint } from 'react-to-print';



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
    amount: 84654,
    tokens: 5865,
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
    ],
    doc_transac_id: "44227443424",
    doc_amount: 561,
    doc_verified: false
};

function CompletedDonationPage(){
    const { donation_id } = useParams();
    const { user, userDetails } = useContext(UserContext);
    const donor = userDetails;

    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [attestationModalOpen, setAttestationModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [editedImages, setEditedImages] = useState(dummyDonation.images);
    const [docTransacId, setDocTransacId] = useState("");
    const [editingDocTransacId, setEditingDocTransacId] = useState(false);

    const [donation, setDonation] = useState({});
    const [request, setRequest] = useState({});
    const [beneficiary, setBeneficiary] = useState({});
    const [member, setMember] = useState({});


    useEffect(() => {
        get_donation();
    }, []);

    const get_donation = async () => {
        try {
            const response = await axiosInstance.post('/donor/get_donation', { rewarded: true, _id: donation_id });
            setDonation(response.data.donation);
            setBeneficiary(response.data.beneficiary);
            setRequest(response.data.request);
            if(response.data.member){
                setMember(response.data.member);
            }
            console.log(donation)
        } catch (error) {
            console.log(error);
        }
    };

    const handleImageModalOpen = (image) => {
        setSelectedImage(image);
        setImageModalOpen(true);
    };

    const handleImageModalClose = () => {
        setImageModalOpen(false);
        setSelectedImage(null);
    };

    const handleAttestationModalOpen = () => {
        setAttestationModalOpen(true);
    };

    const handleAttestationModalClose = () => {
        setAttestationModalOpen(false);
    };

    // const handlePrint = () => {
    //     window.print();
    // };


    // const handlePDFExport = () => {
    //     // Wait a little to make sure the modal content is rendered
    //     setTimeout(() => {
    //         const modalContent = document.getElementById('attestation'); // Get modal content
    //
    //         if (!modalContent) {
    //             console.error('Modal content not found!');
    //             return;
    //         }
    //
    //         const options = {
    //             margin: 10,
    //             filename: 'attestation.pdf',
    //             html2canvas: { scale: 2 }, // Improve image rendering quality
    //             jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    //         };
    //
    //         html2pdf().from(modalContent).set(options).save(); // Export the content as PDF
    //     }, 1000); // Delay to ensure rendering
    // };
    //
    //     useEffect(() => {
    //         // Check if the modal is open and content is rendered
    //         if (attestationModalOpen) {
    //             console.log('Modal is open and ready for export!');
    //         }
    //     }, [attestationModalOpen]);

    const componentRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => {
            // Ensure we're returning a valid DOM element
            if (componentRef.current) {
                return componentRef.current;
            }
            console.error('Print ref is null');
            return null;
        },
        documentTitle: 'Donation Attestation',
        pageStyle: `
      @media print {
        body * {
          visibility: hidden;
        }
        .print-container {
          visibility: visible !important;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
      }
    `
    });

    // Prevent print if modal is not open
    const safePrint = () => {
        if (attestationModalOpen) {
            handlePrint();
        }
    };
    const handleUpdateDocTransacId = () => {
        if(donation.doc_transac_id !== "Not Entered Yet"){
            setDocTransacId(donation.doc_transac_id);

        }
        setEditingDocTransacId(true);
    };

    const handleDocTransacIdChange = (e) => {
        setDocTransacId(e.target.value);
    };

    const handleSaveDocTransacId = async (e) => {
        // Save the updated doc_transac_id
        e.preventDefault(); // Prevent default form submission
        // Perform logic to update donation details (e.g., API call)

        const data = {
            doc_transac_id: docTransacId,
            donation_id: donation._id,
        }

        console.log(data)
        const response = await axiosInstance.put('/donor/update_doc_transac_id', data);
        if (response.status === 201) {

            console.log("something")
            setDonation(response.data.donation);
            console.log(data);
            setEditingDocTransacId(false);

        }

        // dummyDonation.doc_transac_id = docTransacId
        // Implement save logic here (e.g., API call)


    };

    const [iSatisModalOpen, setIssatisModalOpen] = useState(false);
    const [newUsageSatis, setUsageSatis] = useState(donation?.donor_satisfied);

    const handleEditSatisClick = () => {
        setUsageSatis(donation?.donor_satisfied); // Populate modal with current text
        setIssatisModalOpen(true); // Open modal
    };

    const handleSatisSubmit = async () => {
        try {
                const payload = { donation_id: donation_id, satisfied: newUsageSatis };
            console.log("Sending payload:", payload);

            const response = await axiosInstance.post('/donor/satisfaction', payload);
            if (response.status === 200) {
                await get_donation() // Update text on success
                setIssatisModalOpen(false); // Close modal
            } else {
                alert("Failed to update satisfaction");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while updating satisfaction.");
        }
    };

    return (
        <div>
            <Navbar2 />
            <Grid>
                <Grid.Column width={1}>
                    <Sidebar2 />
                </Grid.Column>
                <Grid.Column width={15}>
                    <Container className="donation-page-container">
                        <Header as="h2" style={{ marginTop: "50px" }} className="page-header">Completed Donation</Header>
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
                                        <Label style={{ marginTop: '10px' }} color='green' className='not-accepted-label'>Accepted</Label>
                                        <div style={{ color: 'green' }}>
                                            <Icon name='check circle' color='green' />
                                            Verified
                                        </div>
                                        <Label style={{ marginTop: '15px' }} color='blue' className='not-accepted-label'>Tokens Transacted</Label>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <List className="donation-details">
                                            <List.Item>
                                                <List.Header>Donation Title</List.Header>
                                                {donation.title}

                                            </List.Item>

                                            <List.Item>
                                                <List.Header>Donation Description</List.Header>
                                                {donation.description}
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
                                                <List.Header>Recipient Phone</List.Header>
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
                                                    {donation.value}
                                                </List.Item>
                                            )}
                                            <List.Item>
                                                <List.Header>XLM to LKR</List.Header>
                                                {donation.xlmToLkrRate}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>KINDCOIN to XLM</List.Header>
                                                {donation.tokenToXlmRate}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Listed at</List.Header>
                                                {String(donation.created).slice(0,10) + " @ " + String(donation.created).slice(11,16)}
                                            </List.Item>
                                        </List>
                                    </Grid.Column>
                                </Grid.Row>
                                {/*<Grid.Row>*/}
                                {/*    <Grid.Column width={16}>*/}
                                {/*        <Header as="h3">Additional Images</Header>*/}
                                {/*        <div className="additional-images">*/}
                                {/*            {dummyDonation.images.map((image, index) => (*/}
                                {/*                <Image*/}
                                {/*                    key={index}*/}
                                {/*                    src={image}*/}
                                {/*                    size='small'*/}
                                {/*                    spaced*/}
                                {/*                    onClick={() => handleImageModalOpen(image)}*/}
                                {/*                    style={{ cursor: 'pointer' }}*/}
                                {/*                />*/}
                                {/*            ))}*/}
                                {/*        </div>*/}
                                {/*    </Grid.Column>*/}
                                {/*</Grid.Row>*/}
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
                                        <Grid.Column width={4} key={4}>
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
                                                        {member?.username}
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
                        {/* New Segment for Document Transaction ID */}
                        <Segment>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <Header as="h3">Document Transaction ID</Header>
                                        <p>{donation.doc_transac_id}</p>

                                        {!donation.doc_verified && (
                                            <>
                                                {editingDocTransacId ? (
                                                    <Form>
                                                        <Form.Field>
                                                            <label>Transaction ID</label>
                                                            <input
                                                                value={docTransacId}
                                                                onChange={handleDocTransacIdChange}
                                                            />
                                                        </Form.Field>
                                                        <Button color='blue'
                                                                onClick={handleSaveDocTransacId}>Save</Button>
                                                        <Button color='grey'
                                                                onClick={() => setEditingDocTransacId(false)}>Cancel</Button>
                                                    </Form>
                                                ) : (
                                                    <Button color='blue' onClick={handleUpdateDocTransacId}>Update
                                                        Transaction ID</Button>
                                                )}
                                            </>
                                        )}
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>

                        <Segment>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <Header as="h3">Amount</Header>
                                        <p>{donation.value}</p>
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Header as="h3">Tokens</Header>
                                        <Grid.Row style={{ display: 'flex', flexDirection: 'row' }}>
                                            <p>{donation.token_amount}</p>
                                            <Image src="/token.png" circular className="token-image" />
                                        </Grid.Row>
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Header as="h3">Attestation Fee</Header>
                                        <Grid.Row style={{ display: 'flex', flexDirection: 'row' }}>
                                            <p>{donation.attestation_fee}</p>
                                            <Image src="/token.png" circular className="token-image" />
                                        </Grid.Row>
                                    </Grid.Column>
                                    {donation.doc_verified ? (
                                        <h4 style={{ marginBottom: "10px", marginLeft: "12px" }}>Attestation Fee <Label style={{ marginTop: '10px' }} color='green' className='not-accepted-label'>Verified</Label>. Attestation Available</h4>
                                    ) : (
                                        <h4 style={{ marginBottom: "10px",marginLeft: "12px"  }}>Attestation Fee Verification <Label style={{ marginTop: '10px' }} color='orange' className='not-accepted-label'>Pending</Label>. Attestation Unavailable</h4>
                                    )}
                                </Grid.Row>
                            </Grid>
                        </Segment>

                        {donation.doc_verified && (
                            <Button color='blue' onClick={handleAttestationModalOpen}>Show Attestation</Button>
                        )}

                        <Segment>

                            <Grid>
                                <Grid.Row>
                                    <Header style = {{marginLeft: "10px", marginTop: "10px"}}>Donation Usage Description</Header>
                                </Grid.Row>
                                <Grid.Row>
                                    <Header
                                        style={{
                                            marginLeft: "10px",
                                            color: "#333", // Slightly dark grey for better readability
                                            fontSize: "1.2em",
                                            fontWeight: "500",
                                        }}
                                        as="h4"
                                    >
                                        {donation.usage_description}
                                    </Header>
                                </Grid.Row>
                                <Grid.Row>
                                    <Header
                                        style={{
                                            marginRight: "10px",
                                            fontStyle: "italic",
                                            color: "grey",
                                            textAlign: "right",
                                            width: "100%",
                                        }}
                                        as="h5"
                                    >
                                        updated: {String(donation.edited).slice(0, 10) + " @ " + String(donation.edited).slice(11, 16)}
                                    </Header>
                                </Grid.Row>
                                {/*<Grid.Row>*/}
                                {/*    <Button primary size='tiny' floated='right' style={{marginLeft: "10px"}}*/}
                                {/*            onClick={handleEditDescClick}>Update</Button>*/}
                                {/*</Grid.Row>*/}


                                <Grid>
                                    <Header style = {{marginTop: "10px"}}>Donation Usage Images</Header>
                                </Grid>
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
                                        src={(donation?.usage_image1 !== "https://via.placeholder.com/300")
                                            ? `http://localhost:9013/images/donation_use/${donation?.usage_image1}`
                                            : "https://via.placeholder.com/300"}
                                        size='small'
                                        className="thumbnail-image"
                                        onClick={() => handleImageModalOpen((donation?.usage_image1 !== "https://via.placeholder.com/300")
                                            ? `http://localhost:9013/images/donation_use/${donation?.usage_image1}`
                                            : "https://via.placeholder.com/300")}
                                    />
                                    <Image
                                        key={2}
                                        src={(donation?.usage_image2 !== "https://via.placeholder.com/300")
                                            ? `http://localhost:9013/images/donation_use/${donation?.usage_image2}`
                                            : "https://via.placeholder.com/300"}
                                        size='small'
                                        className="thumbnail-image"
                                        onClick={() => handleImageModalOpen((donation?.usage_image2 !== "https://via.placeholder.com/300")
                                            ? `http://localhost:9013/images/donation_use/${donation?.usage_image2}`
                                            : "https://via.placeholder.com/300")}
                                    />
                                    <Image
                                        key={3}
                                        src={(donation?.usage_image3 !== "https://via.placeholder.com/300")
                                            ? `http://localhost:9013/images/donation_use/${donation?.usage_image3}`
                                            : "https://via.placeholder.com/300"}
                                        size='small'
                                        className="thumbnail-image"
                                        onClick={() => handleImageModalOpen((donation?.usage_image3 !== "https://via.placeholder.com/300")
                                            ? `http://localhost:9013/images/donation_use/${donation?.usage_image3}`
                                            : "https://via.placeholder.com/300")}
                                    />
                                    <Image
                                        key={4}
                                        src={(donation?.usage_image4 !== "https://via.placeholder.com/300")
                                            ? `http://localhost:9013/images/donation_use/${donation?.usage_image4}`
                                            : "https://via.placeholder.com/300"}
                                        size='small'
                                        className="thumbnail-image"
                                        onClick={() => handleImageModalOpen((donation?.usage_image4 !== "https://via.placeholder.com/300")
                                            ? `http://localhost:9013/images/donation_use/${donation?.usage_image4}`
                                            : "https://via.placeholder.com/300")}
                                    />
                                    <Image
                                        key={5}
                                        src={(donation?.usage_image5 !== "https://via.placeholder.com/300")
                                            ? `http://localhost:9013/images/donation_use/${donation?.usage_image5}`
                                            : "https://via.placeholder.com/300"}
                                        size='small'
                                        className="thumbnail-image"
                                        onClick={() => handleImageModalOpen((donation?.usage_image5 !== "https://via.placeholder.com/300")
                                            ? `http://localhost:9013/images/donation_use/${donation?.usage_image5}`
                                            : "https://via.placeholder.com/300")}
                                    />
                                    {/*</Grid.Column>*/}
                                </Grid.Row>
                                {/*<Grid.Row>*/}
                                {/*    <Button primary size='tiny' floated='right' style={{marginLeft: "10px"}}*/}
                                {/*            onClick={handleEditModalOpen}>Edit</Button>*/}
                                {/*</Grid.Row>*/}

                                <Grid.Row>
                                    <Header style = {{marginLeft: "10px", marginTop: "10px"}}>Your Satisfaction with Donation Usage</Header>
                                </Grid.Row>

                                <Grid.Row>
                                    <Label
                                        color={donation.donor_satisfied ? "green" : "red"}
                                        style={{
                                            marginLeft: "10px",
                                            fontSize: "1.2em",
                                            fontWeight: "500",
                                            padding: "0.5em 1em", // For better spacing inside the label
                                        }}
                                    >
                                        {donation.donor_satisfied ? "Yes" : "No"}
                                    </Label>
                                </Grid.Row>

                                { !donation.donor_satisfied && <Grid.Row>

                                    <Header
                                        style={{
                                            marginLeft: "10px",
                                            color: "#333", // Slightly dark grey for better readability
                                            fontSize: "1.2em",
                                            fontWeight: "500",
                                        }}
                                        as="h4"
                                    >
                                        A ticket was raised to investigate donation utilization
                                    </Header>
                                </Grid.Row>}
                                <Grid.Row>
                                    <Button primary size='tiny' floated='right' style={{marginLeft: "10px"}}
                                            onClick={handleEditSatisClick}>Change</Button>
                                </Grid.Row>

                            </Grid>

                        </Segment>
                    </Container>
                </Grid.Column>
            </Grid>

            {/* Image Modal */}
            <Modal size='small' open={imageModalOpen} onClose={handleImageModalClose} className="image-modal">
                <Modal.Content image>
                    <Image src={selectedImage} centered wrapped style={{ maxWidth: '100%', maxHeight: '80vh' }} />
                </Modal.Content>
            </Modal>
            <Modal open={iSatisModalOpen} onClose={() => setIssatisModalOpen(false)}>
                <Modal.Header>Are you satisfied with the evident use of your contribution?</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Checkbox
                            // placeholder="Edit your text here..."
                            checked={newUsageSatis}
                            onChange={(e, data) => {
                                console.log("Checkbox checked state:", data.checked); // Log from `data`
                                setUsageSatis(data.checked); // Use `data.checked` instead of `e.target.checked`
                            }}
                            // style={{ minHeight: 100 }}
                        />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => setIssatisModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button positive onClick={handleSatisSubmit}>
                        Save
                    </Button>
                </Modal.Actions>
            </Modal>
            {/* Attestation Modal */}
            <Modal
                id="attestation"
                size='large'
                open={attestationModalOpen}
                onClose={handleAttestationModalClose}
            >
                <Modal.Header>Donation Attestation</Modal.Header>
                <Modal.Content>
                    <div
                        ref={componentRef}
                        className="print-container"
                        style={{
                            padding: '20px',
                            backgroundColor: 'white',
                            width: '100%',
                            maxWidth: '800px',
                            margin: '0 auto'
                        }}
                    >
                        <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                            <Image src="/charitylogo.png" size="medium" />
                        </div>
                        <p>We hereby attest that the following donation has been received:</p>
                        <Grid columns={2} divided>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header>Donor</Header>
                                    <List>
                                        <List.Item>
                                            <List.Header style={{textAlign: "left"}}>Donor Name</List.Header>
                                            {donor.name}
                                        </List.Item>
                                        <List.Item>
                                            <List.Header style={{textAlign: "left"}}>Donor Description</List.Header>
                                            {donor.description}
                                        </List.Item>
                                        <List.Item>
                                            <List.Header style={{textAlign: "left"}}>Donor Address</List.Header>
                                            {donor.address}
                                        </List.Item>
                                        <List.Item>
                                            <List.Header style={{textAlign: "left"}}>Donor Phone</List.Header>
                                            {donor.phoneNo}
                                        </List.Item>
                                        <List.Item>
                                            <List.Header style={{textAlign: "left"}}>Donor Email</List.Header>
                                            {donor.username}
                                        </List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column>
                                    <Header>Donation</Header>
                                    <List>
                                        <List.Item>
                                            <List.Header style={{textAlign: "left"}}>Donation Title</List.Header>
                                            {donation.title}
                                        </List.Item>
                                        <List.Item>
                                            <List.Header style={{textAlign: "left"}}>Donation Description</List.Header>
                                            {donation.description}
                                        </List.Item>
                                        <List.Item>
                                            <List.Header style={{textAlign: "left"}}>Donation Type</List.Header>
                                            {donation.type === 'monetary' ? 'Monetary Donation' : 'Goods Donation'}
                                        </List.Item>
                                        {donation.type === 'goods' && (
                                            <List.Item>
                                                <List.Header style={{textAlign: "left"}}>Goods List</List.Header>
                                                <List>
                                                    {donation.goods?.map((goods, index) => (
                                                        <List.Item key={index}>
                                                            {goods.item}: {goods.amount}
                                                        </List.Item>
                                                    ))}
                                                </List>
                                            </List.Item>
                                        )}
                                        <List.Item>
                                            <List.Header style={{textAlign: "left"}}>Donation Phone</List.Header>
                                            {donation.phone}
                                        </List.Item>
                                        <List.Item>
                                            <List.Header style={{textAlign: "left"}}>Amount</List.Header>
                                            {donation.value}
                                        </List.Item>
                                        <List.Item>
                                            <List.Header style={{textAlign: "left"}}>Tokens</List.Header>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                {donation.token_amount}
                                                <Image
                                                    src="/tag.png"
                                                    size="small"
                                                    style={{ marginRight: '10px' }}
                                                />
                                            </div>
                                        </List.Item>
                                        <List.Item>
                                            <List.Header style={{textAlign: "left"}}>XLM to LKR</List.Header>
                                            {donation.xlmToLkrRate}
                                        </List.Item>
                                        <List.Item>
                                            <List.Header style={{textAlign: "left"}}>KINDCOIN to XLM</List.Header>
                                            {donation.tokenToXlmRate}
                                        </List.Item>
                                    </List>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header>Beneficiary</Header>
                                    <List>
                                        <List.Item>
                                            <List.Header style={{textAlign: "left"}}>Recipient Name</List.Header>
                                            {beneficiary.name}
                                        </List.Item>
                                        <List.Item>
                                            <List.Header style={{textAlign: "left"}}>Recipient Description</List.Header>
                                            {beneficiary.description}
                                        </List.Item>
                                        <List.Item>
                                            <List.Header style={{textAlign: "left"}}>Recipient Phone</List.Header>
                                            {beneficiary.phoneNo}
                                        </List.Item>
                                        <List.Item>
                                            <List.Header style={{textAlign: "left"}}>Recipient Email</List.Header>
                                            {beneficiary.username}
                                        </List.Item>
                                        <List.Item>
                                            <List.Header style={{textAlign: "left"}}>Recipient Address</List.Header>
                                            {beneficiary.address}
                                        </List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column>
                                    <Header>Request</Header>
                                    <List>
                                        <List.Item>
                                            <List.Header style={{textAlign: "left"}}>Request Title</List.Header>
                                            {request.title}
                                        </List.Item>
                                        <List.Item>
                                            <List.Header style={{textAlign: "left"}}>Request Description</List.Header>
                                            {request.description}
                                        </List.Item>
                                        <List.Item>
                                            <List.Header style={{textAlign: "left"}}>Request Phone</List.Header>
                                            {request.phone}
                                        </List.Item>
                                        <List.Item>
                                            <List.Header style={{textAlign: "left"}}>Request Email</List.Header>
                                            {request.email}
                                        </List.Item>
                                        <List.Item>
                                            <List.Header style={{textAlign: "left"}}>Request Address</List.Header>
                                            {request.address}
                                        </List.Item>
                                    </List>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <p>Thank you for your generous contribution.</p>
                        <p>Sincerely,</p>
                        <p style={{ fontStyle: "italic" }}>KindCoin Org</p>
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='blue' onClick={safePrint}>Print Attestation</Button>
                    <Button color='grey' onClick={handleAttestationModalClose}>Close</Button>
                </Modal.Actions>
            </Modal>

        </div>
    );
};

export default CompletedDonationPage;
