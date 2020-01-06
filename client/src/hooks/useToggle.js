import { useState } from 'react';

export default function useToggle(initalValue = false) {
	const [state, setState] = useState(initalValue);
	const toggleState = () => {
		setState(!state);
	}
	return [state, toggleState];
}