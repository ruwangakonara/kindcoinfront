import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
// import Navbar from './components/Home/NavBar/NavBar';
import Donate from "./Components/Home/Donatenow/Donatenow";
import Navbar from "./Components/Home/NavBar/NavBar";
import App from './App';
import axios  from "axios";
import {UserProvider} from "./Components/Home/UserConext/UserContext";

axios.defaults.baseURL = "http://localhost:9013"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
        <UserProvider>
            <App />
        </UserProvider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

