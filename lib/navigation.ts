export interface NavigationItem {
  id: number;
  name: string;
  path: string;
  disabled?: boolean;
}

export const navigation: NavigationItem[] = [
  {
    id: 1,
    name: "Beställ nu",
    path: "/bestall",
    disabled: false,
  },
  {
    id: 2,
    name: "Recept",
    path: "/recept",
    disabled: false,
  },
  {
    id: 3,
    name: "Om Oss",
    path: "/om-oss",
    disabled: false,
  },
  {
    id: 4,
    name: "Nyheter",
    path: "/nyheter",
    disabled: false,
  },
  {
    id: 5,
    name: "Restaurangen",
    path: "/restaurangen",
    disabled: true,
  },
];

export const socials: NavigationItem[] = [
  {
    id: 1,
    name: "Instagram",
    path: "/bestall",
    disabled: false,
  },
 
];