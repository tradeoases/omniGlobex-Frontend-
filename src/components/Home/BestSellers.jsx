import Image from "next/image";
import Link from "next/link";
export default function BestSellers({ className }) {
  return (
    <div className={`w-full ${className || ""}`}>
      <div className="grid xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-3 grid-cols-1 xl:gap-[30px] gap-5">
        <div
          data-aos="fade-left"
          data-aos-duration="500"
          className="item w-full flex flex-col items-center"
        >
          <div className="w-[170px] h-[170px] rounded-full bg-white flex justify-center items-center overflow-hidden mb-2 relative">
            <Image
              layout="fill"
              objectFit="scale-down"
              src={`/assets/images/saller-1.png`}
              alt=""
            />
          </div>
          <Link href="/saller-page">
            <p className="text-base font-500 text-center cursor-pointer hover:text-qyellow">Shopno BD</p>
          </Link>
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="400"
          className="item w-full flex flex-col items-center"
        >
          <div className="w-[170px] h-[170px] rounded-full bg-white flex justify-center items-center overflow-hidden mb-2 relative">
            <Image
              layout="fill"
              objectFit="scale-down"
              src={`/assets/images/saller-2.png`}
              alt=""
            />
          </div>
          <Link href="/saller-page">
            <p className="text-base font-500 text-center cursor-pointer hover:text-qyellow">Eecoms Shop</p>
          </Link>
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="300"
          className="item w-full flex flex-col items-center"
        >
          <div className="w-[170px] h-[170px] rounded-full bg-white flex justify-center items-center overflow-hidden mb-2 relative">
            <Image
              layout="fill"
              objectFit="scale-down"
              src={`/assets/images/saller-3.png`}
              alt=""
            />
          </div>
          <Link href="/saller-page">
            <p className="text-base font-500 text-center cursor-pointer hover:text-qyellow">Fusion X</p>
          </Link>
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="200"
          className="item w-full flex flex-col items-center"
        >
          <div className="w-[170px] h-[170px] rounded-full bg-white flex justify-center items-center overflow-hidden mb-2 relative">
            <Image
              layout="fill"
              objectFit="scale-down"
              src={`/assets/images/saller-4.png`}
              alt=""
            />
          </div>
          <Link href="/saller-page">
            <p className="text-base font-500 text-center cursor-pointer hover:text-qyellow">Rikayi Rox</p>
          </Link>
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="100"
          className="item w-full flex flex-col items-center"
        >
          <div className="w-[170px] h-[170px] rounded-full bg-white flex justify-center items-center overflow-hidden mb-2 relative">
            <Image
              layout="fill"
              objectFit="scale-down"
              src={`/assets/images/saller-5.png`}
              alt=""
            />
          </div>
          <Link href="/saller-page">
            <p className="text-base font-500 text-center cursor-pointer hover:text-qyellow">Habbriyi</p>
          </Link>
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="100"
          className="item w-full flex flex-col items-center"
        >
          <div className="w-[170px] h-[170px] rounded-full bg-white flex justify-center items-center overflow-hidden mb-2 relative">
            <Image
              layout="fill"
              objectFit="scale-down"
              src={`/assets/images/saller-6.png`}
              alt=""
            />
          </div>
          <Link href="/saller-page">
            <p className="text-base font-500 text-center cursor-pointer hover:text-qyellow">Rayhans</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
