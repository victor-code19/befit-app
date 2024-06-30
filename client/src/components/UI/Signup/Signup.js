import { useFormik } from "formik";
import { registerSchema } from "../../../schemas/index";
import { Link, useActionData, useNavigation, useSubmit } from "react-router-dom";
import classes from "./Signup.module.css";

const Signup = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const isSubmitting = navigation.state === "submitting";

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      submit(values, { method: "post" });
    },
  });

  const renderErrorMessage = (fieldName) => {
    return errors[fieldName] && touched[fieldName] ? (
      <p className={classes["error-info"]}>{errors[fieldName]}</p>
    ) : (
      <p className={classes["error-info"]}>&nbsp;</p>
    );
  };

  return (
    <section className={classes["signup-group"]}>
      <h2>SIGN UP</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first-name">First Name</label>
        <input
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          id="first-name"
          name="firstName"
          className={`${classes["form-input"]} ${
            errors.firstName && touched.firstName && classes.invalid
          }`}
        />
        {renderErrorMessage("firstName")}
        <label htmlFor="last-name">Last Name</label>
        <input
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          id="last-name"
          name="lastName"
          className={`${classes["form-input"]} ${
            errors.lastName && touched.lastName && classes.invalid
          }`}
        />
        {renderErrorMessage("lastName")}
        <label htmlFor="email">Email</label>
        <input
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          id="email"
          name="email"
          className={`${classes["form-input"]} ${
            errors.email && touched.email && classes.invalid
          }`}
        />
        {renderErrorMessage("email")}
        <label htmlFor="password">Password</label>
        <input
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          type="password"
          id="password"
          name="password"
          className={`${classes["form-input"]} ${
            errors.password && touched.password && classes.invalid
          }`}
        />
        {renderErrorMessage("password")}
        <label htmlFor="confirm-password">Confirm password</label>
        <input
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          type="password"
          id="confirm-password"
          name="confirmPassword"
          className={`${classes["form-input"]} ${
            errors.confirmPassword && touched.confirmPassword && classes.invalid
          }`}
        />
        {renderErrorMessage("confirmPassword")}
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Signing up..." : "Sign up"}
        </button>
        {data && data.error.code === 11000 && (
          <p className={classes["email-in-use-info"]}>{data.error.message}</p>
        )}
        <p className={classes["login-message"]}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
      <div className={classes.line}></div>
    </section>
  );
};

export default Signup;
