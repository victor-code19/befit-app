import Contact from "../components/UI/Contact/Contact";

const ContactPage = () => {
  return <Contact />;
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const contactFormData = {
    name: formData.get("firstName"),
    surname: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phoneNumber"),
    message: formData.get("message"),
  };

  const response = await fetch("http://localhost:5000/predict", {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactFormData),
  });

  if (!response.ok) {
    console.log("ERROR");
  }

  return response;
};

export default ContactPage;
