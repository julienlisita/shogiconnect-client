import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Page d'accueil */}
          <Route path="/" element={<></>} />   

          {/* Formulaire d'inscription */}
          <Route path="/home/register" element={<></>}/>  

          {/* Modifier le profil de l'utilisateur connecté */}
          <Route path="/profile/edit" element={<></>} />

          {/* Règles du Shogi */}           
          <Route path="/rules" element={<></>} /> 

          {/* Histoire du Shogi */}        
          <Route path="/history" element={<></>} />    

          {/* Liste des clubs */}     
          <Route path="/clubs" element={<></>} />   

          {/* Liste des membres */}      
          <Route path="/members" element={<></>} />  

          {/* Profil d'un membre */}    
          <Route path="/members/:id" element={<></>} />        

          {/* Catégories du forum */}     
          <Route path="/forum" element={<></>} />    

           {/* Topics d'une catégorie */}          
          <Route path="/forum/:category" element={<></>} />    

          {/* Commentaires d'un topic */}         
          <Route path="/forum/:category/:topic" element={<></>} />    

          {/* Liste des parties */}          
          <Route path="/games" element={<></>} />     
          
          {/* Jeu en ligne */}         
          <Route path="/game/:gameId" element={<></>} />              
        </Routes>
      </BrowserRouter> 
    </>
  )
};

export default App
