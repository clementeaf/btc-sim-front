import React, { useEffect, useState, useCallback } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ErrorMarketsSpreads, LoadingMarketsSpreads } from "../CustomStateManage";
import getChartOptions from "./chartsOptions";
import useSpreadHistoryQuery from "../../hooks/useSpreadsHistoryQuery";
import useCachedChartData, { MAX_HISTORY_LENGTH } from "./useCachedChartData";

export default function SpreadsHistoryChart () {
  const [query, setQuery] = useState(null);
  const { isLoading, isError, data } = useSpreadHistoryQuery(query);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [cachedData, setCachedData] = useCachedChartData([]);

  const updateCachedData = useCallback(
    (newData) => {
      setCachedData((prevData) => {
        const updatedData = [...prevData, ...newData];

        // Eliminar el spread más antiguo si se excede la longitud máxima
        if (updatedData.length > MAX_HISTORY_LENGTH) {
          updatedData.splice(0, updatedData.length - MAX_HISTORY_LENGTH);
        }

        return updatedData;
      });
    },
    [setCachedData]
  );

  useEffect(() => {
    if (data && data.length > 0) {
      // Actualizar el estado local con los nuevos datos
      updateCachedData(data);
    }
  }, [data, updateCachedData]);

  const uniqueMarkets = [...new Set(cachedData.map((item) => item.market_id))];
  const options = getChartOptions(cachedData, selectedMarket, uniqueMarkets);

  useEffect(() => {
    // Función para establecer la consulta después de 1 minuto de inactividad
    const timeoutId = setTimeout(() => {
      setQuery(selectedMarket);
    }, 60000); // 1 minuto

    // Limpiar el temporizador en cada cambio de selectedMarket
    return () => clearTimeout(timeoutId);
  }, [selectedMarket]);

  return (
    <div className="flex flex-col w-[350px] sm:w-[750px] md:w-[800px] gap-4">
      <div>
        <label htmlFor="marketSelector">Selecciona un market_id: </label>
        <select
          id="marketSelector"
          onChange={(e) => setSelectedMarket(e.target.value)}
        >
          <option value="">Todos</option>
          {uniqueMarkets.map((market) => (
            <option key={market} value={market}>
              {market}
            </option>
          ))}
        </select>
      </div>
      {isError ? (
        <ErrorMarketsSpreads />
      ) : isLoading ? (
        <LoadingMarketsSpreads message="Cargando datos..." />
      ) : (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  );
};

