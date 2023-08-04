import { redirect, json } from "react-router-dom";
import Signup from "../components/UI/Signup/Signup";

const SignupPage = () => {
  return <Signup />;
};

export default SignupPage;

export const action = async ({ request }) => {
  const data = await request.formData();

  const registrationData = {
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8080/users/create", {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrationData),
  });

  if (response.status === 400) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Unable to sign up user" }, { status: 500 });
  }

  const responseData = await response.json();
  localStorage.setItem("token", responseData.token);
  return redirect("/");
};
