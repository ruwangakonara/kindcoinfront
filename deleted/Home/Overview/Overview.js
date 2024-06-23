import React  from 'react'
import { Carousel } from 'react-carousel-minimal';
import { Divider } from 'semantic-ui-react';
import './Overview.css'



function App() {
 const data = [
    {
      image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      caption: "Best Place For People Who Are In Need For Financial Help. Our Platform Bridges The Gap Between You And Organizations, Who Can Provide You With The Financial Support That You Need. "
    },
    {
      image: "https://images.pexels.com/photos/6646926/pexels-photo-6646926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      caption: "What We Do <br/><br/> If You Are In Need Of Financial Assistance, All You Have To Do Is Register Yourself on Our Platform. Our Api Will Then Match You With Relevant Organisations That Can Help You.<br/><br/> Equivalently, If You are an Organisation (for eg: an NGO), You Can register Yourself on Our Platform and Expand Your Reach Towards People in Need "
    },
    {
      image: "https://images.pexels.com/photos/7345444/pexels-photo-7345444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      caption: "Who is our platform for<br/><br/> This Platform Exists To Provide an Ease of Access for Donatees and Organisations to Contact Each Other, But You don't Need to be from an Organisation to Donate. Even if You are not Registered as a Donatee or an Organisation, You Can Donate and Contribute Towards Those in Need<br/><br/> On that Note, We Urge You To Donate!"
    },
  ];

  const captionStyle = {
    fontSize: '2.6rem',
    fontWeight: 'normal',
    color: 'rgba(255, 255, 255, 1.0)',
    lineHeight: 0.9,
    backgroundColor: '#111',
    opacity: 0.7,
    height: '78%',
    padding: "40px 40px",
    width: '100%',
    top: "12%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center", 
  }

  return (
    <div className="App font">
      <div style={{ textAlign: "center" }}>
      <Divider
          as="h4"
          className="header"
          horizontal
          style={{ margin: "3em 0em", textTransform: "uppercase" }}
        >
        <a href="#Overview">Overview</a>
        </Divider>
        <div style={{padding: "0 20px" }}>
          <Carousel
            data={data}
            time={7000}
            width="100vw"
            height="90vh"
            captionStyle={captionStyle}
            radius="10px"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={false}
            
            style={{

              textAlign: "center",
              maxWidth: "100vw",
              maxHeight: "100vh",
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </div>
        <h2><br/></h2>
      </div>
    </div>
  );
}

export default App;
