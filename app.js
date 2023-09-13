const express = require('express');
const app = express();
const { getFirestore } = require('firebase-admin/firestore');
const admin = require("firebase-admin");

// Initializing Firebase
admin.initializeApp({
	credential: admin.credential.cert(JSON.parse(process.env.SERVICE_GOOGLE_ACCOUNT_KEY)),
	databaseURL: "https://yutokqzmnidska-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = getFirestore();

// Handling CORS
const whitelist = ['https://olmoscodes.com', 'http://localhost:4200']
const corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	}
}

// route for handling requests from the Angular client
app.get('/api/message', (req, res) => {
	res.json({ message:
			'Hello GEEKS FOR GEEKS Folks from the Express server!' });
});

app.listen(3000, () => {
	console.log('Server listening on port 3000');
});
