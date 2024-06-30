import { useFormik } from "formik";
import { contactFormSchema } from "../../../schemas/index";
import { Form, useActionData, useNavigation, useSubmit } from "react-router-dom";

import classes from "./Contact.module.css";

const Contact = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const isSubmitting = navigation.state === "submitting";

  let result = null;

  if (data?.prediction_result === "spam") {
    result = (
      <span className={classes["spam-message"]}>
        This message was recognized as a spam. Please try again!
      </span>
    );
  } else if (data?.prediction_result === "not spam") {
    result = (
      <span className={classes["legit-message"]}>Thank you for your message.</span>
    );
  }

  const onSubmit = (data) => {
    submit(data, { method: "post" });
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
    validationSchema: contactFormSchema,
    onSubmit,
  });

  const renderErrorMessage = (fieldName) => {
    return errors[fieldName] && touched[fieldName] ? (
      <p className={classes["error-info"]}>{errors[fieldName]}</p>
    ) : (
      <p className={classes["error-info"]}>&nbsp;</p>
    );
  };

  return (
    <section className={classes["form-group"]}>
      <h1>
        CONTACT WITH <span>US</span>
      </h1>
      <Form onSubmit={handleSubmit}>
        <h2>Send a Message</h2>
        <div className={classes["form-controls"]}>
          <div className={classes["form-control"]}>
            <label htmlFor="name">First Name</label>
            <input
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              id="name"
              name="firstName"
              className={`${classes["form-input"]} ${
                errors.firstName && touched.firstName && classes.invalid
              }`}
            />
            {renderErrorMessage("firstName")}
          </div>
          <div className={classes["form-control"]}>
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
          </div>
          <div className={classes["form-control"]}>
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
            {renderErrorMessage("email")}
          </div>
          <div className={classes["form-control"]}>
            <label htmlFor="phone-number">Phone Number</label>
            <input
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              id="phone-number"
              name="phoneNumber"
              placeholder="Optional"
              className={`${classes["form-input"]} ${
                errors.phoneNumber && touched.phoneNumber && classes.invalid
              }`}
            />
            {renderErrorMessage("phoneNumber")}
          </div>
          <div className={classes["form-control"]}>
            <label>Message</label>
            <textarea
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              name="message"
              className={`${classes["form-textarea"]} ${
                errors.message && touched.message && classes.invalid
              }`}
            />
            {renderErrorMessage("message")}
          </div>
        </div>
        <div>
          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          {result}
        </div>
      </Form>
    </section>
  );
};

export default Contact;
