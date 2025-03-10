export interface FetchClientFuncType {
	url: string;
	method: "GET" | "POST";
	timeout?: number;
	cache?: RequestCache;
}