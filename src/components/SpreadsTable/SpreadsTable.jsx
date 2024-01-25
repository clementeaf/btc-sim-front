import React from "react";
import { LoadingMarketsSpreads, ErrorMarketsSpreads } from "../CustomStateManage";
import { SpreadCard } from "./TableCustomComponents";
import { useSpreadsTable } from "../../hooks/spreadsTableHooks";

export default function SpreadsTable() {
  const { data, isError, isLoading } = useSpreadsTable();

  return (
    <div className="flex flex-col w-[350px] sm:w-[750px] md:w-[800px] gap-3">
      <div className="flex w-full justify-center bg-blue-500 text-white rounded-md">
        <p>Markets Spread Analysis</p>
      </div>
      <div className="flex flex-col w-full h-[400px] overflow-y-scroll items-center gap-3 pr-4">
        {isLoading ? (
          <LoadingMarketsSpreads message="Cargando datos..."/>
        ) : isError ? (
          <ErrorMarketsSpreads />
        ) : (
          data && data.map((market, index) => (
            <SpreadCard key={index} market={market} />
          ))
        )}
      </div>
    </div>
  );
};
