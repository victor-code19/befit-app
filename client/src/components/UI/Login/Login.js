import { Form, useActionData, useSubmit, useNavigation } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../../../schemas";

import classes from "./Login.module.css";

const Login = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const onSubmit = (values) => {
    submit(values, { method: "post" });
  };

  const isSubmitting = navigation.state === "submitting";

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <section className={classes["signin-group"]}>
      <h2>SIGN IN</h2>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          type="email"
          id="email"
          name="email"
          className={`${classes["form-input"]} ${
            errors.email && touched.email && classes.invalid
          }`}
        />
        {errors.email && touched.email ? (
          <p className={classes["error-info"]}>{errors.email}</p>
        ) : (
          <p className={classes["error-info"]}>&nbsp;</p>
        )}
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
        {errors.password && touched.password ? (
          <p className={classes["error-info"]}>{errors.password}</p>
        ) : (
          <p className={classes["error-info"]}>&nbsp;</p>
        )}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
        {data && data.error && <p className={classes["backend-error"]}>{data.error}.</p>}
      </Form>
      <div className={classes.line}></div>
    </section>
  );
};

export default Login;
