import ScheduledGameList from "../../components/user/ScheduledGameList";
import UserSidebar from "../../components/user/UserSidebar"

const ScheduledGameListPage = () => {
    return (
      <div className="pageWithSidebar">
        <UserSidebar/>
        <ScheduledGameList/>
      </div>
    );
  };
  
  export default ScheduledGameListPage;