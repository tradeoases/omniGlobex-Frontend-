export type OfferType = {
    num:number;
    title: string;
    body: string;
}

const OfferComponent = ({item}:{item:OfferType}) => {
  return (
    <div className="w-3/4 flex flex-col justify-center items-center">
      <div className="w-full flex flex-start justify-start flex-col itemsce">

        <h1 className="text-[18px] text-start  font-medium text-qblack mb-2.5">
          {item.num} - {item.title}
        </h1>
        <p className="text-sm text-start leading-7 mb-2.5 text-gray-500">
          {item.body}
        </p>
      </div>
    </div>
  )
}

export default OfferComponent