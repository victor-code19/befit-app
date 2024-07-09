import { json, redirect } from 'react-router-dom';
import { getAuthToken } from '../utils/auth';

import PostDetails from '../components/UI/Blog/PostDetails/PostDetails';

const PostDetailsPage = () => {
  return <PostDetails />;
};

export default PostDetailsPage;

export const loader = async ({ params }) => {
  const response = await fetch(`/api/blog/post/${params.id}`);

  if (!response.ok) {
    throw json({ message: 'Could not fetch post.' }, { status: 500 });
  }

  return response;
};

export const action = async ({ request, params }) => {
  const response = await fetch(`/api/blog/post/${params.id}`, {
    method: request.method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (response.status === 401) {
    const responseData = await response.json();
    throw json({ message: responseData.error }, { status: 401 });
  }

  if (!response.ok) {
    throw json({ message: 'Could not remove post.' }, { status: 500 });
  }

  return redirect('/blog');
};
