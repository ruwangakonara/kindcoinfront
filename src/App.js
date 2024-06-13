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
        </Routes>


    );
}

export default App;