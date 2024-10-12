// import { Outlet, useParams } from "react-router-dom";
// import ConversationDisplay from "./ConversationDisplay";

// const MessagePage = () => {

//   const { convId } = useParams();

//   console.log({convId})
    
//   return (
//     <div className="flex flex-col md:flex-row w-full h-full">
//       <div className={`${!convId? 'block':'hidden md:block'}md:w-1/3 w-full p-4 max-h-full`}>
//         <div className="bg-white overflow-scroll max-h-full p-4 w-full shadow rounded mt-4">
//           <ConversationDisplay />
//         </div>
//       </div>

//       <div className={`${convId? 'block':'hidden md:block'} md:w-2/3 w-fullp-4 hidden md:block`}>
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default MessagePage;


import { Outlet, useParams } from "react-router-dom";
import ConversationDisplay from "./ConversationDisplay";

const MessagePage = () => {
  const { convId } = useParams();

  console.log({ convId });

  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      {/* Conditional rendering for ConversationDisplay */}
      <div className={`${!convId ? 'block' : 'hidden md:block'} md:w-1/3 w-full p-4 h-full`}>
        <div className="bg-white overflow-y-scroll max-h-full p-4 w-full shadow rounded mt-4">
          <ConversationDisplay />
        </div>
      </div>

      {/* Conditional rendering for Outlet */}
      <div className={`${convId ? 'block' : 'hidden md:block'} md:w-2/3 w-full p-4`}>
        <div className="bg-white overflow-y-scroll h-full shadow rounded mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
