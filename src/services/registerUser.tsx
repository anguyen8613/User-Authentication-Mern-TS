import { host } from '../commons/host';
import { User } from '../interfaces/user';

export const registerUser = async (user: User) => {
  const server: string = host;
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
