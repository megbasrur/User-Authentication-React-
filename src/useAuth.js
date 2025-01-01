import { useContext } from 'react';
import AuthContext from './AuthContext'; // Adjust the path based on your project structure

export const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;