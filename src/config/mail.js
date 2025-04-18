const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
});

const sendEmail = async (to, subject, text) => {
  try {
    const messageData = {
      from: 'EO APP <noreply@sandboxac80e5598d7c46b68facfa668b079cd3.mailgun.org>',
      to: [to],
      subject: subject,
      text: text,
    };

    const response = await mg.messages.create('sandboxac80e5598d7c46b68facfa668b079cd3.mailgun.org', messageData);
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(error.message);
  }
};

module.exports = sendEmail;
