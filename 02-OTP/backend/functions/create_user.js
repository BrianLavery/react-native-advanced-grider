const admin = require('firebase-admin');
const { phone } = require('phone');

createUser = (req, res) => {
	// Verify that user provided phone
	if (!req.body.phone) {
		return res.status(422).send({ error: 'Must provide a phone number' });
	}

	if (!phone(req.body.phone).isValid) {
		return res.status(422).send({ error: 'Not a valid phone number' });
	}

	// Format phone number to remove dashes parens plus's spaces
	const phoneNumber = String(req.body.phone).replace(/[^\d]/g, '');

	// Create new user account using phone number - set as ID, asynchronous request
	admin
		.auth()
		.createUser({ uid: phoneNumber })
		.then((user) => res.send(user))
		.catch((error) => res.status(422).send({ error }));

	// Respond to user request saying account was made
};

module.exports = createUser;

// Emergency Calling Enablement
// To avoid a $75.00 fee per each Emergency Call, this number requires the addition of an emergency address after purchase. You can add an address in the Phone Number's page.
// +1 903 568 3985
