import React, { Component, createRef } from 'react';
import Banner from '../../Components/Home/Banner/Banner';
import About from '../../Components/Home/About/About';
import Overview from '../../Components/Home/Overview/Overview';
import Footer from '../../Components/Home/Footer/Footer';
import Navbar from "../../Components/Home/NavBar/NavBar";

export class Home extends Component {
    aboutRef = createRef(); // Create a ref for the About component

    scrollToAbout = () => {
        this.aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    footerRef = createRef(); // Create a ref for the About component

    scrollToFooter = () => {
        this.aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    render() {
        return (
            <div>
                <Navbar/>
                <Banner/>
                <Overview/>
                <div id="about" ref={this.aboutRef}> {/* Assign the ref to About component */}
                    <About/>
                </div>

                {/*<div id="footer" ref={this.aboutRef}> /!* Assign the ref to About component *!/*/}
                {/*    <About/>*/}
                {/*</div>*/}
                <div id="footer" ref={this.footerRef}> {/* Assign the ref to About component */}
                    <Footer onAboutClick={this.scrollToAbout}/> {/* Pass the scroll function as a prop */}
                </div>
            </div>
        );
    }
}

export default Home;
