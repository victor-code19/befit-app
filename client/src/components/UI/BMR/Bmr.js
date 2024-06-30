import { useFormik } from "formik";
import { useState } from "react";
import { calculateBmr } from "../../../utils/calculators";
import { BmrSchema } from "../../../schemas";
import classes from "./Bmr.module.css";

const Bmr = () => {
  const [bmr, setBmr] = useState();

  const { values, errors, touched, handleSubmit, handleChange } = useFormik({
    initialValues: {
      gender: "male",
      age: "",
      height: "",
      weight: "",
      activityLevel: "1.2",
      goal: "0",
    },
    validationSchema: BmrSchema,
    onSubmit: (values) => {
      const bmr = calculateBmr(values);
      setBmr(bmr);
    },
  });
  return (
    <div className={classes["bmr-group"]}>
      <h1>
        <span className={classes.red}>BMR </span>CALCULATOR
      </h1>
      <div className={classes["calculator-section"]}>
        <div className={classes.calculator}>
          <form onSubmit={handleSubmit}>
            <div className={classes["gender-group"]}>
              <p>Gender:</p>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                onChange={handleChange}
                defaultChecked={true}
                className={classes.radio}
              />
              <label htmlFor="male" className={classes["radio-label"]}>
                MALE
              </label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onChange={handleChange}
                className={classes.radio}
              />
              <label htmlFor="female" className={classes["radio-label"]}>
                FEMALE
              </label>
            </div>
            <div className={classes["calculator-line"]} />
            <div className={classes["person-info"]}>
              <label htmlFor="age">Age:</label>
              <input
                value={values.age}
                onChange={handleChange}
                id="age"
                name="age"
                className={`${classes["form-input"]} ${
                  errors.age && touched.age && classes.invalid
                }`}
              />
              <label htmlFor="female">Height:</label>
              <input
                value={values.height}
                onChange={handleChange}
                id="height"
                name="height"
                placeholder="cm"
                className={`${classes["form-input"]} ${
                  errors.height && touched.height && classes.invalid
                }`}
              />
              <label htmlFor="female">Weight:</label>
              <input
                value={values.weight}
                onChange={handleChange}
                id="weight"
                name="weight"
                placeholder="kg"
                className={`${classes["form-input"]} ${
                  errors.weight && touched.weight && classes.invalid
                }`}
              />
            </div>
            <div className={classes["calculator-line"]} />
            <div className={classes["activity-level"]}>
              <label htmlFor="activity">Activity level:</label>
              <select
                name="activityLevel"
                id="activity"
                value={values.activityLevel}
                onChange={handleChange}
                className={classes["select-box"]}
              >
                <option value="1.2">Sedentary - little / no exercise</option>
                <option value="1.375">Exercise 1-3 times / week</option>
                <option value="1.465">Exercise 4-5 times / week</option>
                <option value="1.55">
                  Daily exercise or intense exercise 3-4 times / week
                </option>
                <option value="1.725">Intense exercise 6-7 times/week</option>
                <option value="1.9">Very intense exercise daily, or physical job</option>
              </select>
              <div className={classes["calculator-line"]} />
              <div className={classes["activity-level"]}>
                <label htmlFor="goal">Your goal:</label>
                <select
                  name="goal"
                  id="goal"
                  value={values.goal}
                  onChange={handleChange}
                  className={classes["select-box"]}
                >
                  <option value="0">Maintain weight</option>
                  <option value="300">Gain weight</option>
                  <option value="-300">Lose weight</option>
                </select>
              </div>
            </div>
            <button type="submit">Calculate</button>
          </form>
          {bmr && (
            <p className={classes.result}>
              Estimated caloric demand:{" "}
              <span className={classes.calories}>{bmr} kcal</span>
            </p>
          )}
        </div>
      </div>
      <div className={classes["page-line"]} />
      <div className={classes.cards}>
        <div className={classes.card}>
          <h2 style={{ fontSize: "34px", marginTop: "15px" }}>WHAT IS BMR</h2>
          <p>
            BMR stands for <b>Basal Metabolic Rate</b>. It is the rate at which your body
            burns calories at rest to perform essential functions such as breathing,
            circulating blood, and maintaining organ function. BMR is influenced by
            factors such as age, sex, weight, height, and body composition. It is usually
            expressed in terms of the number of calories burned per day. Knowing your BMR
            can be helpful in determining your daily calorie needs and can be used as a
            guide for weight management.
          </p>
        </div>
        <div className={classes.card}>
          <h2>HOW TO CALCULATE BMR</h2>
          <p>
            Calculating your BMR can be done using several different equations that take
            into account factors such as age, gender, weight, and height. We use the
            latest formula to calculate your BMR. With our calculator you can also provide
            your activity level and goal. This causes that we can more precisely calculate
            your total calories intake based on your activity and goal and that is all you
            need to start.
          </p>
        </div>
        <div className={classes.card}>
          <h2>LIMITATIONS OF BMR CALCULATOR</h2>
          <p>
            BMR calculators can provide a quick estimate of the number of calories your
            body needs. However, BMR calculator will never calculate the exact amount of
            calories you should consume to reach your goal. It only takes into account
            certain factors, such as age, gender, weight, and height, and may not
            accurately reflect your individual BMR. Fortunately, these differences are not
            significant. This does not mean that BMR calculator is useless - it gives you
            an anchor point from which to start.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bmr;
