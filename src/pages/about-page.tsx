import { PageHeader } from "@/components/PageHeader";

export const AboutPage = () => {
  return (
    <div className="w-full">
      <PageHeader name="About" route="about" />
      <div className="bg-red-400 h-96 my-10 w-10/12 xl:w-8/12 mx-auto">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus
        impedit illum porro iste totam eveniet accusantium sed delectus id
        voluptate molestias optio perspiciatis culpa corrupti, illo, officia,
        unde fugiat aut?
      </div>
    </div>
  );
};
