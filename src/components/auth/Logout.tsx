import axios from 'axios';
import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Logout: FC = () => {
  const navigate = useNavigate();
  const server: string = process.env.REACT_APP_HOST || 'http://localhost:5000';
  const context = useContext(AuthContext);
  if (!context) {
    return null;
  }

  const getLoggedIn = context.getLoggedIn;

  const logoutUser = async () => {
    try {
      await axios.get(`${server}/user/logout`);
      await getLoggedIn();
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return <button onClick={logoutUser}>Log Out</button>;
};

export default Logout;
