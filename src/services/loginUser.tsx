import { User } from '../interfaces/user';

export const loginUser = async (user: User) => {
  try {
    const response = await fetch(`http://localhost:5000/user/login`, {
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
