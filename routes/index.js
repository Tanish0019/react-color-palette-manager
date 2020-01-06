const express = require("express");
const authRoutes = require("./authRoutes");
const paletteRoutes = require('./paletteRoutes');
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/palette", paletteRoutes);

router.use("*", (req, res) => {
	res.status(404).json({
		success: false,
		message: "Not Found"
	});
});

router.use((err, req, res) => {
	console.log(err.stack);
	res.status(500).json({
		success: false,
		message: "Internal App Error"
	});
});


module.exports = router;