import React, { useState, useEffect, createContext, useContext } from 'react';
import { useUser } from './UserContext';
import Axios from 'axios';

const PaletteContext = createContext();
const PaletteDispatchContext = createContext();

export function PaletteProvider({children}) {
	const [palettes, setPalettes] = useState([]);
	const [singlePalette, setSinglePalette] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const { authenticated, user } = useUser();
	
	useEffect(() => {
		console.log("PALETTE USE EFFECT CALLED")
		const fetchPalettes = async() => {
			try {
				setLoading(true);
				setError(false);
				const res = await Axios.get(`/api/palette/fetchAll`);
				if (res.data.success) {
					setPalettes(res.data.palettes);
				} else {
					setError(true);
				}
			} catch (err) {
				setError(true);
			} finally {
				setLoading(false);
			}
		}
		if (authenticated) {
			fetchPalettes();
		} else {
			setPalettes([]);
		}
	}, [authenticated]);
	
	const deletePalette = (paletteID) => {
		// TODO: ADD API CALL TO DELETE
		const newPalettes = palettes.filter(palette => palette._id !== paletteID);
		setPalettes(newPalettes);
	}

	const savePalette = (newPalette) => {
		// TODO: ADD API CALL TO SAVE
		const newPalettes = [newPalette, ...palettes];
		setPalettes(newPalettes);
	}

	const value = {
		palettes,
		singlePalette,
		loading,
		error
	}

	const dispatch = {
		savePalette,
		deletePalette
	};

	console.log(value)
	return (
		<PaletteContext.Provider value={value}>
			<PaletteDispatchContext.Provider value={dispatch}>
				{children}
			</PaletteDispatchContext.Provider>
		</PaletteContext.Provider>
	);
}

export const usePalette = () => useContext(PaletteContext);
export const usePaletteDispatch = () => useContext(PaletteDispatchContext);