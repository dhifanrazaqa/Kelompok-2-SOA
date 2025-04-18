const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);

// Setup Mailgun client
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
});

/**
 * Sends an email using the Mailgun API.
 * 
 * @module sendEmail
 * 
 * @async
 * @function
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The plain text content of the email.
 * 
 * @throws {Error} Throws an error if the email fails to send.
 * 
 * @return {Promise<Object>} The response from the Mailgun API after sending the email.
 */
const sendEmail = async (to, subject, text) => {
  try {
    // Send email from sandbox email
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
