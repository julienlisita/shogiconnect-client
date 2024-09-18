import AccountHome from "../../components/user/AccountHome";
import UserSidebar from "../../components/user/UserSidebar";

const AccountHomePage = () => {

    return (
      <div className="pageWithSidebar">
        <UserSidebar/>
        <AccountHome/>
      </div>
    );
  };
  
  export default AccountHomePage;