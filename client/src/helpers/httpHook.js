/* eslint-disable no-useless-catch */
export const useHttp = () => {
	const request = async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {

		try {
			const response = await fetch(url, { method, body, headers });
			const data = await response.json();

			if (!response.ok) {
				throw `${data.message}`
			}

			return data;
		} catch (e) {
			throw e;
		}
	};

	return { request }
}