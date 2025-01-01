import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import OrderHistory from './OrderHistory';
import AuthContext from './AuthContext';
import { Avatar, Container, Button, Typography, Box, Divider } from '@mui/material';


const Home = () => {
    const {logout, email, token}= useContext(AuthContext);
    const navigate=useNavigate();

    const handleLogout=()=>{
        logout();
        navigate('/login');
    }

    return (
        <ProtectedRoute>
            <Container maxWidth="md" sx={{ position: 'relative', mt: 5 }}>
            <Box sx={{ position: 'absolute', top:2 , left: 5, display: 'flex', alignItems: 'center', gap: 2 }}>
                {token ? (
                    <>
                        {/* User Avatar */}
                        <Avatar sx={{ bgcolor: 'blue' }}>{email}</Avatar>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {email || 'Unknown User'}
                        </Typography>
                    </>
                ) : (
                    <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
                        Login
                    </Button>
                )}
            </Box>

            {token && (
                <Box sx={{ position: 'absolute', top: 5, right: 16 }}>
                    <Button variant="contained" color="error" onClick={handleLogout}>
                        Logout
                    </Button>
                </Box>
            )}

            {/* Main Content */}
            <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
                Welcome to the Home Page
            </Typography>
            <Divider sx={{ my: 2 }} />
            <OrderHistory />
        </Container>
        </ProtectedRoute>
    );
};

export default Home;