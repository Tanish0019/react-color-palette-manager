const User = require('../models/user');
const Palette = require('../models/palette');

module.exports = {
	fetchAll: async (req, res, next) => {
		try {
			const userID = req.user.id;
			// TODO: CHECK WITH req.user.id
			const data = await User.findById(userID)
				.populate({
					path:'palettes',
					select: 'paletteName colors',
					options: {
						sort: {
							createdAt: -1
						}
					}
				})
				.select('palettes -_id');
			
			const palettes = data.palettes;
			
			return res.status(200).json({
				success: true,
				palettes
			});
		
		} catch (err) {
			console.log(err)
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
			const userID  = req.user.id;
			
			const newPaletteData = req.body;
			const newPalette = new Palette(newPaletteData);
			
			const savedPalette = await newPalette.save();
			
			const user = await User.findById(userID);
			
			user.palettes.push(savedPalette.id);
			
			await user.save();
			
			return res.status(200).json({
				success: true,
				palette: savedPalette,
				message: "Palette Created!"
			});
		} catch (err) {
			next(new Error(err));
		}
	},

	deletePalette: async(req, res, next) => {
		try {
			const { paletteID } = req.params;
			const userID = req.user.id;
			console.log("controller");
			
			const palette = await Palette.findOneAndRemove({_id: paletteID});

			if (!palette) {
				return res.status(404).json({
					success: false,
					message: "Palette does not exist"
				});
			}

			await User.update(
				{_id: userID},
				{"$pull": {"palettes": paletteID}}
			);
			
			return res.status(200).json({ success: true, message: "Palette Successfully Deleted!" });
			
		} catch(err) {
			next(new Error(err));
		}
	}
};