import Header from "../components/public/Header";
import Footer from "../components/public/Footer";
import AvailableGameList from "../components/user/AvailableGameList";

const AvailableGameListPage = () => {
    return (
      <div>
        <Header/>
           <AvailableGameList/>
        <Footer/>
      </div>
    );
  };
  
  export default AvailableGameListPage;