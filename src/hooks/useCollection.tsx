import {
  collection,
  query,
  onSnapshot,
  DocumentData,
  Query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';

interface Channel {
  id: string;
  channel: DocumentData;
}

const useCollection = (data: string) => {
  const [documents, setDocuments] = useState<Channel[]>([]);

  const collectionRef: Query<DocumentData> = query(collection(db, data));
  useEffect(() => {
    onSnapshot(collectionRef, (querySnapshot) => {
      const channelResults: Channel[] = [];
      querySnapshot.docs.forEach((doc) => {
        channelResults.push({
          id: doc.id,
          channel: doc.data(),
        });
      });
      setDocuments(channelResults);
    });
  }, []);

  return { documents };
};

export default useCollection;
