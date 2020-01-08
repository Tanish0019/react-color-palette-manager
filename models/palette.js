const mongoose = require("mongoose");

const PaletteSchema = new mongoose.Schema(
	{
		paletteName: String,
		colors: [{ name: String, color: String }]
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("Palette", PaletteSchema);
