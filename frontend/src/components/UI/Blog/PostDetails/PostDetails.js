import { useState } from "react";
import { useRouteLoaderData, Link, useSubmit } from "react-router-dom";
import { formatDate } from "../../../../utils/formatDate";
import { isAdminLogged } from "../../../../utils/auth";
import Modal from "../../Modals/WarningModal";

import styles from "./PostDetails.module.css";

const PostDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const submit = useSubmit();

  const token = useRouteLoaderData("root");
  const isAdminAuthenticated = isAdminLogged();

  const postData = useRouteLoaderData("post");

  const date = formatDate(new Date(postData.createdAt));
  const category = postData.category.charAt(0).toUpperCase() + postData.category.slice(1);

  return (
    <main className={styles.main}>
      <Link to={"/blog"}>&#8592;</Link>
      <div className={styles.date}>{date}</div>
      <div className={styles.category}>{category}</div>
      <article>
        <h2>{postData.title}</h2>
        <h3>{postData.introduction}</h3>
        <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      </article>
      {token && isAdminAuthenticated && (
        <div className={styles.actions}>
          <Link to={`/blog/${postData._id}/edit`}>Edit</Link>
          <button
            onClick={() => {
              setShowModal(true);
            }}
            type="submit"
          >
            Delete
          </button>
        </div>
      )}
      {showModal && (
        <Modal
          title="Warning"
          message="Are you sure?"
          onConfirm={() => {
            submit(null, { method: "delete" });
          }}
        />
      )}
    </main>
  );
};

export default PostDetails;
