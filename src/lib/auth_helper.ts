import { BASE_URL } from './utils';

export const login = async (data: Record<'username' | 'password', string>) => {
	/*
		Helper function to handle login
	*/
	const response = await fetch(`${BASE_URL}/api/auth/login/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			username: data.username,
			password: data.password,
		}),
	});
	return response;
};
