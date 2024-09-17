import Sidebar from './Sidebar';


const userMenu = [
    { link: '/user/home', label: 'Tableau de bord' },
    { link: '/user/edit-profile', label: 'Gestion du compte' },
    { link: '/user/scheduled-games', label: 'Parties programmées' },
    { link: '/user/game-history', label: 'Historique des parties' },
    { link: '/', label: 'Retour à l\'accueil' },
];

const UserSidebar = () => {


    return <Sidebar menuItems={userMenu} />;
};

export default UserSidebar;