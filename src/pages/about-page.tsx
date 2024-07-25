import { PageHeader } from "@/components/PageHeader";
import CustomerFeedback from "@/components/customer-feedback";
import AboutUsSection from "@/components/about-us-section";
import ServicesBanner from "@/components/services-banner";
import BlogCard from "@/components/blog-card";

export const AboutPage = () => {
  return (
    <div className="w-full">
      <PageHeader name="About Us" route="/ about" />
      <div className="w-10/12 xl:w-8/12 mx-auto ">
        <AboutUsSection />
      </div>
      <div>
        <CustomerFeedback />
      </div>
      <div className="py-14">
        <ServicesBanner />
      </div>
      <div className="text-3xl font-bold w-full text-center mb-7">
        My Latest News
      </div>
      <div className="w-10/12 xl:w-8/12 mx-auto my-14">
        <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 grid-rows-1">
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </div>
  );
};
