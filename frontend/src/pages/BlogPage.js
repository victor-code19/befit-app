import { json } from "react-router-dom";

import PostsList from "../components/UI/Blog/PostsList";

const BlogPage = () => {
  return <PostsList />;
};

export default BlogPage;

export const loader = async ({ request }) => {
  const response = await fetch("http://localhost:8080/blog/posts");

  if (!response.ok) {
    throw json({ message: "Could not fetch posts." }, { status: 500 });
  }

  return response;
};
