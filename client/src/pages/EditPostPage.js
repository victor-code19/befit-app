import { json, redirect } from 'react-router-dom';
import { getAuthToken } from '../utils/auth';
import EditPost from '../components/UI/Blog/EditPost/EditPost';

const EditPostPage = () => {
  return <EditPost />;
};

export default EditPostPage;

export const action = async ({ request, params }) => {
  const formData = await request.formData();

  const data = {
    title: formData.get('title'),
    introduction: formData.get('introduction'),
    content: formData.get('content'),
    category: formData.get('category'),
  };

  const response = await fetch(`/api/blog/post/${params.id}`, {
    method: request.method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (response.status === 401) {
    const responseData = await response.json();
    throw json({ message: responseData.error }, { status: 401 });
  }

  if (!response.ok) {
    throw json({ message: 'Could not edit post.' }, { status: 500 });
  }

  return redirect(`/blog/${params.id}`);
};
