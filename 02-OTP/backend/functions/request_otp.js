const admin = require('firebase-admin');
const twilio = require('./twilio');

const requestOneTimePassword = (req, res) => {
	if (!req.body.phone) {
		return res.status(422).send({ error: 'You must provide a phone number' });
	}

	const phone = String(req.body.phone).replace(/[^\d]/g, '');

	admin
		.auth()
		.getUser(phone)
		.then((UserRecord) => {
			const code = Math.floor(Math.random() * 8999 + 1000);

			// Twilio doesn't support promises so we pass in a callback instead
			twilio.messages.create(
				{
					body: `Your code is ${code}`,
					to: `+${phone}`,
					from: '+19035683985',
				},
				(error) => {
					if (error) {
						return res.status(422).send(error);
					}

					// In Firebase we can't use save abitrary data to user models
					// We create new collection (users) with phone as a field
					// We save code and also set code validity to true (might be better to set a time expires too)
					admin
						.database()
						.ref('users/' + phone)
						.update({ code, codeValid: true }, () => {
							res.send({ success: true });
						});
				}
			);
		})
		.catch((error) => {
			res.status(422).send({ error });
		});
};

module.exports = requestOneTimePassword;
