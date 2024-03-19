import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAuYRyJ-feVuETc_NqdywgUGBf56iMI1Xc',
  authDomain: 'discord-clone-be754.firebaseapp.com',
  projectId: 'discord-clone-be754',
  storageBucket: 'discord-clone-be754.appspot.com',
  messagingSenderId: '933143621385',
  appId: '1:933143621385:web:8888b08ac5ebf5ae4badd8',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
