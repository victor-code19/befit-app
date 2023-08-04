const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmail = async (emailData) => {
  try {
    await sgMail.send({
      ...emailData,
      from: "befit.contact5@gmail.com",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.sendOrderMessages = async (orderInfo, user) => {
  try {
    await sgMail.send({
      to: user.email,
      subject: "New Order",
      from: "befit.contact5@gmail.com",
      text: `We recieved your order ${user.firstName}. Our team will contact with yout shortly.`,
    });

    await sgMail.send({
      to: "befit.contact5@gmail.com",
      subject: `New Order #${orderInfo._id}`,
      from: "befit.contact5@gmail.com",
      text: `Order ID: ${orderInfo._id}<br>Customer: ${user.firstName} ${user.lastName} ${user.email}`,
    });
  } catch (error) {
    console.log(error);
  }
};
