const admin = require('firebase-admin');
const serviceAccount = require('./service_account.json');
const functions = require('firebase-functions');
const createUser = require('./create_user');
const requestOneTimePassword = require('./request_otp');
const verifyOneTimePassword = require('./verify_otp');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'http://localhost:5004/?ns=react-native-advanced-otp',
});

exports.createUser = functions.https.onRequest(createUser);
exports.requestOneTimePassword = functions.https.onRequest(requestOneTimePassword);
exports.verifyOneTimePassword = functions.https.onRequest(verifyOneTimePassword);
