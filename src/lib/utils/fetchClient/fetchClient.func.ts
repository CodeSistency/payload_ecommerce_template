import { FetchClientFuncType } from "./fetchClient.types";

export async function fetchClientFunc<T>({
	method,
	url,
	timeout = 10000,
	cache,
}: FetchClientFuncType): Promise<T> {
	const controller = new AbortController();

	const timeoutId = setTimeout(() => controller.abort(), timeout);

	try {
		const response = await fetch(url, {
			method,
			signal: controller.signal,
			cache,
		});

		if (!response.ok) {
			throw new Error(
				`HTTP error! Status: ${response.status}, ${response.statusText}`,
			);
		}

		const data: T = await response.json();

		return data;
	} finally {
		clearTimeout(timeoutId);
	}
}
