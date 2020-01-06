import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();
export function UserProvider(props) {
	const [authenticated, setAuthenticated] = useState(false);
	const [user, setUser] = useState(null);
	
	const dummyData = {
		displayName: "Tanish Grover",
		id: "5e10a821bcfb6cc9b5b80f51"
	};

	useEffect(() => {
		if (localStorage.getItem("access_token")) {
			// TODO: ADD JWT LOGIC OVER HERE
			setAuthenticated(true);
			setUser(dummyData);
		} else {
			setAuthenticated(false);
			setUser(null);
		}
	}, []);

	const defaultContext = {
		authenticated, 
		user
	}
	return (
		<UserContext.Provider value={defaultContext}>
			{props.children}
		</UserContext.Provider>
	);
}

export const useUser = () => useContext(UserContext);