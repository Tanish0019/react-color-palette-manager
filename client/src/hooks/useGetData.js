import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useGetData(url) {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);
	const [error, setError] = useState(false);

	useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true);
				setError(false);
				const res = await axios.get(url);
				if (res.data.success) {
					setData(res.data);
				} else {
					setError(true);
				}
			} catch (err) {
				setError(true);
			} finally {
				setLoading(false);
			}
		}
		fetchData()
	}, []);

	return [loading, error, data, setData];
	
};