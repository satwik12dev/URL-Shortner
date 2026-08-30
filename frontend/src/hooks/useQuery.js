import { useQuery } from "react-query";
import api from "../api/api";

export const useFetchMyShortUrls = (token, onError) => {
  return useQuery(
    "my-shortenurls",
    async () => {
      return await api.get("/api/urls/myurls", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
    },
    {
      select: (data) => {
        const sortedData = data.data.sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        );
        return sortedData;
      },
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchTotalClicks = (token, onError) => {
  return useQuery(
    "url-totalclick",
    async () => {
      return await api.get(
        "/api/urls/totalClicks?startDate=2024-01-01&endDate=2030-12-31",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    },
    {
      select: (data) => {
        if (!data || !data.data) return [];
        const convertToArray = Object.keys(data.data).map((key) => ({
          clickDate: key,
          count: Number(data.data[key]) || 0,
        }));
        return convertToArray;
      },
      onError,
      staleTime: 5000,
    }
  );
};