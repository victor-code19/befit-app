import { useState } from "react";
import { useFormik } from "formik";
import { BmiSchema } from "../../../schemas";
import { caluculateBmi } from "../../../utils/calculators";

import classes from "./Bmi.module.css";
import bmiImage from "../../../assets/bmi.png";

const BMI = () => {
  const [bmi, setBmi] = useState();

  const { values, errors, touched, handleSubmit, handleChange } = useFormik({
    initialValues: {
      height: "",
      weight: "",
    },
    validationSchema: BmiSchema,
    onSubmit: (values) => {
      const { height, weight } = values;
      const bmi = caluculateBmi(height, weight);
      setBmi(bmi);
    },
  });

  return (
    <div className={classes["bmi-group"]}>
      <h1>
        <span className={classes.red}>BMI </span>CALCULATOR
      </h1>
      <div className={classes["calculator-section"]}>
        <div className={classes.calculator}>
          <form onSubmit={handleSubmit}>
            <label>Height (cm)</label>
            <input
              value={values.height}
              onChange={handleChange}
              type="number"
              id="height"
              name="height"
              className={`${classes["form-input"]} ${
                errors.height && touched.height && classes.invalid
              }`}
            />
            <label>Weight (kg)</label>
            <input
              value={values.weight}
              onChange={handleChange}
              type="number"
              id="weight"
              name="weight"
              className={`${classes["form-input"]} ${
                errors.weight && touched.weight && classes.invalid
              }`}
            />
            <button type="submit">Calculate</button>
          </form>
          <div>
            <h3>BMI Categories:</h3>
            <p className={bmi <= 18.5 && classes["unhealthy-result"]}>
              Below 18.5 = Underweight
            </p>
            <p className={bmi >= 18.5 && bmi < 25 && classes["healthy-result"]}>
              18.5 – 24.9 = Healthy Weight
            </p>
            <p className={bmi >= 25 && bmi < 30 && classes["unhealthy-result"]}>
              25.0 – 29.9 = Overweight
            </p>
            <p className={bmi >= 30 && classes["unhealthy-result"]}>
              30.0 and Above = Obesity
            </p>
            <div className={classes["result-group"]}>
              {bmi && (
                <span className={classes["result-bmi"]}>
                  Your BMI ={" "}
                  <span
                    className={`${classes["result-bmi"]} ${
                      bmi >= 18.5 && bmi < 25
                        ? classes["healthy-result"]
                        : classes["unhealthy-result"]
                    }`}
                  >
                    {bmi}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
        <img src={bmiImage} className={classes["bmi-image"]} />
      </div>
      <div className={classes.line} />
      <div className={classes.cards}>
        <div className={classes.card}>
          <h2 style={{ fontSize: "34px", marginTop: "15px" }}>WHAT IS BMI</h2>
          <p>
            The body mass index (BMI) is a measure that uses your height and weight to
            work out if your weight is healthy. It is a widely used tool for assessing if
            a person is at a healthy weight or at risk for health problems. Understanding
            your BMI is very important for maintaining good health and preventing chronic
            diseases.
          </p>
        </div>
        <div className={classes.card}>
          <h2>HOW TO CALCULATE BMI</h2>
          <p>
            Calculating your BMI is easy with our online calculator. Simply enter your
            height and weight to get your BMI in seconds. Our calculator uses the latest
            scientific formulas to provide you with the most accurate result possible. You
            can also compare your results to standard BMI ranges to see where you fall on
            the spectrum.
          </p>
        </div>
        <div className={classes.card}>
          <h2>LIMITATIONS OF BMI CALCULATORS</h2>
          <p>
            While BMI is a useful tool for determining body fat and health risks
            associated with weight, it is not always an accurate measure. BMI does not
            take into account factors such as muscle mass, bone density, which can affect
            the accuracy of the calculation. For example, people with a lot of muscle mass
            may have a higher BMI even though they are not overweight or obese.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BMI;
