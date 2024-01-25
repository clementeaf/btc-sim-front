import axios from "axios";
import { addMonths, format, parseISO } from "date-fns";
import * as Yup from "yup";

export function generateTimestamps(startDate, endDate) {
  const timestamps = [];

  const fechaInicio = parseISO(startDate);
  const fechaFin = parseISO(endDate);

  let currentDate = fechaInicio;

  while (currentDate <= fechaFin) {
    const timestamp = currentDate.getTime();
    const dia = format(currentDate, "dd");
    const mes = format(currentDate, "MM");
    const año = format(currentDate, "yyyy");

    timestamps.push(timestamp);

    currentDate = addMonths(currentDate, 1);
  }

  return timestamps;
}

export function calculatePortfolioReturns(prices, amounts) {
  const returns = [];

  for (let i = 1; i < prices.length; i++) {
    const initialPrice = prices[i - 1];
    const finalPrice = prices[i];
    const monthlyReturn = ((finalPrice - initialPrice) / initialPrice) * 100;

    const investedAmount = amounts[i - 1];
    const portfolioValue = investedAmount * (1 + monthlyReturn / 100);

    returns.push(portfolioValue);
  }

  return returns;
}

export function calculatePortfolioMetrics(bitcoinPrices, investedAmounts) {
  const results = [];

  for (let i = 0; i < bitcoinPrices.length; i++) {
    const initialBitcoinPrice = i > 0 ? bitcoinPrices[i - 1] : bitcoinPrices[i];
    const finalBitcoinPrice = bitcoinPrices[i];
    const investedAmount = investedAmounts[i];

    // Calcular la diferencia de "BITCOIN PRECIO"
    const priceDifference = finalBitcoinPrice - initialBitcoinPrice;

    // Calcular la proporción mediante la cual se llega al "VALOR DEL PORTAFOLIO"
    const portfolioProportion = i === 0 ? 1 : 1 + (priceDifference / initialBitcoinPrice);

    // Calcular el "VALOR DEL PORTAFOLIO"
    const portfolioValue = i === 0 ? investedAmount : investedAmount * portfolioProportion;

    // Calcular el "Cambio $" y el "Cambio %"
    const changeAmount = i > 0 ? portfolioValue - investedAmount : 0;
    const changePercentage = i > 0 ? (changeAmount / investedAmount) * 100 : 0;

    // Agregar los resultados al arreglo
    results.push({
      priceDifference,
      portfolioProportion,
      portfolioValue,
      changeAmount,
      changePercentage,
    });
  }

  return results;
}



export async function fetchBitcoinPricesfromTimeStamps(
  timestamps,
  getBTCCLPprice,
  setPriceAndTimeData,
  setLoading
) {
  try {
    const prices = await Promise.all(
      timestamps.map(async (timestamp) => {
        const response = await axios.get(
          `${getBTCCLPprice}?timestamp=${timestamp}`
        );
        return response.data;
      })
    );
    setPriceAndTimeData(prices);
    setLoading(false);
  } catch (error) {
    console.error("Error al obtener precios:", error);
    setLoading(false);
  }
}
export function useCachedData(data) {
  const cachedDataFromStorage =
    JSON.parse(localStorage.getItem("cachedData")) || {};

  if (!Object.keys(cachedDataFromStorage).length) {
    return data || {};
  } else {
    return cachedDataFromStorage;
  }
}

export const validationSchema = Yup.object({
  amount: Yup.number().required("Ingrese la cantidad a invertir"),
  startDate: Yup.date().required("Seleccione la fecha de inicio"),
  endDate: Yup.date().required("Seleccione la fecha final"),
});

export const initialValues = {
  cryptocurrency: "Bitcoin",
  amount: "",
  frequency: "monthly",
  startDate: "",
  endDate: "",
  compareWithBitcoin: false,
};
