import React, { Component } from 'react'
import Banner from '../../Components/Home/Banner/Banner'
import About from '../../Components/Home/About/About'
import Overview from '../../Components/Home/Overview/Overview'
import Footer from '../../Components/Home/Footer/Footer'
import Navbar from "../../Components/Home/NavBar/NavBar";
export class dashboard extends Component {
  render() {
    return (
      <div>
          <Navbar/>

          <Banner />
          <Overview/>
          <About/>
          <Footer/>
      </div>
    )
  }
}

export default dashboard
//just checking