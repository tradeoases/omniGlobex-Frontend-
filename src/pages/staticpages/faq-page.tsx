import { PageHeader } from "@/components/PageHeader";
import FaqCard from "@/components/faq-question-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqPage = () => {
  return (
    <div className="w-full">
      <PageHeader name="Frequently asked questions" route="/ FAQ" />
      <div className="my-10 w-10/12 xl:w-8/12 mx-auto">
        <div className="w-full flex flex-col md:flex-row justify-between gap-7">
          <div className="w-full md:w-1/2">
            <h1 className="text-[22px] font-semibold text-qblack leading-[30px] mb-6">
              Frequently asked questions
            </h1>
            <div>
              <Accordion type="single" collapsible className="w-full">
                {Array.from({ length: 5 }).map((_, i) => (
                  <AccordionItem key={i} value={`item-${i + 1}`}>
                    <AccordionTrigger>
                      <h1 className="text-lg">
                        How does information technology work ?
                      </h1>
                    </AccordionTrigger>
                    <AccordionContent></AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
          <div className="w-full md:w-1/2 ">
            <FaqCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
