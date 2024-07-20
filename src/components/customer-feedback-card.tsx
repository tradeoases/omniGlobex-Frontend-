const CustomerFeedbackCard = () => {
  return (
    <div>
      <div className="item h-80 md:h-96  bg-gray-100 sm:px-10 sm:py-9 p-2">
        <div className="flex flex-col justify-between h-full">
          <div className="rating flex space-x-1 items-center">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-xl text-main">
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-qblack">(5.0)</span>
          </div>
          <div className="text-sm text-gray-500 leading-[30px] text-justify line-clamp-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an into the find unknown printer took a
            galley of type and scrambled it to make a type inot the specimen
            book. It has survived not only five centuries but also the on leap
            into find it a electronic typesetting, remaining end to make it.
          </div>
          <div className="flex items-center space-x-2.5 mt-3">
            <div className="rounded-full bg-gray-700 w-10 h-10"></div>
            <div>
              <p className="text-[18px] text-qblack font-medium">Ridoy Rock</p>
              <p className="text-gray-500 text-[13px]">London,UK</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerFeedbackCard;
