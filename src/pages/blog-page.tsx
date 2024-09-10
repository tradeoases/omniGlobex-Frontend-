import { PageHeader } from "@/components/PageHeader";
import BlogCard, { blogType } from "@/components/blog-card";
// import { useQuery } from "@tanstack/react-query";

const BlogPage = () => {
  // const callBlogs = async () => {};
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["blogs"],
  //   queryFn: callBlogs,
  // });

  const blogItems: blogType[] = [
    {
      username: "africanCoder",
      role: "Software Engineer",
      comments: [],
      blogTitle: "Building Scalable Systems in Africa",
      blogSummary:
        "A look into designing scalable software systems suitable for the African context.",
      image: "https://unsplash.com/photos/coding",
    },
    {
      username: "techGuru254",
      role: "Tech Lead",
      comments: [],
      blogTitle: "Adopting DevOps in Emerging Markets",
      blogSummary:
        "The benefits and challenges of adopting DevOps practices in emerging markets.",
      image: "https://unsplash.com/photos/devops",
    },
    {
      username: "cloudPioneer",
      role: "Cloud Architect",
      comments: [],
      blogTitle: "Cloud Infrastructure in Uganda",
      blogSummary:
        "An analysis of the current cloud infrastructure landscape in Uganda.",
      image: "https://pexels.com/photo/cloud-architecture",
    },
    {
      username: "dataScientistKenya",
      role: "Data Scientist",
      comments: [],
      blogTitle: "Data-Driven Decision Making in Agriculture",
      blogSummary:
        "Leveraging data science to improve agricultural outcomes in Africa.",
      image: "https://unsplash.com/photos/data-science",
    },
    {
      username: "mobileDevNaija",
      role: "Mobile Developer",
      comments: [],
      blogTitle: "Building Offline-First Mobile Apps",
      blogSummary:
        "How to build mobile apps for areas with limited internet access.",
      image: "https://pexels.com/photo/mobile-development",
    },
    {
      username: "fintechInnovator",
      role: "FinTech Entrepreneur",
      comments: [],
      blogTitle: "The Rise of Mobile Money in Africa",
      blogSummary:
        "Exploring the rapid adoption and growth of mobile money solutions across Africa.",
      image: "https://unsplash.com/photos/fintech",
    },
    {
      username: "frontendDevGH",
      role: "Frontend Developer",
      comments: [],
      blogTitle: "Designing for Low-Bandwidth Users",
      blogSummary:
        "Best practices for designing websites and apps for low-bandwidth users.",
      image: "https://pixabay.com/photos/frontend-development",
    },
    {
      username: "MLengineerRwanda",
      role: "Machine Learning Engineer",
      comments: [],
      blogTitle: "AI for Healthcare in Africa",
      blogSummary:
        "The potential of artificial intelligence to transform healthcare in African countries.",
      image: "https://pexels.com/photo/ai-healthcare",
    },
    {
      username: "blockchainAdvocate",
      role: "Blockchain Developer",
      comments: [],
      blogTitle: "Blockchain for Land Ownership",
      blogSummary:
        "How blockchain technology is being used to secure land ownership in Africa.",
      image: "https://unsplash.com/photos/blockchain",
    },
    {
      username: "cyberSecurityUg",
      role: "Cybersecurity Analyst",
      comments: [],
      blogTitle: "Cybersecurity Challenges in East Africa",
      blogSummary:
        "A deep dive into the unique cybersecurity challenges faced in East Africa.",
      image: "https://pexels.com/photo/cybersecurity",
    },
  ];

  return (
    <div className="w-full">
      <PageHeader name="Our Blogs" route="/ blogs" />

      <div className="w-10/12 xl:w-8/12 mx-auto my-14">
        <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 ">
          {blogItems.map((blog) => (
            <BlogCard {...blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
