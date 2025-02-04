// src/App.jsx

import './App.css'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { ForumProvider } from './contexts/ForumContext';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './components/common/ScrollToTop';

const App = () => {

  return (
    <AuthProvider> 
      <UserProvider>
        <ForumProvider>
          <BrowserRouter>
            <ScrollToTop/>
            <AppRoutes />
          </BrowserRouter> 
        </ForumProvider>
      </UserProvider>
    </AuthProvider>
  )
};

export default App
