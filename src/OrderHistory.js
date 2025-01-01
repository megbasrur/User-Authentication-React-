import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useAuth} from './useAuth'; 
import { Box, List, ListItem, ListItemText, Stack, Typography, Card, CardContent, CardActions, Button} from '@mui/material';

const OrderHistory = () => {
    const {token} = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading]= useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                if(token){
                const response = await axios.get('https://uc-fd-auth-backend.onrender.com/user/orders', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrders(response.data.orders);
                setLoading(false);
            }
            } catch (error) {
                console.error('Error fetching order history:', error);
                setErrorMessage('Failed to fetch order history.');
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, [token]);

    if(loading) return <p>Loading...</p>;
    if (errorMessage) return <p>{errorMessage}</p>;

     return (
        <Box>
            <Box sx={{display:'flex', justifyContent:'center'}}>
            <Typography variant="h4" gutterBottom sx={{marginTop:4}}>Order History</Typography>
            </Box>
            {orders.length===0?(<Typography variant="body1">No orders found</Typography>):
     (
        (
            <Stack spacing={3}>
            {orders.map((order) => (
                <Card variant="outlined" key={order.id} sx={{ bgcolor: 'rgb(214,247,250,0.5)', borderRadius: 2, boxShadow: 2 }}>
                    <CardContent sx={{margin:2, padding:2, flexDirection:'column', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                        <Typography variant="h6" textAlign="center">
                            {order.name}
                        </Typography>
                        <Box mt={1}>
                            <Typography variant="body2" color="textSecondary">
                                Item: {order.item}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Price: ${order.price}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Date: {order.date}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Stack>
        ))}
{errorMessage && <Typography variant="body1">{errorMessage}</Typography>}
        </Box>
    );
};

export default OrderHistory;

/*{orders.map((order) => (
                 <ListItem key={order.id} divider>
                            <ListItemText primary={`Order ID: ${order.id}`}
                            secondary={
                                <>
                                <Typography component="span">
                                Item: {order.item}
                            </Typography>
                            <Typography component="span">
                                Price: ${order.price}
                            </Typography>
                            <Typography component="span">
                                Date: {order.date}
                            </Typography>
                            </>
                            }
                            />
                        </ListItem>*/

                        /* <List>
                 {orders.map((order) => (
                        <ListItem key={order.id} divider>
                            <ListItemText
                                primary={`Order ID: ${order.id}`}
                                secondary={
                                    <Box display="flex" flexDirection="column" mt={1}>
                                        <Typography component="span" variant="body2" color="textSecondary">
                                            Item: {order.item}
                                        </Typography>
                                        <Typography component="span" variant="body2" color="textSecondary">
                                            Price: ${order.price}
                                        </Typography>
                                        <Typography component="span" variant="body2" color="textSecondary">
                                            Date: {order.date}
                                        </Typography>
                                    </Box>
                                }
                            />
                        </ListItem>
                 
                 ))};
            </List>*/