import BlogPosts from "@/components/general/BlogPosts";
import Section from "@/components/ui/Section";
import { getPaginatedPosts } from "@/lib/hygraph";
import BloggClient from "./BloggClient"; // Importera BloggClient

const Nyheter = async () => {
  const posts = await getPaginatedPosts(10, 0);

  // Kontrollera att posts är en array
  if (!Array.isArray(posts)) {
    console.error("Fetched posts data is not an array", posts);
    return <p>Error loading posts</p>; // Hantera fel på ett meningsfullt sätt
  }

  return (
    <Section narrow className="pt-16">
      <BloggClient /> {/* Lägg till BloggClient här */}
      <BlogPosts posts={posts} />
    </Section>
  );
};

export default Nyheter;

