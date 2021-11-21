import { useContext } from 'react';
import { useNavigate } from 'react-router';
import AuthContext from '../../context/AuthContext';
import { loginUser } from '../../services/loginUser';
import styles from './Login.module.css';
import React, { FC, FormEventHandler, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User } from '../../interfaces/user';

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const context = useContext(AuthContext);
  if (!context) {
    return null;
  }

  const getLoggedIn = context.getLoggedIn;

  const login: FormEventHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const user: User = { email, password };
    const data = await loginUser(user);

    if (!data.errorMessage) {
      await getLoggedIn();
      navigate('/');
    } else {
      failToast(data.errorMessage);
    }
  };

  const failToast = (errorMessage: string) => {
    toast.error(errorMessage);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Login to your account </h1>
        <form onSubmit={login}>
          <div>
            <label className='m-2' htmlFor='email'>
              Email:
            </label>
            <input
              className='m-2'
              id='email'
              type='text'
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className='m-2' htmlFor='password'>
              Password:
            </label>
            <input
              className='m-2'
              id='password'
              type='text'
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.btnContainer}>
            <button className={styles.submitBtn}>Submit</button>
          </div>
        </form>
        <ToastContainer position='top-center' autoClose={3000} />
      </div>
    </div>
  );
};

export default Login;
