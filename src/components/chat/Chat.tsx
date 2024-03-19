import './Chat.scss';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useAppSelector } from '../../app/hooks';
import { useState } from 'react';
import { db } from '../../firebase';
import {
  CollectionReference,
  DocumentData,
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import useSubCollection from '../../hooks/useSubCollection';

export type Message = {
  message: string;
  timestamp: Timestamp;
  user: null | {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
};

const Chat = () => {
  const user = useAppSelector((state) => state.user.user);
  const channelName = useAppSelector((state) => state.channel.channelName);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const [inputText, setInputText] = useState<string>('');

  const { subDocuments: messages } = useSubCollection('channels', 'messages');

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //    const channelRef = collection(db, 'channels');
    if (channelId) {
      const channelRef: CollectionReference<DocumentData> = collection(
        db,
        'channels',
        channelId,
        'messages'
      );
      await addDoc(channelRef, {
        message: inputText,
        timestamp: serverTimestamp(),
        user: user,
      });
      setInputText('');
    }
  };

  return (
    <div className="chat">
      {/* chatheader */}
      <ChatHeader channelName={channelName} />
      {/* chatmessage */}
      <div className="chatMessage">
        {messages?.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.message}
            user={message.user}
            timestamp={message.timestamp}
          />
        ))}
      </div>
      {/* chatinput */}
      <div className="chatInput">
        <AddCircleOutlineIcon />
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => sendMessage(e)}
        >
          <input
            type="text"
            placeholder="#Udemyへメッセージを送信"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputText(e.target.value)
            }
            value={inputText}
          />
          <button type="submit" className="chatInputButton">
            送信
          </button>
        </form>
        <div className="chatInputIcons">
          <CardGiftcardIcon />
          <GifIcon />
          <EmojiEmotionsIcon />
        </div>
      </div>
    </div>
  );
};

export default Chat;
