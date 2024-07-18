import { PageHeader } from "@/components/PageHeader";
import { UnderConstruction } from "@/components/under-construction";

export const AboutPage = () => {
  return (
    <div className="w-full">
      <PageHeader name="About" route="about" />
      <div className="my-10 w-10/12 xl:w-8/12 mx-auto">
        <UnderConstruction />
      </div>
    </div>
  );
};
