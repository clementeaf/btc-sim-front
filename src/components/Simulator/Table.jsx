import { flexRender } from "@tanstack/react-table";

import React from "react";

export default function Table({ table }) {
  return (
    <div className="flex flex-col w-full">
      <table>
        <thead className="border-b border-black/50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  <div className="flex items-start">{header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
        {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={`${index % 2 === 0 ? "bg-slate-400/20" : ""}`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
