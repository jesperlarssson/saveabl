import { Post, getAllPostsForHome } from "@/lib/hygraph";
import Image from "next/image";
import React from "react";


const News = async () => {
  const news = (await getAllPostsForHome(false)) || [];
  return (
    <div className="h-96">
      {news.map((post: Post) => (
        <div
          key={post.slug}
          className="flex w-96 rounded-lg transition hover:shadow-xl"
        >
          <Image
            width={350}
            height={250}
            className="object-contain"
            alt={`post cover image from ${post.author.name}`}
            src={post?.coverImage?.url}
          />
        </div>
      ))}
    </div>
  );
};

export default News;
