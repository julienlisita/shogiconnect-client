import "./Dashboard.css";

const Dashboard = () => {

    return (
            <div className="dashboard-container">
                <div className="dashboard">
                    <h1>Dashboard Administrateur</h1>
                    <div className="dashboard-content">
                        <div className="dashboard-content-leftBlock">
                            <div className="dashboard-content-leftBlock-stats1">
                                <h2>Statistiques membres</h2>
                                <p>{`Membres actifs: `}</p>
                                <p>{`Parties en cours: `}</p>
                                <p>{`Nouveaux membres:`}</p>
                                <p>{`Parties crées: `}</p>
                                <p>{`Topics crées: `}</p>
                                <p>{`Commentaires postés: `}</p>
                            </div>
                            <div className="dashboard-content-leftBlock-stats2">
                                <h2>Statistiques de gestion</h2>
                                <p>{`Comptes supprimés: `}</p>
                                <p>{`Comptes désactivés:`}</p>
                                <p>{`Topics supprimés: `}</p>
                                <p>{`Commentaires supprimés: `}</p> 
                            </div>
                        </div>
                        <div className="dashboard-content-rightBlock">
                            <h2>Activité de gestion</h2>
                            <div className="dashboard-content-rightBlock-activityContainer">
                            
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
    );
};

export default Dashboard;