import sgMail from '@sendgrid/mail';

export class EmailService {
  constructor(private sendGridApiKey: string) {
    sgMail.setApiKey(sendGridApiKey);
  }

  sendWelcomeEmail = async (user: { email: string; firstName: string }) => {
    try {
      await sgMail.send({
        to: user.email,
        from: 'befit.contact5@gmail.com',
        subject: 'BeFit - Welcome',
        text: `Welcome ${user.firstName} on our website.`,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
// exports.sendOrderEmail = async (orderInfo, user) => {
//   try {
//     await sgMail.send({
//       to: user.email,
//       subject: 'New Order',
//       from: 'befit.contact5@gmail.com',
//       text: `We recieved your order ${user.firstName}. Our team will contact with yout shortly.`,
//     });

//     await sgMail.send({
//       to: 'befit.contact5@gmail.com',
//       subject: `New Order #${orderInfo._id}`,
//       from: 'befit.contact5@gmail.com',
//       text: `Order ID: ${orderInfo._id}<br>Customer: ${user.firstName} ${user.lastName} ${user.email}`,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
