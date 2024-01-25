export function SpreadCard({ market }) {
  const {
    market_id,
    spread,
    previous_spread,
    spread_direction,
    spreads_difference,
  } = market;
  return (
    <div className="flex flex-col sm:flex-row py-2 border border-gray-200 w-full justify-between shadow-md rounded-md">
      <SpreadCell header="Market ID" value={market_id} />
      <SpreadCell header="Value" value={spread || "Sin datos"} />
      <SpreadCell
        header="Previous Value"
        value={previous_spread || "Sin datos"}
      />
      <SpreadCell
        header="Spread Difference"
        value={spreads_difference}
      />
      <SpreadCell
        header="Spread Direction"
        value={spread_direction}
      />
    </div>
  );
}

export function SpreadCell({ header, value }) {
  return (
    <div className="flex sm:flex-col w-full justify-between items-start px-2 gap-2">
      <p className="text-[13px]">{header}</p>
      <p className="text-[9px]">{value}</p>
    </div>
  );
}
