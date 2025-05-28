import { useState } from "react";

const initialBoard = [
  ["L", "N", "S", "G", "K", "G", "S", "N", "L"],
  ["", "R", "", "", "", "", "", "B", ""],
  ["P", "P", "P", "P", "P", "P", "P", "P", "P"],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["p", "p", "p", "p", "p", "p", "p", "p", "p"],
  ["", "b", "", "", "", "", "", "r", ""],
  ["l", "n", "s", "g", "k", "g", "s", "n", "l"]
];

export default function Board()
{
    const [board, setBoard] = useState(initialBoard);
    const [selected, setSelected] = useState(null);

    return(
        <>
        </>
    )
}