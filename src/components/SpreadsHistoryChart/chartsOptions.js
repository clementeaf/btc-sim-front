const getChartOptions = (data, selectedMarket, uniqueMarkets) => {
  if (!data) return null;

  const filteredData = selectedMarket
    ? data.filter((item) => item.market_id === selectedMarket)
    : data;

  const xAxisCategories = selectedMarket ? [selectedMarket] : uniqueMarkets;

  return {
    chart: {
      height: 600,
    },
    title: {
      text: "Spreads History Chart",
    },
    xAxis: {
      type: "category",
      categories: xAxisCategories,
    },
    yAxis: {
      title: {
        text: "Spread",
      },
    },
    series: filteredData.map(({ market_id, spreads_history }) => ({
      name: market_id,
      data: spreads_history,
      type: "line",
    })),
  };
};

export default getChartOptions;
