const mongoose = require("mongoose");

const PaletteSchema = new mongoose.Schema({
	paletteName: String,
	paletteID: String,
	colors: [{ name: String, color: String }]
});

module.exports = mongoose.model("Palette", PaletteSchema);
