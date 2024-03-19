import './App.scss';
import Chat from './components/chat/Chat';
import Sidebar from './components/sidebar/Sidebar';
import Login from './components/login/Login';
import { useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useAppDispatch } from './app/hooks';
import { login, logout } from './features/userSlice';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallBack } from './utils/ErrorFallBack';

function App() {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((loginUser) => {
      if (loginUser) {
        dispatch(
          login({
            uid: loginUser.uid,
            photo: loginUser.photoURL,
            email: loginUser.email,
            displayName: loginUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);
  return (
    <div className="app">
      {user ? (
        <>
          {/* sidebar */}
          <ErrorBoundary FallbackComponent={ErrorFallBack}>
            <Sidebar />
          </ErrorBoundary>
          {/* chat */}
          <Chat />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}

export default App;
