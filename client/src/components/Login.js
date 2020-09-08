import React, { useState } from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login';
import { Typography } from '@material-ui/core';
import Page from './Page';
import { useUser } from '../contexts/UserContext';
import MainNavbar from './MainNavbar';
import Loader from './Loader';

const Login = () => {
	const [loading, setLoading] = useState(false);

	const { login } = useUser();
	const handleSuccess = async (response) => {
		const tokenId = response.tokenId;
		try {
			setLoading(true);
			const res = await Axios.post('/api/auth/google-login', { tokenId });
			if (res.data.success) {
				login(res.data.user);
			} else {
				throw new Error();
			}
		} catch (err) {
			toast.error('Some Error Occurred!');
		} finally {
			setLoading(false);
		}
	};

	const handleFailure = (response) => {
		console.log(response);
		if (response.error !== 'popup_closed_by_user') {
			toast.error('Some Error Occurred!');
		}
	};

	return (
		<Page>
			<MainNavbar />
			<div
				style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
			>
				<div style={{ textAlign: 'center' }}>
					{loading ? (
						<Loader size={60} thickness={3.6} />
					) : (
						<>
							<Typography variant='h4'>Get started with React Palette!</Typography>
							<GoogleLogin
								clientId='667907039901-gnar4chge39lpirj2k43itgah2g5o30v.apps.googleusercontent.com'
								buttonText='Login with Google'
								onSuccess={handleSuccess}
								onFailure={handleFailure}
								cookiePolicy={'single_host_origin'}
							/>
						</>
					)}
				</div>
			</div>
		</Page>
	);
};

export default Login;
