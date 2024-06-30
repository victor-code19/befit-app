import { useState } from "react";
import { useSubmit } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import styles from "./AddPost.module.css";

const AddPost = () => {
  const submit = useSubmit();

  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [warning, setWarning] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (title && introduction && content) {
      const postData = { title, introduction, category, content };
      submit(postData, { method: "POST" });
    } else {
      setWarning("Fill in all fields");
    }
  };

  return (
    <div className={styles["edit-group"]}>
      <h1>ADD NEW POST</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="title">Post Title</label>
        <textarea
          id="title"
          className={styles.input}
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor="introduction">Introduction</label>
        <textarea
          id="introduction"
          className={styles.input}
          type="text"
          onChange={(e) => {
            setIntroduction(e.target.value);
          }}
        />
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
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
          onChange={(value) => {
            setContent(value);
          }}
        />
        <button className={styles.submit} type="submit">
          Add Post
        </button>
        {warning && <p className={styles.warning}>{warning}.</p>}
      </form>
    </div>
  );
};

export default AddPost;
