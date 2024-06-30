import classes from "./FilterButton.module.css";

const FilterButton = ({ onClick, children }) => {
  return (
    <button className={classes["filter-button"]} onClick={onClick}>
      {children}
    </button>
  );
};

export default FilterButton;
