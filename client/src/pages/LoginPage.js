import { json, redirect } from 'react-router-dom';
import Login from '../components/UI/Login/Login';

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;

export const action = async ({ request }) => {
  const data = await request.formData();

  const loginData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  const response = await fetch('/api/users/login', {
    method: request.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  if (response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Unable to login user' }, { status: 500 });
  }

  const responseData = await response.json();

  localStorage.setItem('token', responseData.token);

  if (responseData.role) {
    localStorage.setItem('role', responseData.role);
  }

  return redirect('/');
};
