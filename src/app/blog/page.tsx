import AllBlogsPosts from "@/components/BlogPage/AllBlogsPosts/AllBlogsPosts";
import BlogHero from "@/components/BlogPage/BlogHero/BlogHero";
import FinalCTAMain from "@/components/shared/FinalCTAMain/FinalCTAMain";

export default function BlogPage() {
  return (
    <main>
      <BlogHero />
      <AllBlogsPosts />
      <FinalCTAMain />
    </main>
  );
}
