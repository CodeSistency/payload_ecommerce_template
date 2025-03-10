"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchClientFunc } from "../../fetchClient";

export const useQueryWithFetchHook = <T>({
	key,
	url,
	enabled,
	staleTime = 1000,

	effect = [],
}: {
	key: string;
	url: string;
	enabled?: boolean;
	staleTime?: number;
	effect?: any[];
}) => {
	const getData = async () => {
		return fetchClientFunc<T>({ method: "GET", url, cache: "no-cache" });
	};

	return useQuery<T, Error>({
		queryKey: [`${key}Get`, ...effect],
		queryFn: getData,
		refetchOnWindowFocus: false,
		enabled: enabled,
		staleTime: staleTime,
	});
};
