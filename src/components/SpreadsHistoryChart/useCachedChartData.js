import { useState, useEffect } from "react";

export const MAX_HISTORY_LENGTH = 10;

const useCachedChartData = (initialData) => {
  const [cachedData, setCachedData] = useState(initialData);

  useEffect(() => {
    const storedData = localStorage.getItem("cachedChartData");
    if (storedData) {
      setCachedData(JSON.parse(storedData));
    }
  }, []); // Dependencia vacía para que se ejecute solo en el montaje

  useEffect(() => {
    // Almacenar datos en localStorage cada vez que cambie cachedData
    localStorage.setItem("cachedChartData", JSON.stringify(cachedData));
  }, [cachedData]); // Dependencia de cachedData

  return [cachedData, setCachedData];
};

export default useCachedChartData;
