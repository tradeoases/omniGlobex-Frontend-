import Cart from "../../Cart";
import Compair from "../../Helpers/icons/Compair";
import ThinBag from "../../Helpers/icons/ThinBag";
import ThinLove from "../../Helpers/icons/ThinLove";
import ThinPeople from "../../Helpers/icons/ThinPeople";
import SearchBox from "../../Helpers/SearchBox";
import Link from "next/link";

export default function Middlebar({ className,type }) {
  return (
    <div className={`w-full h-[86px] bg-white ${className}`}>
      <div className="container-x mx-auto h-full">
        <div className="relative h-full">
          <div className="flex justify-between items-center h-full">
            <div className="cursor-pointer">
              {type===3?(
                  <Link href="/">
                    <img
                        width="152"
                        height="36"
                        src={`/assets/images/logo-3.svg`}
                        alt="logo"
                    />
                  </Link>
              ):type===4?(
                  <Link href="/">
                    <img
                        width="152"
                        height="36"
                        src={`/assets/images/logo-4.svg`}
                        alt="logo"
                    />
                  </Link>
              ):(
                  <Link href="/">
                    <img
                        width="152"
                        height="36"
                        src={`/assets/images/logo.svg`}
                        alt="logo"
                    />
                  </Link>
              )}

            </div>
            <div className="w-[517px] h-[44px]">
              <SearchBox type={type} className="search-com" />
            </div>
            <div className="flex space-x-6 items-center">
              <div className="compaire relative">
                <Link href="/products-compaire" passHref>
                  <a rel="noopener noreferrer">
                    <span>
                    <Compair />
                  </span>
                  </a>

                </Link>
                <span className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${type===3?'bg-qh3-blue text-white':'bg-qyellow'}`}>
                  2
                </span>
              </div>
              <div className="favorite relative">
                <Link href="/wishlist" passHref>
                  <a rel="noopener noreferrer">
                    <span>
                    <ThinLove />
                  </span>
                  </a>
                </Link>
                <span className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${type===3?'bg-qh3-blue text-white':'bg-qyellow'}`}>
                  1
                </span>
              </div>
              <div className="cart-wrapper group relative py-4">
                <div className="cart relative cursor-pointer">
                  <Link href="/cart" passHref>
                    <a rel="noopener noreferrer">
                      <span>
                      <ThinBag />
                    </span>
                    </a>
                  </Link>
                  <span className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${type===3?'bg-qh3-blue text-white':'bg-qyellow'}`}>
                    15
                  </span>
                </div>
                <Cart type={type} className="absolute -right-[45px] top-11 z-50 hidden group-hover:block" />
              </div>
              <div>
                <Link href="/profile#dashboard" passHref>
                  <a rel="noopener noreferrer">
                    <span>
                    <ThinPeople />
                  </span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
