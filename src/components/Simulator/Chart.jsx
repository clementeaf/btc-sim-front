import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import useTimestampsStore from "../../stores/useTimestampsStore";
import getChartOptionsV2 from "./chartOptionsV2";
import { mockOptions } from "./mockPortfolio";
import usePortfolioMath from "../../hooks/usePortfolioMath";

export default function Chart() {
  const amountSumArray = useTimestampsStore((state) => state.amountSumArray);
  const { portfolioReturns, loading } = usePortfolioMath();

  const options = !loading &&
    amountSumArray.length > 0 && portfolioReturns
      ? getChartOptionsV2(amountSumArray, portfolioReturns)
      : mockOptions;

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
