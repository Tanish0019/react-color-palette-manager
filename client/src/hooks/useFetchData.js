import { useEffect, useState } from 'react';
import Axios from 'axios';

export default function useFetchData(url) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const [error, setError] = useState(false);

	const fetchData = async (url) => {
		try {
			setLoading(true);
			setError(false);
			const res = await Axios.get(url, { withCredentials: true });
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
	};

	useEffect(() => {
		fetchData(url);
	}, [url]);

	return [data, loading, error];
}
