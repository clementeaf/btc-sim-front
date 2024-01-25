const getChartOptionsV2 = (amountSumArray, portfolioReturns) => {
  // Extraer solo los valores de portfolioValue parseados a entero
  let portfolioValues = portfolioReturns.map((item) => parseInt(item.portfolioValue));

  // Asegurar que el primer valor de la serie de retorno sea 0
  portfolioValues[0] = 0;

  // Asegurar la misma longitud de ambos arreglos
  const minLength = Math.min(amountSumArray.length, portfolioValues.length);
  amountSumArray = amountSumArray.slice(0, minLength);
  portfolioValues = portfolioValues.slice(0, minLength);

  const minY = Math.min(...amountSumArray);
  const maxY = Math.max(...amountSumArray);
  const minYPortfolio = Math.min(...portfolioValues);
  const maxYPortfolio = Math.max(...portfolioValues);

  return {
    chart: {
      height: 605,
      backgroundColor: "#ffffff",
      type: "area",
    },
    title: {
      text: "Crypto-Calculadora / Dollar Cost Averaging",
    },
    legend: { enabled: false },
    credits: {
      enabled: false,
    },
    xAxis: {
      type: "category",
      categories: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      labels: {
        rotation: -45,
      },
    },
    yAxis: {
      title: {
        text: "Spread",
      },
      min: Math.min(minY, minYPortfolio),
      max: Math.max(maxY, maxYPortfolio),
      startOnTick: false,
      labels: {
        formatter: function () {
          return this.value;
        },
      },
    },
    plotOptions: {
      area: {
        fillOpacity: 0.3,
        marker: {
          enabled: false,
        },
        lineWidth: 0.5,
        color: "#f8b76a",
        stacking: "normal",
        marker: {
          enabled: true,
          symbol: "circle",
          radius: 3,
          fillColor: "#ff9900",
          lineColor: "#3d2000",
          lineWidth: 1,
        },
      },
    },
    series: [
      {
        name: "Amount Sum",
        data: amountSumArray,
        type: "line",
        color: "#ff0000",
      },
      {
        name: "Portfolio Values",
        data: portfolioValues,
        type: "areaspline",
        color: "#f8b76a",
      },
    ],
  };
};

export default getChartOptionsV2;
