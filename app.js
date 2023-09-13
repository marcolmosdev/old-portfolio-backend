const express = require('express');
const app = express();
const { getFirestore } = require('firebase-admin/firestore');
const admin = require("firebase-admin");
const cors = require("cors");

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

// GET method to get all works
app.get('/api/works', cors(corsOptions), async (req, res) => {
	const snapshot = await db.collection('works').get();

	let arrayOfDocs = [];

	if (snapshot.empty) {
		console.log("No matching works.");
	} else {
		snapshot.forEach(doc => {
			arrayOfDocs.push(doc.data());
		});
	}

	res.send(arrayOfDocs);
});

app.listen(3000, () => {
	console.log('Server listening on port 3000');
});
