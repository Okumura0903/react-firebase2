import { Timestamp } from 'firebase/firestore';
import './ChatMessage.scss';
import { Avatar } from '@mui/material';

type Props = {
  message: string;
  timestamp: Timestamp;
  user: null | {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
};

const ChatMessage = ({ message, user, timestamp }: Props) => {
  return (
    <div className="message">
      {/* <Avatar /> */}
      <Avatar src={user?.photo} />
      <div className="messageInfo">
        <h4>
          {user?.displayName}
          <span className="messageTimestamp">
            {new Date(timestamp?.toDate()).toLocaleString()}
          </span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
