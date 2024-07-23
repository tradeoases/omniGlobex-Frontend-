import ReviewCardDetailed from "./review-card-detailed";

export const ProductReviewTab = () => {
  return (
    <div>
      <div className="mb-4">
        <p className="text-lg font-semibold">Reviews</p>
      </div>
      <div className="w-full h-full bg-white p-4">
        <ReviewCardDetailed reviewData={{ hasComment: true }} />
        <ReviewCardDetailed reviewData={{ hasComment: false }} />
      </div>
    </div>
  );
};
