import { User } from '../interfaces/user';

export const registerUser = async (user: User) => {
  const server: string = process.env.REACT_APP_HOST || 'http://localhost:5000';
  try {
    const response = await fetch(`${server}/user/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
