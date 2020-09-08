import React, { createContext, useState, useContext, useEffect } from 'react';
import Axios from 'axios';

const UserContext = createContext();

export function UserProvider(props) {
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUser = async () => {
			setLoading(true);
			try {
				const res = await Axios.get('/api/auth/user', { withCredentials: true });
				if (res.data.success) {
					setUserData(res.data.user);
				}
			} catch (err) {
				console.log(err);
				setUserData(null);
			} finally {
				setLoading(false);
			}
		};
		fetchUser();
	}, []);

	const login = (user) => {
		setUserData(user);
	};

	const logout = async () => {
		try {
			const res = await Axios.get('/api/auth/logout', { withCredentials: true });
			if (res.data.success) {
				setUserData(null);
			} else {
				throw new Error('Could not logout user!');
			}
		} catch (err) {
			console.log(err);
		}
		setUserData(null);
	};

	const defaultContext = {
		loading,
		userData,
		login,
		logout,
	};

	return <UserContext.Provider value={defaultContext}>{props.children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
