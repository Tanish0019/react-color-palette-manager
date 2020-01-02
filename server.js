const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.port || 8000;



app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
})