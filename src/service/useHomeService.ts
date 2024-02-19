import { DataResponseType } from "@/interface/home.interface";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { client } from "./client";

const fetchMainBannerAll = ({ query = {} }) => {
  return client("/main-banner/all", {
    params: {
      ...query,
    },
  }).then((data) => data);
};

const useMainBannerAll = ({ query = {}, options }: any = {}) => {
  return useQuery({
    queryKey: ["main-banner-all", query],
    queryFn: () => fetchMainBannerAll({ query }),
    ...options,
  }) as any;
};

const fetchMainShortcutAll = ({ query = {} }) => {
  return client("/main-shortcut/all", {
    params: {
      ...query,
    },
  }).then((data) => data);
};

const useMainShortcutAll = ({ query = {}, options }: any = {}) => {
  return useQuery({
    queryKey: ["main-shortcut-all", query],
    queryFn: () => fetchMainShortcutAll({ query }),
    ...options,
  }) as any;
};

const fetchCollections = ({ query = {} }) => {
  return client("/collections", {
    params: {
      ...query,
    },
  }).then((data) => data);
};

const useCollections = ({ query = {}, options }: any = {}): UseQueryResult<
  DataResponseType,
  Error
> => {
  return useQuery({
    queryKey: ["collections", query],
    queryFn: () => fetchCollections({ query }),
    ...options,
  });
};

export { useCollections, useMainBannerAll, useMainShortcutAll };
