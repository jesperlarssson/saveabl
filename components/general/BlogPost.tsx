"use client";

import React from "react";
import Image from "next/image";


interface BlogPostProps {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  slug: string;
  key: string;
}

const BlogPost: React.FC<BlogPostProps> = ({
  key,
  title,
  date,
  excerpt,
  image,
  slug,
}) => {
  return (
      <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg relative h-96 w-96 min-w-96 flex-1">
        <Image
          alt="Office"
          src={image}
          className="h-full w-full object-cover"
          width={420}
          height={320}
        />

        {/** TailwindCss gradient background to transparent */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

        <div className="bg-gradient-to-t from-secondary to-transparent p-4 h-fit w-full sm:p-6 text-primary-200 absolute bottom-0 left-0">
          <time dateTime="2022-10-10" className="block text-xs opacity-70 ">
            {date}
          </time>

          <a href="#">
            <h3 className="mt-0.5 font-poppins text-xl">{title}</h3>
          </a>

          <p className="mt-2 line-clamp-3 text-sm/relaxed opacity-70 ">
            {excerpt}
          </p>
        </div>
      </article>

  );
};

export default BlogPost;
