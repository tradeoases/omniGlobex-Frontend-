import moment from "moment";
import { Card } from "../ui/card";
import { useNavigate } from "react-router-dom";

export interface IConversation {
  id: string;
  conversation_name: string;
  latest_message: string;
  message_sent_at: string;
}

const ConversationCard = ({
  conversation_name,
  latest_message,
  message_sent_at,
  id,
}: IConversation) => {
  const navigate = useNavigate();
  return (
    <Card className="p-2" onClick={() => navigate(`${id}`)}>
      <div className="flex items-center justify-between w-full">
        <h3 className="flex-1">{conversation_name}</h3>
        <span className="text-xs text-gray-500">
          {message_sent_at && moment(message_sent_at).from(moment())}
        </span>
      </div>
      <p className="mt-2">{latest_message? latest_message : 'No messages yet'}</p>
    </Card>
  );
};

export default ConversationCard;
