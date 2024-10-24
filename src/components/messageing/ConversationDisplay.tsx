// import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ConversationCard, { IConversation } from "./ConversationCard";
import { getConversation } from "@/service/apis/message-service";
import { HttpStatusCode } from "axios";

const ConversationDisplay = () => {
  const {
    data: conversations,
    isSuccess,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const res = await getConversation();
      if (
        res.status === HttpStatusCode.Ok ||
        res.status === HttpStatusCode.Created
      ) {
        return res.data.data as IConversation[];
      }
    },
    staleTime: 10,
  });

  console.log({ error });

  return (
    <div>
      <div className="flex flex-col w-full">
        <h2 className="text-lg font-semibold mb-4">My Messages</h2>
        {/* <div className="flex space-x-8 mb-4 relative">
            <a
              href="#"
              onClick={() => setActiveTab("All")}
              className={`relative ${
                activeTab === "All"
                  ? "text-yellow-500 after:w-full"
                  : "text-gray-500 after:w-0"
              } after:absolute after:bottom-[-1px] after:left-0 after:h-0.5 after:bg-yellow-500 after:transition-all after:duration-300`}
              style={{ display: "inline-block" }}
            >
              All
            </a>
            <a
              href="#"
              onClick={() => setActiveTab("Unread")}
              className={`relative ${
                activeTab === "Unread"
                  ? "text-yellow-500 after:w-full"
                  : "text-gray-500 after:w-0"
              } after:absolute after:bottom-[-1px] after:left-0 after:h-0.5 after:bg-yellow-500 after:transition-all after:duration-300`}
              style={{ display: "inline-block" }}
            >
              Unread
            </a>
            <a
              href="#"
              onClick={() => setActiveTab("Read")}
              className={`relative ${
                activeTab === "Read"
                  ? "text-yellow-500 after:w-full"
                  : "text-gray-500 after:w-0"
              } after:absolute after:bottom-[-1px] after:left-0 after:h-0.5 after:bg-yellow-500 after:transition-all after:duration-300`}
              style={{ display: "inline-block" }}
            >
              Read
            </a>
          </div>

        <hr className="border-gray-300 mb-4" />
        */}
      </div>
      <div className="flex gap-y-2 flex-col">
        {isLoading && <div>Loading conversations</div>}
        {isError && (
          <div>
            <h2>An error occured while loading conversations</h2>

          </div>
        )}
        {isSuccess && conversations?.map((c) => <ConversationCard {...c} />)}
      </div>
    </div>
  );
};

export default ConversationDisplay;
// import { useEffect, useState } from "react";
// import ConversationCard, { IConversation } from "./ConversationCard";

// const ConversationDisplay = () => {
//   const [conversations, setConversations] = useState<IConversation[]>([]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const eventSource = new EventSource(
//       `https://api.omniglobex.com/api/message/conversation/?token=${token}`
//     );

//     console.log(eventSource);

//     eventSource.onmessage = (event) => {
//       const newConversations = JSON.parse(event.data);
//       console.log({newConversations});
//       setConversations((prevConversations) => [
//         ...prevConversations,
//         ...newConversations,
//       ]);
//     };

//     eventSource.onerror = (error) => {
//       console.error("Error with SSE connection:", error);
//       eventSource.close(); // Close connection on error
//     };

//     // Cleanup: close the connection when the component unmounts
//     // return () => {
//     //   eventSource.close();
//     // };
//   }, []);

//   return (
//     <div>
//       <h2 className="text-lg font-semibold mb-4">My Messages</h2>
//       <div className="flex gap-y-2 flex-col">
//         {/* {isLoading && <div>Loading conversations...</div>}
//         {isError && <div>An error occurred while loading conversations</div>}
//         {isSuccess && */}
//         {conversations?.map((c) => (
//           <ConversationCard key={c.id} {...c} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ConversationDisplay;
