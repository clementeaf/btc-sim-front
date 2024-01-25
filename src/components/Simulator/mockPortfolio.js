import getChartOptionsV2 from "./chartOptionsV2";

const mockData = [
  { formattedDate: "2023-01-01", formattedPrice: "$100" },
  { formattedDate: "2023-02-01", formattedPrice: "$150" },
  { formattedDate: "2023-03-01", formattedPrice: "$200" },
  { formattedDate: "2023-04-01", formattedPrice: "$180" },
  { formattedDate: "2023-05-01", formattedPrice: "$220" },
  { formattedDate: "2023-06-01", formattedPrice: "$250" },
  { formattedDate: "2023-07-01", formattedPrice: "$200" },
  { formattedDate: "2023-08-01", formattedPrice: "$180" },
  { formattedDate: "2023-09-01", formattedPrice: "$300" },
  { formattedDate: "2023-10-01", formattedPrice: "$350" },
  { formattedDate: "2023-11-01", formattedPrice: "$400" },
  { formattedDate: "2023-12-01", formattedPrice: "$450" },
];

const mockAmountSumArray = [
  100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200,
];
const mockPortfolioReturns = [
  0, 50, 100, -20, 40, 30, -50, -20, 120, 50, 50, 50,
];

export const mockOptions = getChartOptionsV2(
  mockAmountSumArray,
  mockPortfolioReturns
);
