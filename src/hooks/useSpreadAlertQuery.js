import React from "react";
import { useQuery } from "react-query";
import { fetchMarketSpread } from "../services";

export default function useSpreadAlertQuery() {
  const { data, ...rest } = useQuery("getSpreadsQuery", fetchMarketSpread, {
    refetchOnWindowFocus: false,
    refetchInterval: 60000,
    enabled: true,
  });

  return { data, ...rest };
}
