import { Menu } from "../types";

const menu: Menu[] = [
  {
    name: "Sorting",
    path: "/sorting",
    submenu: [
      {
        name: "Bubble",
        path: "/bubble",
      },
      {
        name: "Insertion",
        path: "/insertion",
      },
      {
        name: "Selection",
        path: "/selection",
      },
    ],
  },
  {
    name: "Searching",
    path: "/searching",
    submenu: [
      {
        name: "Linear",
        path: "/linear",
      },
      {
        name: "binary",
        path: "/binary",
      },
    ],
  },
];

export default menu;
