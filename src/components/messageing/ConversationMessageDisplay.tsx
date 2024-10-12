import { useQuery } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { TiArrowLeftThick } from "react-icons/ti";
import { userStore } from "@/store/user-store";
import {
  getConversationMessages,
  sendMessage,
} from "@/service/apis/message-service";
import { Input } from "../ui/input";

interface IMessages {
  message_id: string;
  content: string;
  delivered: boolean;
  read: boolean;
  createdAt: string;
  sender_name: string;
  sender_id: string;
}

const ConversationMessageDisplay = () => {
  const navigate = useNavigate()
  const { convId } = useParams();
  const profile = useRecoilValue(userStore);
  const {
    data: messages,
    isError: isMessagesError,
    error: messageError,
    isLoading: messageLoading,
    isSuccess: messageSuccess,
  } = useQuery({
    queryKey: ["messages", convId],
    queryFn: async () => {
      const res = await getConversationMessages(convId as string);
      if (
        res.status === HttpStatusCode.Ok ||
        res.status === HttpStatusCode.Created
      ) {
        return res.data.data as IMessages[];
      }
    },
    enabled: !!convId,
  });

  const [message, setMessage] = useState<string>("");

  const handleSendMessage = async () => {
    try {
      if (convId) {
        const res = await sendMessage({ convId, message });

        if (
          res.status === HttpStatusCode.Ok ||
          res.status === HttpStatusCode.Created
        ) {
          console.log(res.data.data);
          setMessage("");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col w-full p-2 h-[calc(100vh-110px)]">
      <TiArrowLeftThick className="md:hidden my-2" onClick={()=> navigate(-1)}/>
      <div className="flex-1 overflow-y-auto  p-0 overflow-scroll">
        {messageSuccess &&
          messages?.map((message) => {
            const isSentByMe = message.sender_id !== profile?.business_id;
            return (
              <div
                key={message.message_id}
                className={`flex mb-4 ${
                  isSentByMe ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-lg ${
                    isSentByMe
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <div className="font-semibold">
                    {!isSentByMe ? "Me" : message.sender_name}
                  </div>
                  <div className="mb-2">{message.content}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(message.createdAt).toLocaleString()} |{" "}
                    {message.delivered ? "Delivered" : "Not Delivered"} |{" "}
                    {message.read ? "Read" : "Unread"}
                  </div>
                </div>
              </div>
            );
          })}
        {isMessagesError && (
          <div>
            <h1>An error occured while loading message</h1>
            <div>{messageError.message}</div>
          </div>
        )}
        {messageLoading && <h1>Loading messages...</h1>}
      </div>

      <div className="flex p-4 border-t border-gray-300 bg-white w-full">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 w-2/3 border border-gray-300 rounded-lg mr-4"
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-500 text-white w-1/3 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ConversationMessageDisplay;
