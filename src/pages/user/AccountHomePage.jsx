import AccountHome from "../../components/user/AccountHome";
import UserSidebar from "../../components/user/UserSidebar";
import "./AccountHomePage.css"

const AccountHomePage = () => {

    return (
      <div className="homePage">
        <UserSidebar/>
        <AccountHome/>
      </div>
    );
  };
  
  export default AccountHomePage;