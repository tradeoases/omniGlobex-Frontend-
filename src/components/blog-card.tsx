import UserIcon from "@/assets/user.svg";
import commentIcon from "@/assets/comment.svg";
import rightArrow from "@/assets/right-arrow.svg";

export type blogType = {
  username:string;
  role: string;
  comments: unknown[];
  blogTitle: string;
  blogSummary: string;
  image: string
}

const BlogCard = ({username, role, comments, blogSummary, blogTitle, image}: blogType) => {
  return (
    <div>
      <div className="blog-card-wrapper w-full border border-[#D3D3D3] ">
        <div className="img w-full h-[240px] md:h-[340px] relative bg-gray-300">
          <img src={image} alt={blogTitle}/>
        </div>
        <div className="p-[24px]">
          <div className="short-data flex space-x-9 items-center mb-3">
            <div className="flex space-x-1.5 items-center">
              <span>
                <img src={UserIcon} alt="user" />
              </span>
              <span className="text-xs md:text-base text-qgraytwo capitalize">
                By {username} | {role}
              </span>
            </div>
            <div className="flex space-x-1.5 items-center">
              <span>
                <img src={commentIcon} alt="comment" />
              </span>
              <span className="text-xs md:text-base text-qgraytwo">
                {comments.length} Comments
              </span>
            </div>
          </div>
          <div className="details">
            <h1 className="text-lg md:text-xl text-qblack hover:text-blue-500 font-semibold line-clamp-2 mb-1 capitalize">
              {blogTitle}
            </h1>
            <p className="text-gray-500 text-xs md:text-base leading-[30px] line-clamp-2 mb-3">
              {blogSummary}
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
