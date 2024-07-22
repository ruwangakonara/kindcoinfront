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
// import Olog from './Components/Home/Login/Olog'
import OSignup from './Components/Home/Signup/OSignup'
import Login from './Components/Home/Login/Login'
import Signup from './Components/Home/Signup/Signup'
import Forgot from './Components/Home/Forgot/Forgot'
import Main from './Pages/Home/Main'


import DonorHome from './Pages/Donor/home/home'
import BeneficiaryList from "./Pages/Donor/beneficiaries";
import DonationList from "./Pages/Donor/donations/onGoingDonations";
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
import BeneficiaryOwnOpenRequestList from "./Pages/Beneficiary/my-requests/openRequests";
import BeneficiaryOwnClosedRequestPage from "./Pages/Beneficiary/my-requests/closedRequestPage";
import BeneficiaryOwnOpenRequestPage from "./Pages/Beneficiary/my-requests/openRequestPage";
import BeneficiaryOwnClosedRequestList from "./Pages/Beneficiary/my-requests/closedRequests";
import TicketsPage from "./Pages/Beneficiary/tickets/tickets";
import BeneficiaryDonorList from "./Pages/Beneficiary/donors/donors";
import BeneficiaryDonorAccount from "./Pages/Beneficiary/donors/donorAccount";
import BeneficiaryOtherBeneficiaryList from "./Pages/Beneficiary/beneficiaries/beneficiaries";
import BeneficiaryOtherBeneficiaryAccount from "./Pages/Beneficiary/beneficiaries/beneficiartyAccount";
import BeneficiaryAnnouncementList from "./Pages/Beneficiary/announcement/announcementsPage";
import BeneficiaryOwnAccount from "./Pages/Beneficiary/Account/account";
import BeneficiaryUpdateAccount from "./Pages/Beneficiary/Account/updateAccount";
import LeaderboardPage from "./Pages/Home/leaderboard/leaderboard";
import Leaderboards from "./Pages/Home/leaderboard/leaderboards";
import DonorLeaderboards from "./Pages/Donor/leaderboard/leaderboards";
import DonorOtherLeaderboardPage from "./Pages/Donor/leaderboard/leaderboard";
import MyLeaderboardPage from "./Pages/Donor/leaderboard/myleaderboard";
import OnGoingDonationPage from "./Pages/Donor/donations/onGoingDonationPage";
import Maintenance from "./Pages/Donor/maintenance/Maintenance";
import BeneficiaryOtherOpenRequestList from "./Pages/Beneficiary/other-requests/otherOpenRequests";
import BeneficiaryOtherOpenRequestPage from "./Pages/Beneficiary/other-requests/otherOpenRequestPage";
import BeneficiaryOtherClosedRequestList from "./Pages/Beneficiary/other-requests/otherClosedRequests";
import BeneficiaryOtherClosedRequestPage from "./Pages/Beneficiary/other-requests/otherClosedRequestPage";
import PendingRewardsPage from "./Pages/Donor/donations/pendingRewardsPage";
import CompletedDonationPage from "./Pages/Donor/donations/completedDonationPage";
import BeneficiaryDonorLeaderboards from "./Pages/Beneficiary/leaderboard/leaderboards";
import BeneficiaryDonorLeaderboardPage from "./Pages/Beneficiary/leaderboard/leaderboard";

import AdminDashBoard from './Pages/Admin/home/AdminDashBoard';
import AdminDonorListPg from './Pages/Admin/DonorListView/AdminDonorListPg';
import AdminDonor from "./Components/Admin/DonorDetails/AdminDonor";
import AdminBeneficiaryList from "./Pages/Admin/BeneficiaryListView/AdminBeneficiaryList";
import AdminBeneficiary from "./Components/Admin/BeneficiaryDetails/AdminBeneficiary";
import OverallStatistics from './Pages/Admin/Statistics/OverallStatistics';
import RegisterCrewMemberPage from './Pages/Admin/RegisterCrewMember/RegisterCrewMemberPage';
// import ViewCrewMember from './Pages/Admin/CrewMemberDets/ViewCrewMember';
import ViewCrewMemberTransactionList from './Pages/Admin/CrewMemberDets/ViewCrewMemberTransactionList';
import ViewComplaints from './Pages/Admin/Complaints/ViewComplaints';

import CrewMemberDashboard from './Pages/CrewMember/Dashboard/CrewMemberDashboard';

