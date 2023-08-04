import { Suspense, useState } from "react";
import { defer, useLoaderData, Await } from "react-router-dom";

import PageWrapper from "../components/Layout/PageWrapper/PageWrapper";
import ExercisesList from "../components/UI/Exercises/ExercisesList";
import Header from "../components/Layout/Header/Header";
import ExercisesFilterBar from "../components/UI/Exercises/ExercisesFilterBar";

const ExercisesPage = () => {
  const { exercises } = useLoaderData();
  const [category, setCategory] = useState();

  const setCategoryHandler = (category) => {
    setCategory(category);
  };

  return (
    <PageWrapper>
      <Header>EXERCISES</Header>
      <ExercisesFilterBar onButtonClicked={setCategoryHandler} />
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={exercises}>
          {(loadedExercises) => (
            <ExercisesList exercisesData={loadedExercises} category={category} />
          )}
        </Await>
      </Suspense>
    </PageWrapper>
  );
};

const loadExercises = async () => {
  const response = await fetch(
    "https://exercisedb.p.rapidapi.com/exercises/bodyPart/back",
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "189e121dafmsh223be5bb5173241p1aa032jsn782ea577f9a3",
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    }
  );

  const responseData = await response.json();
  return responseData;
};

export default ExercisesPage;

export const loader = () => {
  return defer({
    exercises: loadExercises(),
  });
};
