import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const columns = () => [
  columnHelper.accessor((row) => row.index, {
    id: "index",
    header: () => "#",
    cell: (props) => <p>{props.getValue()}</p>,
    enableColumnFilter: false,
  }),
  columnHelper.accessor((row) => row.date, {
    id: "date",
    header: () => "Fecha",
    cell: (props) => <p>{props.getValue()}</p>,
    enableColumnFilter: false,
  }),
  columnHelper.accessor((row) => row.bitcoinPrice, {
    id: "bitcoinPrice",
    header: () => "Precio Bitcoin",
    cell: (props) => <p>{parseInt(props.getValue())}</p>,
    enableColumnFilter: false,
  }),
  columnHelper.accessor((row) => row.investedAmount, {
    id: "investedAmount",
    header: () => "Monto Invertido",
    cell: (props) => <p>{props.getValue()}</p>,
    enableColumnFilter: false,
  }),
  columnHelper.accessor((row) => row.portfolioValue, {
    id: "portfolioValue",
    header: () => "Valor Portafolio",
    cell: (props) => <p>{parseInt(props.getValue())}</p>,
    enableColumnFilter: false,
  }),
  columnHelper.accessor((row) => row.changeValue, {
    id: "changeValue",
    header: () => "Cambio $",
    cell: (props) => {
      const numericValue = parseInt(props.getValue());
      const color = numericValue < 0 ? "red" : "green";
      return <p style={{ color }}>{Math.abs(numericValue)}</p>;
    },
    enableColumnFilter: false,
  }),
  columnHelper.accessor((row) => row.changePercentage, {
    id: "changePercentage",
    header: () => "Cambio %",
    cell: (props) => {
      const numericValue = parseFloat(props.getValue()).toFixed(2);
      const color = numericValue < 0 ? "red" : "green";
      return <p style={{ color }}>{Math.abs(numericValue)}</p>;
    },
    enableColumnFilter: false,
  }),
];

export default columns;
