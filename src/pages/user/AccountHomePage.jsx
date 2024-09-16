import AccountHome from "../../components/user/AccountHome";
import Sidebar from "../../components/user/Sidebar";
import "./AccountHomePage.css"

const AccountHomePage = () => {

    return (
      <div className="homePage">
        <Sidebar/>
        <AccountHome/>
      </div>
    );
  };
  
  export default AccountHomePage;