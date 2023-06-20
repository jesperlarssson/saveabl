import BlogPost from "@/components/general/BlogPost";
import Section from "@/components/ui/Section";
import Title from "@/components/ui/Title";
import BlogPosts from "@/components/general/BlogPosts";
import { getPaginatedPosts } from "@/lib/hygraph";
import { Post } from "@/types";

const Nyheter = async () => {
  const posts = await getPaginatedPosts(10, 0);
  return (
    <Section className="pt-16">
      <div className="flex flex-col items-center">
        <Title>Nyheter</Title>
      </div>
      <BlogPosts posts={posts} />
      
    </Section>
  );
};

export default Nyheter;
