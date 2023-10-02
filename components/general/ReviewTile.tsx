"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Card from "../ui/Card";
//import { Parallax } from "react-scroll-parallax";


interface ReviewTileProps {
  key: string;
  id: number;
  name: string;
  title: string;
  review: string;
  rating: number;
  date: string;
  url: string;
}

const ReviewTile: React.FC<ReviewTileProps> = ({
  key,
  id,
  name,
  title,
  review,
  rating,
  date,
  url,
}) => {
  const router = useRouter();
  return (
    <div key={key} className="">
      {/* <Parallax speed={id * 3}> */}
        <Card
          clickable
          onClick={() => router.push(url)}
          className="bg-primary-200 text-gray-900 bg-opacity-100 flex flex-col gap-2 relative z-10"
        >
          <p className="text-xs opacity-40">
            <span className="font-bold ">{name}</span>
            {`, ${date}`}
          </p>
          <h3 className="font-poppins text-xl text-secondary">{title}</h3>
          <p className="opacity-80">{review}</p>
        </Card>
      {/* </Parallax> */}
    </div>
  );
};

export default ReviewTile;
