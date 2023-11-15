import RecipeLayout from "@/components/general/RecipeLayout";
import ThisWeekRecipes from "@/components/general/ThisWeekRecipes";
import CommentSection from "@/components/section/CommentSection";
import BodyContent from "@/components/ui/BodyContent";
import BodyText from "@/components/ui/BodyText";
import Section from "@/components/ui/Section";
import TextBanner from "@/components/ui/TextBanner";
import Title from "@/components/ui/Title";
import { textBannerText } from "@/lib/general";
import { getAllPostsWithSlug, getPostWithSlug } from "@/lib/hygraph";
import Head from "next/head";
import Image from "next/image";
import React from "react";

export async function generateStaticParams() {
  const slugs = await getAllPostsWithSlug();
  return slugs;
}

async function getPost(params: any) {
  const recipe = await getPostWithSlug(params.slug);
  return recipe;
}

interface PostPageProps {
  params: {
    slug: string;
  };
}

const PostPage: React.FC<PostPageProps> = async ({ params }) => {
  const post = await getPost(params);
  return (
    <>
      <Head>
        <title>{post?.title}</title>
      </Head>
      <Section narrow className="pt-16">
        <Title>{post?.title}</Title>
        <BodyText className="my-4 mb-8">{post?.excerpt}</BodyText>

        <div className="relative w-full h-[500px] ">
          <Image
            fill
            className="object-cover w-full h-full"
            alt={post?.title}
            src={post?.coverImage?.url}
          />
        </div>

        <BodyContent content={post?.content} />
      </Section>

      <TextBanner>{textBannerText}</TextBanner>
      <ThisWeekRecipes fullWidth />
    </>
  );
};

export default PostPage;
