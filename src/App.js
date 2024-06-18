// import {useEffect, useState} from "react";
// import axios from "axios";
//
//
// function App() {
//
//     const [notes, setNotes] = useState(null);
//     const [createForm, setCreateForm] = useState({
//
//         title: "",
//         body: ""
//
//     });
//
//     useEffect(() => {
//         fetchNotes()
//     }, [])
//
//     const fetchNotes = async () => {
//     const res = await axios.get("http://localhost:9013/notes");
//
//     setNotes(res.data.notes)
//     console.log(res);
//     }
//
//     const updateCreateForm = (e) =>{
//
//         const {name, value} = e.target
//         setCreateForm({...createForm, [name]: value})
//         console.log({name, value})
//     }
//
//     const createNote = (e) => {
//         e.preventDefault()
//         console.log("Submit")
//     }
//   return (
//     <div className="App">
//         <div >
//             <h1>Notes</h1>
//             {notes &&
//
//                 notes.map((note) => {
//                     return(
//                         <div key={note._id}>
//                             <h3>{note.title}</h3>
//                             <h3>{note.body}</h3>
//                         </div>
//                     )
//                 })
//
//             }
//         </div>
//
//         <div>
//             <h2>Make Note</h2>
//             <form onSubmit={createNote}>
//                 <input onChange={updateCreateForm} value = {createForm.title} name="title"/>
//                 <textarea  onChange={updateCreateForm} value={createForm.body} name = "body"></textarea>
//                 <button type="submit">enter</button>
//             </form>
//         </div>
//     </div>
//   );
// }
//
// export default App;

import React from 'react';
import './App.css';
import Home from './Pages/Home/home'
import {  Routes, Route } from "react-router-dom";
import Org from './Components/Home/Auth/Org'
import People from './Components/Home/Auth/People'
import useform ,{validate} from './Components/Home/function/formhandle'
import Olog from './Components/Home/Login/Olog'
import OSignup from './Components/Home/Signup/OSignup'
import Login from './Components/Home/Login/Login'
import Signup from './Components/Home/Signup/Signup'
import Forgot from './Components/Home/Forgot/Forgot'
import Main from './Pages/Home/Main'

import DonorHome from './Pages/Donor/home/home'
import BeneficiaryList from "./Pages/Donor/beneficiaries";
import DonationList from "./Pages/Donor/onGoingDonations";
import PendingRewards from "./Pages/Donor/pendingRewards";
import CompletedDonations from "./Pages/Donor/completedDonations";
import DonorList from "./Pages/Donor/donors";
import Account from "./Pages/Donor/account";
import UpdateAccount from "./Pages/Donor/updateAccount";
import DonorAccount from "./Pages/Donor/donorAccount";
import BeneficiaryAccount from "./Pages/Donor/beneficiartyAccount";
import OpenRequestList from "./Pages/Donor/openRequests";
import OpenRequestPage from "./Pages/Donor/openRequestPage";
import ClosedRequestList from "./Pages/Donor/closedRequests";
import ClosedRequestPage from "./Pages/Donor/closedRequestPage";
import MyListingsList from "./Pages/Donor/donations/myListings";
import AnnouncementList from "./Pages/Donor/announcementsPage";
import MyListingPage from "./Pages/Donor/donations/myListingpage";
import BeneficiaryDashboard from "./Pages/Beneficiary/home/home";
import BeneficiaryOwnOpenRequestList from "./Pages/Beneficiary/requests/openRequests";
import BeneficiaryOwnClosedRequestPage from "./Pages/Beneficiary/requests/closedRequestPage";
import BeneficiaryOwnOpenRequestPage from "./Pages/Beneficiary/requests/openRequestPage";
import BeneficiaryOwnClosedRequestList from "./Pages/Beneficiary/requests/closedRequests";


function App() {

    return (

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="org" element={<Org/>}>
                <Route path="login" element={<Olog form={useform()} validate={validate}/>} />
                <Route path="signup" element={<OSignup  form={useform()} validate={validate}/>} />
            </Route>
            <Route path="people" element={<People/>}>
                <Route path="login" element={<Login  form={useform()} validate={validate}/>} />
                <Route path="signup" element={<Signup  form={useform()} validate={validate}/>} />
            </Route>
            <Route path="forgot" element={<Forgot form={useform()} validate={validate}/>}></Route>
            <Route path="main" element={<Main/>}/>


            {/*Donor Routes*/}

            <Route path="/donor/home" element={<DonorHome/>}/>
            <Route path = "/donor/beneficiaries" element={<BeneficiaryList/>}/>
            <Route path = "/donor/beneficiaries/:beneficiary_id" element={<BeneficiaryAccount/>}/>

            <Route path = "/donor/ongoing-donations" element={<DonationList/>}/>
            <Route path = "/donor/pending-rewards" element={<PendingRewards/>}/>
            <Route path = "/donor/completed-donations" element={<CompletedDonations/>}/>
            <Route path = "/donor/donors" element={<DonorList/>}/>
            <Route path = "/donor/donors/:donor_id" element={<DonorAccount/>}/>
            <Route path = "/donor/account" element={<Account/>}/>
            <Route path = "/donor/update-account" element={<UpdateAccount/>}/>

            <Route path = "/donor/open-requests" element={<OpenRequestList/>}/>
            <Route path = "/donor/open-requests/:request_id" element={<OpenRequestPage/>}/>

            <Route path = "/donor/closed-requests" element={<ClosedRequestList/>}/>
            <Route path = "/donor/closed-requests/:request_id" element={<ClosedRequestPage/>}/>

            <Route path = "/donor/my-listings" element={<MyListingsList/>}/>
            <Route path = "/donor/my-listings/:donation_id" element={<MyListingPage/>}/>

            <Route path = "/donor/announcements" element={<AnnouncementList/>}/>



            {/*Beneficiary Routes*/}
            <Route path="/beneficiary/home" element={<BeneficiaryDashboard/>}/>

            <Route path = "/beneficiary/open-requests" element={<BeneficiaryOwnOpenRequestList/>}/>
            <Route path = "/beneficiary/open-requests/:request_id" element={<BeneficiaryOwnOpenRequestPage/>}/>

            <Route path = "/beneficiary/closed-requests" element={<BeneficiaryOwnClosedRequestList/>}/>
            <Route path = "/beneficiary/closed-requests/:request_id" element={<BeneficiaryOwnClosedRequestPage/>}/>

        </Routes>



    );
}

export default App;