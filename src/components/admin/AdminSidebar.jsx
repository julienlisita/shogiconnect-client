import Sidebar from './../common/Sidebar';


const adminMenu = [
    { link: '/admin/dashboard', label: 'Tableau de bord'},
    { link: '/admin/manage-users', label: 'Gestion des utilisateurs' },
    { link: '/admin/manage-forum', label: 'Gestion du forum' },
    { link: '/admin/manage-games', label: 'Gestion des parties' },
    { link: '/', label: 'Retour à l\'accueil' },
];

const AdminSidebar = () => {


    return <Sidebar menuItems={adminMenu} />;
};

export default AdminSidebar;