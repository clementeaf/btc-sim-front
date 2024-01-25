import { useCachedData } from "../utils";
import useSpreadAlertQuery from "./useSpreadAlertQuery";

export const useSpreadsTable = () => {
  const { data, isError, isLoading } = useSpreadAlertQuery();
  const cachedData = useCachedData(data);

  return { data, cachedData, isError, isLoading };
};

export const updateDataWithQueryResults = (prevData, queryResults) => {
  const newData = { ...prevData };

  if (queryResults) {
    queryResults.forEach((market) => {
      newData[market.market_id] = market;
    });
  }

  return newData;
};
