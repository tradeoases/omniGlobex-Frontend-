import { PageHeader } from "@/components/PageHeader";
import BlogCard from "@/components/blog-card";

const BlogPage = () => {
  return (
    <div className="w-full">
      <PageHeader name="Our Blogs" route="/ blogs" />

      <div className="w-10/12 xl:w-8/12 mx-auto my-14">
        <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 ">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
 
