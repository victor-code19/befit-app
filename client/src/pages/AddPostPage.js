import { json, redirect } from 'react-router-dom';
import { getAuthToken } from '../utils/auth';

import AddPost from '../components/UI/Blog/AddPost/AddPost';

const AddPostPage = () => {
  return <AddPost />;
};

export default AddPostPage;

export const action = async ({ request }) => {
  const data = await request.formData();

  const postData = {
    title: data.get('title'),
    introduction: data.get('introduction'),
    content: data.get('content'),
    category: data.get('category'),
  };

  const response = await fetch('/api/blog/post', {
    method: request.method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(postData),
  });

  const responseData = await response.json();

  if (response.status === 401) {
    throw json({ message: responseData.error }, { status: 401 });
  }

  if (!response.ok) {
    throw json({ message: 'Could not add post.' }, { status: 500 });
  }

  return redirect(`/blog/${responseData.id}`);
};
