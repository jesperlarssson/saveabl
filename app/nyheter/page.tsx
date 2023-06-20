import BlogPost from "@/components/general/BlogPost";
import Section from "@/components/ui/Section";
import Title from "@/components/ui/Title";
import { getPaginatedPosts } from "@/lib/hygraph";
import { Post } from "@/types";

const Nyheter = async () => {
  const posts = await getPaginatedPosts(10, 0);
  return (
    <Section className="pt-16">
      <div className="flex flex-col items-center">
        <Title>Nyheter</Title>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-col-4 gap-8 py-8">
        {posts.map((post: Post) => {
          return (
            <div
              key={post.slug}
              className="first:lg:col-span-3"
            >
              <BlogPost post={post} />
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default Nyheter;
