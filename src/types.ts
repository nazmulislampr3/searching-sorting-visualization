export type Menu = {
  name: string;
  path: string;
  submenu?: {
    name: string;
    path: string;
  }[];
};

export type SortingType = "bubble" | "insertion" | "selection";
export type SearchingType = "linear" | "binary";
