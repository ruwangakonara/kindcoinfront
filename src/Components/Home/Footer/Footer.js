import React from 'react'
import "./Footer.css"
import { Grid, Header, Segment,Container,List} from 'semantic-ui-react'
    
    export default function footer() {
      return (
        <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <meta name="viewport" content="width=device-width, initial-scale=1.00, maximum-scale=2.00, minimum-scale=1.00"></meta>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={5} >
                <Header inverted style ={{textAlign: 'center'}} as='h4' content='Sitemap' />

                <List link inverted style={{textAlign: 'center'}}
                >
                  <List.Item as='a'>Homepage</List.Item>
                  <List.Item as='a'>Overview</List.Item>
                  <List.Item as='a'>About Our Platform</List.Item>
                </List>
              </Grid.Column>

              <Grid.Column width={5}>
                <Header inverted style ={{textAlign: 'center'}} as='h4' content='Login/Signup' />
                <List link inverted style={{textAlign: 'center'}}>
                  <List.Item as='a'>Login as an Organisation</List.Item>
                  <List.Item as='a'>Login as a Person in Need</List.Item>
                </List>
              </Grid.Column>
              
              <Grid.Column width={5}>
                <Header inverted style ={{textAlign: 'center'}} as='h4' content='Get in Touch With Us' />
                <List link inverted style={{textAlign: 'center'}}>
                  <List.Item as='a'>Contact Us</List.Item>
                  <List.Item as='a'>Write To us at : qa@kindcoin.com</List.Item>
                </List>
              </Grid.Column>

            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
        )
    }
    




