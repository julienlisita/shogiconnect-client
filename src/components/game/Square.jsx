import React from "react";
import clsx from "clsx";

const Square = ({ row, col, children, onClick, isSelected }) => {
  const isDark = (row + col) % 2 === 1;

  return (
    <div
      onClick={() => onClick(row, col)}
      className={clsx(
        "w-12 h-12 flex items-center justify-center text-lg font-bold border",
        isDark ? "bg-[#e0b97f]" : "bg-[#f3dbb5]",
        isSelected && "ring-2 ring-blue-400"
      )}
    >
      {children}
    </div>
  );
};

export default Square;