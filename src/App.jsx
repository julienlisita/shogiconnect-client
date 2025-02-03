// src/App.jsx

import './App.css'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './components/common/ScrollToTop';

const App = () => {

  return (
    <AuthProvider> 
      <BrowserRouter>
        <ScrollToTop/>
        <AppRoutes />
      </BrowserRouter> 
    </AuthProvider>
  )
};

export default App
