from sendgrid.helpers.mail import Mail
from sendgrid import SendGridAPIClient


def send_email(data):
    name, surname, email, phone, message = data.values()
    clientMessage = Mail(
        from_email='befit.contact5@gmail.com',
        to_emails='befit.contact5@gmail.com',
        subject='Contact Form - BeFit',
        html_content=f"Name: {name} {surname}<br>Email: {email}<br>Phone Number: {phone if phone else 'Not specified'}<br>Message: {message}")

    acknowledgementMessage = Mail(
        from_email='befit.contact5@gmail.com',
        to_emails=email,
        subject='BeFit - acknowledgment of message delivery',
        html_content='''Thank you for your message. We acknowledge receipt and inform you that we will contact you shortly. 
        In the meantime, if you have additional questions or comments, please do not hesitate to contact us.'''
    )
    try:
        sg = SendGridAPIClient(
            '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')
        sg.send(clientMessage)
        sg.send(acknowledgementMessage)
    except Exception as e:
        print(e.message)
