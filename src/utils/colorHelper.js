import chroma from 'chroma-js';

// We have 11 levels for our colors
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

// We start by using the palette object format in the default palette file
// We take the colors object and for each level we add an array
/* 
	colors: {
		50: [
			{name, id, hex, rgb}
			and object of all other color 50 levels
		],
		100 : [
			{name, id, hex, rgb}
		]
	}
*/

// Our first level is going to be all white
// So we don't add it

// Main function
const generatePalette = (starterPalette) => {
	
	let newPalette = {
		paletteName: starterPalette.paletteName,
		id: starterPalette.id,
		emoji: starterPalette.emoji,
		colors: {}
	};

	for (let level of levels) {
		if (level !== 50)
			newPalette.colors[level] = [];
	}

	for (let color of starterPalette.colors) {
		let scale = generateScale(color.color, 11);
		
		for (let i in scale) {
			// Ignoring the all white level
			if (i !== '0') {
				newPalette.colors[levels[i]].push({
					name: `${color.name} ${levels[i]}`,
					id: color.name.toLowerCase().replace(/ /g, "-"),
					hex: scale[i],
					rgb: chroma(scale[i]).css()
				})
			}
		}
	}
	return newPalette;
}

// RETURNS THE RANGE OF THE COLORS
// We go from color.darken(1.4) --- color --- white
// to have a good balance of all saturations
const getRange = (hexColor) => {
	const rangeEnd = '#fff';
	
	return [
		chroma(hexColor).darken(2.5).hex(),
		hexColor,
		rangeEnd
	]
}

// Creates a scale of number of colors passed to the function
// Ranging from the range we got back from the get range function
const generateScale = (hexColor, numberOfColors) => {
	return chroma.scale(getRange(hexColor))
	.mode('lab')
	.colors(numberOfColors)
	.reverse();
}

export { generatePalette };