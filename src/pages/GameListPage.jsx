import Header from "../components/Header";
import Footer from "../components/Footer";
import AvailableGameList from "../components/AvailableGameList";

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