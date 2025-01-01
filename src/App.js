import React from 'react';
import SignupForm from './Signup';
import Login from './Login';
import {Routes, Route} from 'react-router-dom'; 
import Layout from './Layout';
import Home from './Home'

const App = () => {
    return (
        
        <Routes> {/*Public routes*/}
            <Route path="/" element={<Layout/>}>
            <Route index element= {<Login />} />  {/*Default route*/}
            <Route path="signup" element={<SignupForm/>}></Route>
            <Route path="login" element={<Login/>}></Route>

            {/*Protected Routes*/}
            <Route path="home" element={<Home/>}></Route>
            </Route>
        </Routes>
    );
};

export default App;