export interface IllustrationItem {
  id: number;
  alt: string;
  path: string;
}

export const illustration: IllustrationItem[] = [
  {
    id: 1,
    alt: "Krokig morot",
    path: "/images/illustrations/morot.png",
  },
  {
    id: 2,
    alt: "broccoli",
    path: "/images/illustrations/broccoli.png",
  },
  {
    id: 3,
    alt: "Rödbeta",
    path: "/images/illustrations/beetroot.png",
  },
  {
    id: 4,
    alt: "chilli",
    path: "/images/illustrations/chilli.png",
  },
  {
    id: 5,
    alt: "Squash",
    path: "/images/illustrations/squash.png",
  },
];

export const positions = [
  {
    top: "top-1/10",
    left: "10%",
  },
  {
    top: "20%",
    left: "20%",
  },
  {
    top: "30%",
    left: "30%",
  },
  {
    top: "40%",
    left: "40%",
  },
  {
    top: "50%",
    left: "50%",
  },
];
