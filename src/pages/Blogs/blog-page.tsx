import { PageHeader } from "@/components/PageHeader";
import BlogCard, { BlogType } from "@/pages/Blogs/components/blog-card";
import request from "@/service/base.service";
import { useQuery } from "@tanstack/react-query";

const BlogPage = () => {
  const {data:blogs, isLoading, isError, error, isSuccess} = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const blogsReq = await request.get('content/')
      if(blogsReq.status === 200) {
        return blogsReq.data.data
      }
    }
  })
  return (
    <div className="w-full">
      <PageHeader name="Our Blogs" route="/ blogs" />

      <div className="w-10/12 xl:w-8/12 mx-auto my-14">
        <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 ">
          {isLoading && <div>Loading...</div>}
          {isError && <div>{error.message}</div>}
          {isSuccess && blogs.map((blog:BlogType) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
