const twilio = require('twilio');
const { accountSid, authToken } = require('./twilio_keys');

module.exports = new twilio.Twilio(accountSid, authToken);
