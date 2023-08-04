import { Fragment, useEffect, useState } from "react";

import useHttpRequest from "../../../hooks/useHttpRequest";
import { wordToUpperCase } from "../../../utils/uppercase";

import styles from "./ExercisesList.module.css";

const Exercises = ({ exercisesData, category }) => {
  const { error, isLoading, sendRequest: fetchByBodyPart } = useHttpRequest();

  const slicedData = exercisesData.slice(0, 21);
  const [exercises, setExercises] = useState(slicedData);

  useEffect(() => {
    if (category) {
      fetchByBodyPart(
        {
          url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${category.toLowerCase()}`,
          headers: {
            "X-RapidAPI-Key": "189e121dafmsh223be5bb5173241p1aa032jsn782ea577f9a3",
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          },
        },
        (exercises) => {
          const slicedData = exercises.slice(0, 20);
          setExercises(slicedData);
        }
      );
    }
  }, [fetchByBodyPart, category]);

  return (
    <Fragment>
      <div className={styles.line} />
      {isLoading ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>Loading...</p>
      ) : (
        <ul className={styles.list}>
          {exercises.map((exercise) => (
            <li className={styles.exercise}>
              <img src={exercise.gifUrl} loading="lazy" />
              <div className={styles.target}>
                <div>{wordToUpperCase(exercise.bodyPart)}</div>
                <div>{wordToUpperCase(exercise.target)}</div>
              </div>
              <div className={styles.name}>{wordToUpperCase(exercise.name)}</div>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default Exercises;
