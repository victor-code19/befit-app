import * as yup from "yup";

const nameRegex = /^[A-Za-z]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{7,}$/;

export const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Required")
    .matches(nameRegex, { message: "Please enter valid name" }),
  lastName: yup
    .string()
    .required("Required")
    .matches(nameRegex, { message: "Please enter valid name" }),
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(7)
    .matches(passwordRegex, { message: "Please create a stronger password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Required"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup.string().required("Required"),
});

export const contactFormSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Required")
    .matches(nameRegex, { message: "Please enter valid name" }),
  lastName: yup
    .string()
    .required("Required")
    .matches(nameRegex, { message: "Please enter valid name" }),
  email: yup.string().email("Please enter a valid email").required("Required"),
  phoneNumber: yup.string().min(9),
  message: yup.string().required("Required"),
});

export const newsletterForm = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
});

export const BmiSchema = yup.object().shape({
  height: yup.number().required("Required"),
  weight: yup.number().required("Required"),
});

export const BmrSchema = yup.object().shape({
  age: yup.number().required("Required"),
  height: yup.number().required("Required"),
  weight: yup.number().required("Required"),
});
