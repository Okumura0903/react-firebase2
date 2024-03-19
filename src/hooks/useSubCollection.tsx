import {
  DocumentData,
  Query,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { Message } from '../components/chat/Chat';
import { useAppSelector } from '../app/hooks';

const useSubCollection = (
  collectionName: string,
  subCollectionName: string
) => {
  const channelId = useAppSelector((state) => state.channel.channelId);

  const [subDocuments, setSubDocuments] = useState<Message[] | null>();

  useEffect(() => {
    if (channelId) {
      const collectionRef: Query<DocumentData> = query(
        collection(db, collectionName, channelId, subCollectionName),
        orderBy('timestamp', 'desc')
      );

      onSnapshot(collectionRef, (querySnapshot) => {
        const messages: Message[] = [];
        querySnapshot.forEach((doc) => {
          // messages.push(doc.data());
          messages.push({
            timestamp: doc.data().timestamp,
            message: doc.data().message,
            user: doc.data().user,
          });
        });
        setSubDocuments(messages);
      });
    }
  }, [channelId]);
  return { subDocuments };
};

export default useSubCollection;
