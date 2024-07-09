import { redirect, json } from 'react-router-dom';
import { getAuthToken } from '../utils/auth';

export const action = async ({ request }) => {
  const response = await fetch('/api/users/logout', {
    method: request.method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Unable to logout user' }, { status: 500 });
  }

  localStorage.removeItem('token');
  localStorage.removeItem('role');

  return redirect('/');
};
