import { getAllPostsForHome } from "@/lib/hygraph";
import React from "react";
import BlogPost from "../general/BlogPost";
import Slider from "../ui/Slider";
import Section from "../ui/Section";
import { Post } from "@/types";
import Title from "../ui/Title";
import BodyText from "../ui/BodyText";

const News = async () => {
  const news = (await getAllPostsForHome(false)) || [];
  return (
    <Section
      className="w-screen h-128 bg-secondary"
      bgIllustrationComponent={
        <div className="absolute top-0 left-0 w-full h-1/2 bg-primary-200"></div>
      }
    >
      <Title className=" flex relative block z-20">
        Följ med på resan - kika in våra senaste nyhetsinlägg!
      </Title>
      <BodyText className=" flex relative block z-20 max-w-3xl mb-6 text-lg">
        Vi utvecklas och vi testar nytt. Vi expanderar och hittar på nya grejer. Här uppdaterar vi vad som händer i vår värld.
      </BodyText>
      <Slider>
        {news.map((post: Post) => (
          <BlogPost key={post.slug} post={post} />
        ))}
      </Slider>
    </Section>
  );
};

export default News;
