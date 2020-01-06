const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)
const cookieParser = require("cookie-parser");
const passport = require('passport');
const morgan = require('morgan');
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
require('./authentication/passport');

const { mongodbURI, sessionSecret } = require('./configuration');

mongoose.Promise = global.Promise;
mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'Connection error:'))	
mongoose.connection.once('open', () => console.log("Connect to database!"));

const app = express();

app.use(cors({
	origin: "http://localhost:3000",
	credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use(session({
	secret: sessionSecret,
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV !== "production") {
	app.use(morgan("dev"));
}

app.use('/api', require('./routes'));

if (process.env.NODE_ENV === "production") {
	app.use(express.static('client/build'));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});