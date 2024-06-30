import { useFetcher } from "react-router-dom";
import { useFormik } from "formik";
import { newsletterForm } from "../../../schemas/index";

import classes from "./Newsletter.module.css";

const Newsletter = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const onSubmit = (data) => {
    fetcher.submit(data, { method: "post", action: "/newsletter" });
  };

  const buttonState = isSubmitting
    ? "Signing up..."
    : fetcher.data && fetcher.data.status === 201
    ? "Signed up ✔"
    : "Sign up";

  const { values, errors, handleChange, handleBlur, touched, handleSubmit } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: newsletterForm,
    onSubmit,
  });

  return (
    <div className={classes.footer__newsletter}>
      <h2>Sign up for our newsletter</h2>
      <fetcher.Form onSubmit={handleSubmit}>
        <input
          value={values.email}
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Type your email"
          name="email"
          className={`${classes["form-input"]} ${
            errors.email && touched.email && classes.invalid
          }`}
        />
        {fetcher.data && fetcher.data.error ? (
          <p className={`${classes["error-info"]} ${classes.invalid}`}>
            {fetcher.data.error.message}
          </p>
        ) : (
          <p className={classes["error-info"]}>&nbsp;</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting || (fetcher.data && fetcher.data.status === 201)}
        >
          {buttonState}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default Newsletter;

export const action = async ({ request }) => {
  const data = await request.formData();
  const email = data.get("email");

  const response = await fetch("http://localhost:8080/newsletter/signup", {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return response;
};
