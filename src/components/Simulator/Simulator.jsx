import React from "react";
import CustomForm from "./CustomForm";
import Chart from "./Chart";
import usePortfolioMath from "../../hooks/usePortfolioMath";
import useTimestampsStore from "../../stores/useTimestampsStore";
import SimulatorTable from "./SimulatorTable";

export default function Simulator() {
  const { portfolioReturns, loading, bitcoinPrices } = usePortfolioMath();
  const timestamps = useTimestampsStore((state) => state.timestamps);
  const amountSumArray = useTimestampsStore((state) => state.amountSumArray);

  // Array de fechas en formato dd-mm-yyyy
  const dates = portfolioReturns.map((_, index) => {
    const date = new Date(timestamps[index]);
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;
    return formattedDate;
  });

  // Array de valores del portafolio (usando portfolioValue)
  const portfolioValues = portfolioReturns.map(
    (result) => result.portfolioValue
  );

  // Array de cambio $ (usando changeAmount)
  const changeAmounts = portfolioReturns.map((result) => result.changeAmount);

  // Array de cambio % (usando portfolioProportion)
  const changePercentages = portfolioReturns.map(
    (result) => result.portfolioProportion * 100 - 100
  );

  // Crear la tabla
  const tableData = dates.map((date, index) => ({
    index: index + 1,
    date: date,
    bitcoinPrice: bitcoinPrices[index],
    investedAmount: amountSumArray[index],
    portfolioValue: portfolioValues[index],
    changeValue: changeAmounts[index],
    changePercentage: changePercentages[index],
  }));

  return (
    <div className="flex flex-col w-full h-full gap-16">
      <div className="flex items-start h-full w-full justify-between">
        <div className="flex flex-col border border-black/10 rounded-md shadow-md w-[25%] min-h-[610px] p-4">
          <CustomForm />
        </div>
        <div className="flex flex-col w-[70%] border border-black/10 rounded-md shadow-md">
          <Chart />
        </div>
      </div>
      {!loading && (
        <div className="flex flex-col h-[800px] w-full items-start gap-4">
          <p className="text-lg font-bold">
            Ejecución detallada portafolio inversión Bitcoin DCA
          </p>
          <div className="flex w-full justify-between">
            <SimulatorTable data={tableData} />
          </div>
        </div>
      )}
    </div>
  );
}
