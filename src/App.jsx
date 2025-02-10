// src/App.jsx

import './App.css'
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './components/common/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { ForumProvider } from './contexts/ForumContext';
import { ScheduledGameProvider } from './contexts/ScheduledGameContext';
import { ProfileProvider } from './contexts/ProfileContext';

const App = () => {

  return (
    <AuthProvider> 
      <UserProvider>
        <ForumProvider>
          <ScheduledGameProvider>
            <ProfileProvider>
              <BrowserRouter>
                <ScrollToTop/>
                <AppRoutes />
              </BrowserRouter> 
            </ProfileProvider>
          </ScheduledGameProvider>
        </ForumProvider>
      </UserProvider>
    </AuthProvider>
  )
};

export default App
