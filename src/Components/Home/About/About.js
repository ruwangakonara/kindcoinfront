import React from 'react'
import { Button,Grid, Header, Segment,Image,Container,Divider } from 'semantic-ui-react'

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
          </p> */
          
          }
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
            <br/>
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
              It means That You are are a Non-Profitable/Profitable Organization
             (Most Likely a Non Governmental Organisation) That is Looking to Reach Out Towards People in Need.
             <br/>
             <br/>
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
    You will be Prompted to Upload Your Documents (For Instance: Your GS Certificate, Images etc )
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

  <br/>
   <Header as="h3" style={{ fontSize: "2em" }}>
   What Happens after a User Successfully Registers as a Donor?
   </Header>
   <p style={{ fontSize: "1.33em" }}>
   After Successfully Registering Yourself as a, Donor
    You Will be Guided Towards a Dedicated Beneficiary/Donor Homepage Where
    You will be Prompted to Upload Your Documents Under Your Donations(Donation Proof Images)
    for Verification Purposes. 
   </p>

  <br/>
 <Header as="h3" style={{ fontSize: "2em" }}>
    What Happens Behind the Scenes ?
  </Header>
  <p style={{ fontSize: "1.33em" }}>
    After a Beneficiaries and Donors Have Registered and Verified Themselves Successfully The Organisations
    Can View a List of All the People That Are In Need of Assistance, They Can then Decide Who
    to Provide Their Services to as Per Their Requirement Criteria.
  </p>
  
</Container>
</Segment>
  </div>

  
  )
}