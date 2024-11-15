import React from 'react'
import { Button, Grid, Header, Segment, Image, Container, Divider } from 'semantic-ui-react'

export default function About() {
    <p>My First Paragraph</p>
    return (
        <div>
            <Divider
                as="h4"
                className="header"
                horizontal
                style={{ margin: "3em 0em", textTransform: "uppercase" }}
            >
                <a href="#About Our Platform">About Our Platform</a>
            </Divider>
            <Segment style={{ padding: "8em 0em" }} vertical>
                <Grid container stackable verticalAlign="middle">
                    <Grid.Row>
                        <Grid.Column width={8}>
                            {/* <Divider
                as="h4"
                className="header"
                horizontal
                style={{ margin: "3em 0em", textTransform: "uppercase" }}
              >
                <a href="#root">Case Studies</a>
              </Divider> */}
                            <Header as="h3" style={{ fontSize: "2em" }}>
                                How Can You Interact With Our Platform?
                            </Header>
                            <p style={{ fontSize: "1.33em" }}>
                                You Can Interact With Our Platform as a Person/Organization in Need of Help, An Organisation Looking to Provide Help, Or a generous individual.
                                {/* <br/>
                <Header as="h3" style={{ fontSize: "1em" }}>
                  Who is a Person in Need ?
                </Header>
                </p>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  We Make Bananas That Can Dance
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  Yes that's right, you thought it was the stuff of dreams, but even
                  bananas can be bioengineered.
                </p> */}
                            </p>
                        </Grid.Column>
                        <Grid.Column floated="right" width={6}>
                            <Image
                                // bordered
                                rounded
                                size="large"
                                src="https://cdn.pixabay.com/photo/2016/03/31/22/02/children-1296800_960_720.png"
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

            <Segment style={{ padding: "0em" }} vertical>
                <Grid celled="internally" columns="equal" stackable>
                    <Grid.Row textAlign="center">
                        <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
                            <Header as="h3" style={{ fontSize: "2em" }}>
                                "A Person In Need"
                            </Header>
                            <br />
                            <p style={{ fontSize: "1.33em" }}>
                                When You Register Yourself On Our Platform as A Person/Organization In Need, It means That You are In Need Of Financial Assistance or Physical Goods and Would Like to Receive a Donation for The Same.
                            </p>
                        </Grid.Column>
                        <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
                            <Header as="h3" style={{ fontSize: "2em" }}>
                                "An Organisation Looking To Provide Help, or a Generous Individual"
                            </Header>
                            <p style={{ fontSize: "1.33em" }}>
                                {/* <Image avatar src="/images/avatar/large/nan.jpg" /> */}
                                {/* <b>Nan</b> Chief Fun Officer Acme Toys */}
                                When You Register Yourself on Our Platform as an Organisation Looking to Provide Help,
                                It means That You are a Non-Profitable/Profitable Organization
                                (Most Likely a Non Governmental Organisation) That is Looking to Reach Out Towards People in Need.
                                <br />
                                <br />
                                Or You Could be a Person wishing To Donate.
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

            <Segment style={{ padding: "8em 0em" }} vertical>
                <Container text>
                    <Header as="h3" style={{ fontSize: "2em" }}>
                        What Happens after a User Successfully Registers as a Person/Organization In Need?
                    </Header>
                    <p style={{ fontSize: "1.33em" }}>
                        After Successfully Registering Yourself as an Entity In Need,
                        You Will be Guided Towards a Dedicated User Homepage Where
                        You will be Prompted to Upload Your Documents (For Instance: Your GS Certificate, Images etc)
                        for Verification Purposes.
                    </p>

                    {/* <Divider
            as="h4"
            className="header"
            horizontal
            style={{ margin: "3em 0em", textTransform: "uppercase" }}
          >
            <a href="#root">Case Studies</a>
          </Divider> */}

                    <br />
                    <Header as="h3" style={{ fontSize: "2em" }}>
                        What Happens after a User Successfully Registers as a Donor?
                    </Header>
                    <p style={{ fontSize: "1.33em" }}>
                        After Successfully Registering Yourself as a Donor,
                        You Will be Guided Towards a Dedicated Beneficiary/Donor Homepage Where
                        You will be Prompted to Upload Your Documents Under Your Donations (Donation Proof Images)
                        for Verification Purposes.
                    </p>

                    <br />
                    <Header as="h3" style={{ fontSize: "2em" }}>
                        What Happens Behind the Scenes?
                    </Header>
                    <p style={{ fontSize: "1.33em" }}>
                        After Beneficiaries and Donors Have Registered and Verified Themselves Successfully, the Organisations
                        Can View a List of All the People That Are In Need of Assistance, They Can then Decide Who
                        to Provide Their Services to as Per Their Requirement Criteria.
                    </p>

                    {/* New Content About Crypto */}
                    <br />
                    <Header as="h3" style={{ fontSize: "2em" }}>
                        Integrating Cryptocurrency into Our Platform
                    </Header>
                    <p style={{ fontSize: "1.33em" }}>
                        Our platform embraces the future of finance by integrating cryptocurrency as a method of donation. Users can choose to donate using various cryptocurrencies, providing greater flexibility and options for supporting those in need.
                    </p>
                    <p style={{ fontSize: "1.33em" }}>
                        Additionally, we implement blockchain technology to ensure transparency in donations. Every transaction is recorded on the blockchain, allowing donors to track their contributions and ensuring that funds reach the intended recipients.
                    </p>
                    <p style={{ fontSize: "1.33em" }}>
                        We believe that cryptocurrency can bridge the gap between generous individuals and those in need, enabling seamless and instant donations across borders. Our goal is to create a decentralized platform that empowers users to make a difference in the lives of others.
                    </p>
                    <p style={{ fontSize: "1.33em" }}>
                        By leveraging smart contracts, we can automate processes, ensuring that donations are released only when certain criteria are met, adding an additional layer of security and trust to our platform.
                    </p>
                </Container>
            </Segment>
            <Segment style={{ padding: "8em 0em" }} vertical>
                <Grid container stackable verticalAlign="middle">
                    <Grid.Row>
                        <Grid.Column width={8}>
                            {/* <Divider
                as="h4"
                className="header"
                horizontal
                style={{ margin: "3em 0em", textTransform: "uppercase" }}
              >
                <a href="#root">Case Studies</a>
              </Divider> */}
                            <Header as="h3" style={{ fontSize: "2em" }}>
                                How Can You Obtain KindCoins?
                            </Header>
                            <p style={{ fontSize: "1.33em" }}>
                                Make a Donation. After It Is Verified, You Will Receive Tokens
                                {/* <br/>
                <Header as="h3" style={{ fontSize: "1em" }}>
                  Who is a Person in Need ?
                </Header>
                </p>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  We Make Bananas That Can Dance
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  Yes that's right, you thought it was the stuff of dreams, but even
                  bananas can be bioengineered.
                </p> */}
                            </p>
                        </Grid.Column>
                        <Grid.Column floated="right" width={6}>
                            <Image
                                // bordered
                                rounded
                                size="large"
                                src="/token.svg"
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

        </div>
    )
}
