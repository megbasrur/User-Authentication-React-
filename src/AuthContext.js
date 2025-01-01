import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(()=>{
        return localStorage.getItem('token')||'';
    });
    const [email, setEmail] = useState(() => localStorage.getItem('email') || '');

    useEffect(() => {
        if (token) {
            console.log("AuthContext token: ",token);
            localStorage.setItem('token', token);
            localStorage.setItem('email', email);
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
        }
    }, [token]);

    const logout=()=>{
        setToken('');
        setEmail('');
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    }



    return (
        <AuthContext.Provider value={{ token, setToken, email, setEmail, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthContext;

/*const updateToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
        localStorage.setItem('accessToken', newToken);
    } else {
        localStorage.removeItem('accessToken');
    }
};*/