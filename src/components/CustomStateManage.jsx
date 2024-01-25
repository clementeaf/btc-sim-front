export function LoadingMarketsSpreads({message}) {
  return (
    <div className="flex w-full h-full items-center justify-center">
      {message}
    </div>
  );
}

export function ErrorMarketsSpreads() {
  return (
    <div className="flex w-full h-full items-center justify-center">
      Error loading data. Please try again later
    </div>
  );
}
