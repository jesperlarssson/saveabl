"use client";

import React from "react";
import Image from "next/image";
import { Post } from "@/types";
import Link from "next/link";

interface BlogPostProps {
  key?: string;
  post?: Post;
}

const BlogPost: React.FC<BlogPostProps> = ({ key, post }) => {
  return (
    <Link href={`/nyheter/${post?.slug}`}>
      <div className="overflow-hidden rounded-lg shadow transition hover:shadow-lg hover:-translate-y-2 relative h-96 min-w-96 flex-1 group cursor-pointer">
        <Image
          alt="Office"
          src={post?.coverImage.url || "/images/placeholder.png"}
          className="h-full w-full object-cover"
          width={420}
          height={320}
        />

        {/** TailwindCss gradient background to transparent */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

        <div className="bg-gradient-to-t from-secondary to-transparent p-4 h-fit w-full sm:p-6 text-primary-200 absolute bottom-0 left-0 ">
          <div className="transition group-hover:drop-shadow-md group-hover:-translate-y-4 ">
            <time dateTime="2022-10-10" className="block text-xs opacity-70 ">
              {post?.date}
            </time>

            <div >
              <h3 className="mt-0.5 font-poppins text-xl">{post?.title}</h3>
            </div>

            <p className="mt-2 line-clamp-3 text-sm/relaxed opacity-70 ">
              {post?.excerpt}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogPost;
