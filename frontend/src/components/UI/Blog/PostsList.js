import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

import classes from "./PostsList.module.css";

import PostItem from "./PostItem";
import FilterButton from "./FilterButton/FilterButton";
import useHttpRequest from "../../../hooks/useHttpRequest";

const filterButtons = [
  {
    name: "Training",
  },
  {
    name: "Diet",
  },
  {
    name: "Doping",
  },
  {
    name: "Supplementation",
  },
];

const PostsList = () => {
  const { error, sendRequest: fetchByCategory } = useHttpRequest();
  const postsLoaderData = useLoaderData();

  const [posts, setPosts] = useState(postsLoaderData);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchByCategory(
      { url: `http://localhost:8080/blog/posts?category=${category}` },
      (posts) => {
        setPosts(posts);
      }
    );
  }, [fetchByCategory, category]);

  return (
    <div className={classes["blog-group"]}>
      <h1>
        OUR <span>BLOG</span>
      </h1>
      <div className={classes.filter}>
        {filterButtons.map((item, index) => (
          <FilterButton
            key={index}
            children={item.name}
            onClick={() => {
              setCategory(item.name);
            }}
          />
        ))}
      </div>
      <div className={classes.line} />
      <ul className={classes.list}>
        {posts.length === 0 && <p className={classes["no-posts"]}>No posts to display</p>}
        {posts.map((post) => (
          <Link to={`/blog/${post._id}`}>
            <PostItem
              key={post._id}
              title={post.title}
              intro={post.introduction}
              category={post.category}
            />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
