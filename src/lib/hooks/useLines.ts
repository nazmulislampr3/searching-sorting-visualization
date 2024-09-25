import { useState } from "react";

export type Indexes = {
  current: number;
  temp?: number;
  compareTo?: number;
  start?: number;
  end?: number;
} | null;
export type LineDataType = {
  numbers: number[];
  onSortingNumbers: number[];
  setOnSortingNumbers: React.Dispatch<React.SetStateAction<number[]>>;
  indexes: Indexes;
  setIndexes: React.Dispatch<React.SetStateAction<Indexes>>;
  move: boolean;
  setMove: React.Dispatch<React.SetStateAction<boolean>>;
  order: "asc" | "dsc";
  setOrder: React.Dispatch<React.SetStateAction<"asc" | "dsc">>;
  transition: number;
  setTransition: React.Dispatch<React.SetStateAction<number>>;
  setNumbers: React.Dispatch<React.SetStateAction<number[]>>;
  defaultNumbers: number[];
};
type LineDateArguments = {
  defaultNumbers?: number[];
};
const useLines = (options: LineDateArguments): LineDataType => {
  const {
    defaultNumbers = [
      5, 3, 7, 1, 9, 5, 3, 7, 1, 9, 4, 10, 16, 12, 11, 4, 10, 16, 12, 11,
    ],
  } = options;
  const [numbers, setNumbers] = useState<number[]>(defaultNumbers);
  const [onSortingNumbers, setOnSortingNumbers] =
    useState<number[]>(defaultNumbers);
  const [indexes, setIndexes] = useState<Indexes>(null);
  const [move, setMove] = useState<boolean>(false);
  const [order, setOrder] = useState<"asc" | "dsc">("asc");
  const [transition, setTransition] = useState<number>(700);

  return {
    indexes,
    setIndexes,
    move,
    numbers,
    onSortingNumbers,
    order,
    setMove,
    setOnSortingNumbers,
    setOrder,
    transition,
    setTransition,
    setNumbers,
    defaultNumbers,
  };
};

export default useLines;
