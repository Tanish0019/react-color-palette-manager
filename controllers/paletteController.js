const User = require('../models/user');
const Palette = require('../models/palette');

module.exports = {
	fetchAll: async (req, res, next) => {
		try {
			const { userID } = req.params;
		
			// TODO: CHECK WITH req.user.id
			const data = await User.findById(userID).populate('palettes').select('palettes -_id');
			const palettes = data.palettes;
			return res.status(200).json({
				success: true,
				palettes
			});
		
		} catch (err) {
			return next(new Error(err));
		}
	},

	fetchOne: async (req, res, next) => {
		try {
			const { paletteID } = req.params;
			const palette = await Palette.findById(paletteID);
			if (palette) {
				return res.status(200).json({
					success: true,
					palette
				});	
			}

			return res.status(404).json({
				success: false,
				message: "No palette with given ID exists"
			})
			
		} catch (err) {
			return next(new Error("Could Not Fetch Palette"));
		}
	},
	
	newPalette: async (req, res, next) => {
		try {
			console.log(req.params);
			const { userID } = req.params;
			const newPaletteData = req.body;
			console.log(newPaletteData)
			const newPalette = new Palette(newPaletteData);
			const savedPalette = await newPalette.save();
			
			const user = await User.findById(userID);
			user.palettes.push(savedPalette.id);
			
			await user.save();
			
			return res.status(200).json({
				success: true,
				message: "Palette Created!"
			});
		} catch (err) {
			next(new Error(err));
		}
	},
	deletePalette: async(req, res, next) => {
		try {
			const { paletteID, userID } = req.params;
			// TODO: CHECK WITH REQ.USER.ID

			// const palette = await Palette.deleteOne({id: paletteID});
			
			// if (!palette) {
			// 	return res.status(404).json({
			// 		success: false,
			// 		message: "Palette does not exist"
			// 	})
			// }

			// console.log(user);

			// // await User.save();
			
			// return res.status(200).json({ success: true });
			
		} catch(err) {
			next(new Error(err));
		}
	}
}


// {
//     "paletteName": "Material UI Colors",
//     "colors": [
//       { "name": "red", "color": "#F44336" },
//       { "name": "pink", "color": "#E91E63" },
//       { "name": "purple", "color": "#9C27B0" },
//       { "name": "deeppurple", "color": "#673AB7" },
//       { "name": "indigo", "color": "#3F51B5" },
//       { "name": "blue", "color": "#2196F3" },
//       { "name": "lightblue", "color": "#03A9F4" },
//       { "name": "cyan", "color": "#00BCD4" },
//       { "name": "teal", "color": "#009688" },
//       { "name": "green", "color": "#4CAF50" },
//       { "name": "lightgreen", "color": "#8BC34A" },
//       { "name": "lime", "color": "#CDDC39" },
//       { "name": "yellow", "color": "#FFEB3B" },
//       { "name": "amber", "color": "#FFC107" },
//       { "name": "orange", "color": "#FF9800" }
//     ]
// }