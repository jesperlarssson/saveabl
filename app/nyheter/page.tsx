import BlogPost from "@/components/general/BlogPost";
import Section from "@/components/ui/Section";
import Title from "@/components/ui/Title";
import BlogPosts from "@/components/general/BlogPosts";
import { getPaginatedPosts } from "@/lib/hygraph";
import { Post } from "@/types";
import BodyText from "@/components/ui/BodyText";

const Nyheter = async () => {
  const posts = await getPaginatedPosts(10, 0);
  return (
    <Section narrow className="pt-16">
      <div className="flex flex-col items-center border-b border-primary pb-8">
        <Title>Nyheter</Title>
        <BodyText>
          Här hittar du våra senaste nyheter och uppdateringar.
        </BodyText>
      </div>
      <BlogPosts posts={posts} />
      
    </Section>
  );
};

export default Nyheter;
