import { useEffect, useState } from "react";
import useTimestampsStore from "../stores/useTimestampsStore";
import { getBTCCLPprice } from "../services";
import {
  calculatePortfolioMetrics,
  fetchBitcoinPricesfromTimeStamps,
} from "../utils";

export default function usePortfolioMath() {
  const timestamps = useTimestampsStore((state) => state.timestamps);
  const amountSumArray = useTimestampsStore((state) => state.amountSumArray);
  const [priceAndTimeData, setPriceAndTimeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (timestamps.length > 0) {
      fetchBitcoinPricesfromTimeStamps(
        timestamps,
        getBTCCLPprice,
        setPriceAndTimeData,
        setLoading
      );
    }
  }, [timestamps]);

  const bitcoinPrices = priceAndTimeData.map(({ price }) => price);

  const portfolioReturns = calculatePortfolioMetrics(
    bitcoinPrices,
    amountSumArray
  );

  return { portfolioReturns, bitcoinPrices, loading };
}
