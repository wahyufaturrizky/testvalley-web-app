import { useQuery } from "@tanstack/react-query";
import { client } from "./client";

const fetchMainBannerAll = async ({ query = {} }) => {
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
  });
};

const fetchMainShortcutAll = async ({ query = {} }) => {
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
  });
};

const fetchCollections = async ({ query = {} }) => {
  return client("/main-shortcut/all", {
    params: {
      ...query,
    },
  }).then((data) => data);
};

const useCollections = ({ query = {}, options }: any = {}) => {
  return useQuery({
    queryKey: ["main-shortcut-all", query],
    queryFn: () => fetchCollections({ query }),
    ...options,
  });
};

export { useMainBannerAll, useMainShortcutAll, useCollections };
