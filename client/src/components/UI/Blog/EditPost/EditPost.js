import { useState } from "react";
import { useRouteLoaderData, useSubmit, Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import styles from "./EditPost.module.css";

const EditPost = () => {
  const postData = useRouteLoaderData("post");
  const submit = useSubmit();

  const [title, setTitle] = useState(postData.title);
  const [introduction, setIntroduction] = useState(postData.introduction);
  const [category, setCategory] = useState(postData.category);
  const [content, setContent] = useState(postData.content);
  const [warning, setWarning] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (title && introduction && content) {
      const postData = { title, introduction, category, content };
      submit(postData, { method: "PATCH" });
    } else {
      setWarning("Fill in all fields");
    }
  };

  return (
    <div className={styles["edit-group"]}>
      <h1>EDIT POST</h1>
      <form onSubmit={submitHandler}>
        <label>Post Title</label>
        <textarea
          className={styles.input}
          type="text"
          defaultValue={postData.title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label>Introduction</label>
        <textarea
          className={styles.input}
          type="text"
          defaultValue={postData.introduction}
          onChange={(e) => {
            setIntroduction(e.target.value);
          }}
        />
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          defaultValue={postData.category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option value="diet">Diet</option>
          <option value="training">Training</option>
          <option value="supplementation">Supplementation</option>
          <option value="doping">Doping</option>
        </select>
        <label>Content</label>
        <ReactQuill
          className={styles.quill}
          defaultValue={postData.content}
          onChange={(value) => {
            setContent(value);
          }}
        />
        <Link to={`/blog/${postData._id}`}>Cancel</Link>
        <button className={styles.submit} type="submit">
          Update Post
        </button>
        {warning && <p className={styles.warning}>{warning}.</p>}
      </form>
    </div>
  );
};

export default EditPost;
