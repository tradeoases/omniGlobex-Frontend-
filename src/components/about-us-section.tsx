import { Button } from "@/components/ui/button";

const AboutUsSection = () => {
  return (
    <div className="w-full min-h-[665px] lg:flex lg:space-x-12 items-center pb-10 lg:pb-0">
      <div className="w-full h-auto sm:mx-auto md:w-3/5  md:h-[560px]  rounded overflow-hidden my-5 lg:my-0 relative bg-gray-300">
        <div className="w-full h-full  flex items-center justify-center ">
          <span>570X559</span>
        </div>
      </div>
      <div className="content flex-1 ">
        <h1 className="text-[18px] font-medium text-qblack mb-2.5">
          What is e-commerce business?
        </h1>
        <p className="text-sm  leading-7 mb-2.5 text-gray-500">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an printer took a galley of type and scrambled
          it to make a type specimen book. It has survived not only five
          centuries but also the on leap into electronic typesetting.
        </p>
        <ul className="text-sm text-qgraytwo leading-7 list-disc ml-5 mb-5 text-gray-500">
          <li>slim body with metal cover</li>
          <li>latest Intel Core i5-1135G7 processor (4 cores / 8 threads)</li>
          <li>8GB DDR4 RAM and fast 512GB PCIe SSD</li>
          <li>NVIDIA GeForce MX350 2GB GDDR5 graphics card backlit keyboard</li>
        </ul>
        <div className="w-36 ">
          <Button
            type="submit"
            className="w-full h-10 md:h-12 rounded-none bg-main text-black hover:bg-main/80 shadow-none"
          >
            <span>Contact Us</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
