import classes from "./PostItem.module.css";

const PostItem = ({ title, intro, category }) => {
  const categoryUppercase = category.charAt(0).toUpperCase() + category.slice(1);
  return (
    <li className={classes.post}>
      <h2>{title}</h2>
      <p className={classes.introduction}>{intro}</p>
      <div className={classes.lower}>
        <p className={classes.category}>{categoryUppercase}</p>
        <p className={classes.read}>Read more &#8594;</p>
      </div>
    </li>
  );
};

export default PostItem;
