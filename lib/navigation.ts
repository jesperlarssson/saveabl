export interface NavigationItem {
  id: number;
  name: string;
  path: string;
}

export const navigation: NavigationItem[] = [
  {
    id: 1,
    name: "Beställ nu",
    path: "/bestall-nu",
  },
  {
    id: 2,
    name: "Recept",
    path: "/recept",
  },
  {
    id: 3,
    name: "Om Oss",
    path: "/om-oss",
  },
  {
    id: 4,
    name: "Nyheter",
    path: "/nyheter",
  },
  {
    id: 5,
    name: "Nyheter",
    path: "/nyheter",
  },
];