function App() {

    return (

        // <UserProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="beneficiary_registration" element={<Org/>}>
                    {/*    <Route path="login" element={<Olog form={useform()} validate={validate}/>} />*/}
                    <Route path="" element={<OSignup  form={useform()} validate={validate}/>} />
                </Route>
                <Route path="login" element={<People/>}>
                    <Route path="login" element={<Login/>} />
                    <Route path="signup" element={<Signup  form={useform()} validate={validate}/>} />
                </Route>
                <Route path="forgot" element={<Forgot form={useform()} validate={validate}/>}></Route>
                <Route path="main" element={<Main/>}/>


                <Route path = "leaderboards" element = {<Leaderboards/>}/>
                <Route path = "leaderboard/:id" element = {<LeaderboardPage/>}/>


                {/*Donor Routes*/}

                <Route path="/donor/home" element={<DonorHome/>}/>
                <Route path="/donor/maintenance" element={<Maintenance/>}/>
                {/*<Route path="/donor/leaderboard" element={<DonorHome/>}/>*/}
                <Route path = "/donor/beneficiaries" element={<BeneficiaryList/>}/>
                <Route path = "/donor/beneficiaries/:beneficiary_id" element={<BeneficiaryAccount/>}/>

                <Route path = "/donor/ongoing-donations" element={<DonationList/>}/>
                <Route path = "/donor/ongoing-donations/:donation_id" element={<OnGoingDonationPage/>}/>
                <Route path = "/donor/pending-rewards" element={<PendingRewards/>}/>
                <Route path = "/donor/pending-rewards/:donation_id" element={<PendingRewardsPage/>}/>
                <Route path = "/donor/completed-donations" element={<CompletedDonations/>}/>
                <Route path = "/donor/completed-donations/:donations_id" element={<CompletedDonationPage/>}/>

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
                <Route path="/donor/tickets" element={<TicketsPage/>}/>


                <Route path = "/donor/leaderboards" element = {<DonorLeaderboards/>}/>
                <Route path = "/donor/leaderboard" element = {<MyLeaderboardPage/>}/>
                <Route path = "/donor/leaderboard/:id" element = {<DonorOtherLeaderboardPage/>}/>



                {/*Beneficiary Routes*/}
                <Route path="/beneficiary/home" element={<BeneficiaryDashboard/>}/>
                <Route path="/beneficiary/tickets" element={<TicketsPage/>}/>

                <Route path = "/beneficiary/open-requests" element={<BeneficiaryOwnOpenRequestList/>}/>
                <Route path = "/beneficiary/open-requests/:request_id" element={<BeneficiaryOwnOpenRequestPage/>}/>

                <Route path = "/beneficiary/closed-requests" element={<BeneficiaryOwnClosedRequestList/>}/>
                <Route path = "/beneficiary/closed-requests/:request_id" element={<BeneficiaryOwnClosedRequestPage/>}/>

                <Route path = "/beneficiary/donors" element={<BeneficiaryDonorList/>}/>
                <Route path = "/beneficiary/donors/:donor_id" element={<BeneficiaryDonorAccount/>}/>

                <Route path = "/beneficiary/beneficiaries" element={<BeneficiaryOtherBeneficiaryList/>}/>
                <Route path = "/beneficiary/beneficiaries/:beneficiary_id" element={<BeneficiaryOtherBeneficiaryAccount/>}/>

                <Route path = "/beneficiary/announcements" element={<BeneficiaryAnnouncementList/>}/>

                <Route path = "/beneficiary/account" element={<BeneficiaryOwnAccount/>}/>
                <Route path = "/beneficiary/update-account" element={<BeneficiaryUpdateAccount/>}/>

                <Route path = "/beneficiary/other-open-requests" element={<BeneficiaryOtherOpenRequestList/>}/>
                <Route path = "/beneficiary/other-open-requests/:request_id" element={<BeneficiaryOtherOpenRequestPage/>}/>

                <Route path = "/beneficiary/other-closed-requests" element={<BeneficiaryOtherClosedRequestList/>}/>
                <Route path = "/beneficiary/other-closed-requests/:request_id" element={<BeneficiaryOtherClosedRequestPage/>}/>

                <Route path = "/beneficiary/leaderboards" element = {<BeneficiaryDonorLeaderboards/>}/>
                <Route path = "/beneficiary/leaderboard/:id" element = {<BeneficiaryDonorLeaderboardPage/>}/>


                {/* Crew Member Routes */}
                {/* <Route path="/crew_member/home" element={<CrewMemberHome/>}/> */}


                {/* Admin Routes */}
                <Route path="/admin/home" element={<AdminDashBoard/>}/>
                <Route path="/admin/Donor_List/Donors" element={<AdminDonorListPg/>}/>
                <Route path="/admin/Donor_List/Donors/:donor_id" element={<AdminDonor/>}/>
                <Route path='/admin/Beneficiary_List/Beneficiaries' element={<AdminBeneficiaryList/>}/>
                <Route path='/admin/Beneficiary_List/Beneficiaries/:beneficiary_id' element={<AdminBeneficiary/>}/>
                <Route path='/admin/overall_stats' element={<OverallStatistics/>}/>
                <Route path="/admin/register/crew_member" element={<RegisterCrewMemberPage/>}/>
                {/* <Route path='/admin/view/crew_members' element={<ViewCrewMembers/>}/> */}
                {/* <Route path='/admin/view/crew_members/:crew_member_id' element={<ViewCrewMember/>}/> */}
                <Route path='/admin/view/crew_members/:crew_member_id/accepted_transactions' element={<ViewCrewMemberTransactionList/>}/>
                {/* <Route path='/admin/view/crew_members/:crew_member_id/accepted_transactions/:transaction_id' element={<ViewCrewMemberTransaction/>}/> */}
                <Route path='/admin/view/complaints' element={<ViewComplaints/>}/>

                {/* Crew Member Routes */}
                <Route path='/crew/home' element={<CrewMemberDashboard/>}/>

            </Routes>
        // </UserProvider>




    );
}

export default App;