import React from "react";
import { useQuery } from "react-query";
import { fetchMarketSpreadHistorical } from "../services";

export default function useSpreadHistoryQuery() {
  return useQuery("getSpreadsHistoryQuery", fetchMarketSpreadHistorical, {
    refetchOnWindowFocus: false,
    refetchInterval: 60000,
    enabled: true,
  });
}
