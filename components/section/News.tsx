import { getAllPostsForHome } from "@/lib/hygraph";
import React from "react";
import BlogPost from "../general/BlogPost";
import Slider from "../ui/Slider";
import Section from "../ui/Section";
import { Post } from "@/types";

const News = async () => {
  const news = (await getAllPostsForHome(false)) || [];
  return (
    <Section
      className="w-screen h-128 bg-secondary"
      //bgIllustrationComponent={
      //  <div className="absolute top-0 left-0 w-full h-1/2 bg-primary">
      //  </div>
      //}
    >
      <Slider>
        {news.map((post: Post) => (
          <BlogPost key={post.slug} post={post} />
        ))}
      </Slider>
    </Section>
  );
};

export default News;
