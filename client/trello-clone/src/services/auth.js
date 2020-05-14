const API_URL = 'http://localhost:3000'

async function login(username, password) {
		const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password })
		};

		return await fetch(`${API_URL}/login`, requestOptions)
				.then(handleResponse)
				.then(user => {
						// login successful if there's a jwt token in the response
						if (user.accessToken) {
								// store user details and jwt token in local storage to keep user logged in between page refreshes
								localStorage.setItem('jwt', user.accessToken);
						}
						return user;
				});  
}

async function register(username, password) {
	const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
	};

	return await fetch(`${API_URL}/users`, requestOptions)
			.then(handleResponse)
			.then(user => console.log(user));  
}

function logout() {
	localStorage.removeItem('user');
}

function handleResponse(response) {
		return response.text().then(text => {
				const data = text && JSON.parse(text);
				if (!response.ok) {
						if (response.status === 401) {
								// auto logout if 401 response returned from api
								logout();
								location.reload(true);
						}

						const error = (data && data.message) || response.statusText;
						return Promise.reject(error);
				}

				return data;
		});
}

export default { login, logout, register};