import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust path as necessary
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { token, logout } = useAuth(); // Use the custom hook

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login'); 
    };

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {token ? ( // If the user is authenticated
                    <>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : ( // If the user is not authenticated
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Header;