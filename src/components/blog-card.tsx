import UserIcon from "@/assets/user.svg";
import commentIcon from "@/assets/comment.svg";
import rightArrow from "@/assets/right-arrow.svg";

const BlogCard = () => {
  return (
    <div>
      <div className="blog-card-wrapper w-full border border-[#D3D3D3] ">
        <div className="img w-full h-[240px] md:h-[340px] relative bg-gray-300">
          <span></span>
        </div>
        <div className="p-[24px]">
          <div className="short-data flex space-x-9 items-center mb-3">
            <div className="flex space-x-1.5 items-center">
              <span>
                <img src={UserIcon} alt="user" />
              </span>
              <span className="text-xs md:text-base text-qgraytwo capitalize">
                By admin
              </span>
            </div>
            <div className="flex space-x-1.5 items-center">
              <span>
                <img src={commentIcon} alt="comment" />
              </span>
              <span className="text-xs md:text-base text-qgraytwo">
                6 Comments
              </span>
            </div>
          </div>
          <div className="details">
            <h1 className="text-lg md:text-xl text-qblack hover:text-blue-500 font-semibold line-clamp-2 mb-1 capitalize">
              reprehenderit non esse anim laboris reprehenderit officia
            </h1>
            <p className="text-gray-500 text-xs md:text-base leading-[30px] line-clamp-2 mb-3">
              irure laborum qui deserunt excepteur id ad sit quis laboris duis
              ut cillum eiusmod non sint exercitation nulla tempor nostrud
              eiusmod commodo mollit magna sint laboris excepteur elit cupidatat
              id
            </p>
            <a href="#">
              <div className="flex items-center space-x-2">
                <span className="text-qblack text-xs md:text-base font-semibold">
                  View More
                </span>
                <span>
                  <img src={rightArrow} alt="arrow" />
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
