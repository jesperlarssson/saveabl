import { Post, getAllPostsForHome } from "@/lib/hygraph";
import Image from "next/image";
import React from "react";
import BlogPost from "../general/BlogPost";
import Slider from "../ui/Slider";
import Section from "../ui/Section";

const News = async () => {
  const news = (await getAllPostsForHome(false)) || [];
  return (
    <Section className="w-screen h-128 bg-secondary" 
    //bgIllustrationComponent={
    //  <div className="absolute top-0 left-0 w-full h-1/2 bg-primary">
    //  </div>
    //}
    >
      <Slider>
        {news.map((post: Post) => (
          <BlogPost
            key={post.slug}
            title={post.title}
            date={post.date}
            excerpt={post.excerpt}
            image={post.coverImage.url}
            slug={post.slug}
          />
        ))}
      </Slider>
     
    </Section>
  );
};

export default News;
