// src/App.jsx

import './App.css'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { ForumProvider } from './contexts/ForumContext';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './components/common/ScrollToTop';
import { ScheduledGameProvider } from './contexts/ScheduledGameContext';

const App = () => {

  return (
    <AuthProvider> 
      <UserProvider>
        <ForumProvider>
          <ScheduledGameProvider>
            <BrowserRouter>
              <ScrollToTop/>
              <AppRoutes />
            </BrowserRouter> 
          </ScheduledGameProvider>
        </ForumProvider>
      </UserProvider>
    </AuthProvider>
  )
};

export default App
