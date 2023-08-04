import styles from "./ExercisesFilterBar.module.css";

import FilterButton from "../Blog/FilterButton/FilterButton";

const FilterButtons = [
  {
    name: "Back",
  },
  {
    name: "Chest",
  },
  {
    name: "Shoulders",
  },
  {
    name: "Upper Arms",
  },
  {
    name: "Lower Arms",
  },
  {
    name: "Upper Legs",
  },
  {
    name: "Lower Legs",
  },
];

const ExercisesFilterBar = (props) => {
  return (
    <div className={styles["filter-bar"]}>
      {FilterButtons.map((button) => (
        <FilterButton
          onClick={() => {
            props.onButtonClicked(button.name);
          }}
        >
          {button.name}
        </FilterButton>
      ))}
    </div>
  );
};

export default ExercisesFilterBar;
