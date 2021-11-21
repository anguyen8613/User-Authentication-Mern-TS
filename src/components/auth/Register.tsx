import React, { FC, FormEventHandler, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import AuthContext from '../../context/AuthContext';
import { registerUser } from '../../services/registerUser';
import styles from './Register.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User } from '../../interfaces/user';

const Register: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setpasswordVerify] = useState('');

  const navigate = useNavigate();
  const context = useContext(AuthContext);
  if (!context) {
    return null;
  }

  const getLoggedIn = context.getLoggedIn;

  const register: FormEventHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const user: User = {
      email,
      password,
      passwordVerify,
    };
    const data = await registerUser(user);
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
        <h5 className={styles.title}>Register your account!</h5>
        <form onSubmit={register}>
          <div>
            <label htmlFor='email' className='m-2'>
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
            <label htmlFor='password' className='m-2'>
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
          <div>
            <label htmlFor='verifyPassword' className='m-2'>
              Verify Password:
            </label>
            <input
              className='m-2'
              id='verifyPassword'
              type='text'
              required
              onChange={(e) => setpasswordVerify(e.target.value)}
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

export default Register;
