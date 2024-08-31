import "./Home.css"
import logo from '../assets/images/logo-shogi-titre.png';
import img1 from "../assets/images/banner9.png"
import img2 from "../assets/images/banner7.jpg"
import img3 from "../assets/images/shogi-ex3.jpg"

const Home = () => {

    const  members = [
        {pseudo: "DragonKnight", score: 1800},
        {pseudo: "SilverShogun", score: 1950},
        {pseudo: "NinjaMaster", score: 1725},
        {pseudo: "SamuraiWarrior", score: 1900},
        {pseudo: "GoldenGeneral", score: 1825},
        {pseudo: "RookRider", score: 1870},
        {pseudo: "ShogiSensei", score: 1650},
        {pseudo: "KingDefender", score: 1850},
        {pseudo: "CastleCrafter", score: 1810},
        {pseudo: "BishopBreaker", score: 1780},
        {pseudo: "BlitzMaster", score: 1950},
        {pseudo: "StealthShogi", score: 1775},
        {pseudo: "PawnStorm", score: 1695},
        {pseudo: "KnightJumper", score: 1755}
    ]; 

    const comments = [
        {topic: "Analyse de Partie : Attaque Yagura", 
            message:"Je pense que le coup 27.B-56 était une erreur majeure…", 
            author:"ShogiMaster",
            date:new Date("2024-08-12T14:45:00")},
        {topic: "Stratégies Défensives : Tournage du Fou", 
            message:"J’ai trouvé cette approche intéressante, mais elle laisse…", 
            author:"Sakura",
            date:new Date("2024-08-23T08:00:00")},
        {topic: "Débuts de Partie : Formation Shikenbisha", 
            message:"Le début en 3-move est souvent sous-estimé, voici pourquoi…", 
            author:"BlitzSamurai",
            date:new Date("2024-08-29T21:10:00")},
        {topic: "Erreurs à Éviter en Milieu de Partie", 
            message:"Un conseil pour éviter de perdre votre Fou trop tôt…", 
            author:"KuroHoshi",
            date:new Date("2024-08-05T09:15:00")},
        {topic: "Gestion du Temps en Fin de Partie", 
            message:"Comment gérez-vous la pression du temps dans les derniers ...", 
            author:"RoninShogi",
            date:new Date("2024-08-18T19:30:00")}
    ];

    const membersSortedByScore = members.sort((a,b) => b.score - a.score);
    const tenGreatestMembers = membersSortedByScore.filter((member,index) => index < 10);

    const commentsSortedByDate = comments.sort((a,b) => b.date - a.date);

    

    return (
        <div>
            <section className="bannerHome banner">
                <div className="logo-container">
                    <img className="logo-img" src={logo} alt="logo de ShogiConnect"/>
                </div>
            </section>
            <h1>Plongez dans l'Univers du Shogi</h1> 
            <section className="introShogi">
                <h2>Découvrir les bases du Shogi</h2>
                <div className="introShogi-content">
                    <div className="introShogi-content-imageContainer">
                        <img className="illustration" src={img1} alt="" />
                    </div>
                    <div className="introShogi-content-description">
                        <div className="introShogi-content-description-text">
                            <p>Découvrez la richesse du Shogi dans notre section Apprentissage, conçue pour vous guider pas à pas dans la maîtrise de ce jeu de stratégie japonais. Que vous soyez novice ou passionné, explorez les règles essentielles, les mouvements des pièces et les stratégies incontournables pour progresser rapidement. Plongez dans cet univers fascinant et commencez votre parcours vers l’excellence.</p>
                        </div>
                        <div className="introShogi-content-description-button button">
                            <p>Accéder aux règles du jeu</p>
                        </div>
                    </div>
                </div>
            </section>           
            <section className="introCommunity">
                <h2>Partagez votre passion avec la communauté</h2>
                <div className="introCommunity-content">
                    <div className="introShogi-content-description">
                        <div className="introCommunity-content-text">
                            <p>Découvrez notre section Communauté, un espace central pour tous les passionnés de Shogi. Ici, vous pourrez non seulement obtenir des informations sur les clubs de Shogi en France et les événements qu’ils organisent, mais aussi participer activement à notre forum. Engagez des discussions enrichissantes, partagez vos expériences, et restez informé des dernières nouvelles et activités. Que vous cherchiez à rejoindre un club, à participer à des tournois ou à échanger avec d’autres joueurs, cette section vous offre toutes les ressources nécessaires pour vous connecter et évoluer dans la communauté Shogi.</p>
                        </div>
                        <div className="introCommunity-content-button button">
                            <p>Accéder au forum</p>
                        </div>
                     </div>
                     <div className="introShogi-content-imageContainer">
                        <img className="illustration" src={img3} alt="" />
                    </div>         
                </div>
                <h2>Dernier messages sur le forum</h2>
                <table className="introCommunity-table">
                    <thead>
                        <tr>
                            <th className="col1">Topic</th>
                            <th className="col2">Dernier message</th>
                            <th className="col3">Date</th>
                        </tr>
                    </thead> 
                    <tbody>  
                        {!commentsSortedByDate ? <p>En cours de chargement</p> :
                            commentsSortedByDate.map((comment,index) => {
                            return <tr key = {index}> 
                            <td>{comment.topic}</td>
                            <td>{comment.message}</td>
                            <td>{`le ${comment.date.toLocaleDateString('fr-FR')} à ${comment.date.toLocaleTimeString()} \npar ${comment.author}`}</td>
                        </tr>
                            })}
                        
                    </tbody> 
                </table>
            </section>
            <section className="introGame">
                <h2>Affrontez d’autres joueurs en ligne</h2>
                <div className="introGame-content">
                    <div className="introGame-content-imageContainer">
                        <img className="illustration" src={img2} alt="" />
                    </div>
                    <div className="introGame-content-description">
                        <div className="introGame-content-description-text">
                            <p>Plongez au cœur de l’action avec notre section Jeu en Ligne, où vous pouvez défier des joueurs du monde entier dans des parties de Shogi captivantes. Rejoignez la communauté, affrontez des adversaires de tous niveaux et améliorez vos compétences en temps réel. C’est l’endroit idéal pour tester vos stratégies et grimper dans les classements.</p>
                        </div>
                        <div className="introGame-content-description-button button">
                            <p>Accéder aux  parties</p>
                        </div>
                    </div>
                </div>
                <h2>Classement des joueurs</h2>
                <table className="introGame-table">
                    <thead>
                        <tr>
                            <th className="col1">Rang</th>
                            <th className="col2">Pseudo</th>
                            <th className="col3">Score</th>
                        </tr>
                    </thead> 
                    <tbody>
                        {!tenGreatestMembers ? <p>En cours de chargement</p> :
                        tenGreatestMembers.map((member,index) => {
                        return <tr key = {index}> 
                                <td>{index+1}</td>
                                <td>{member.pseudo}</td>
                                <td>{member.score}</td>
                                </tr>
                        })}
                    </tbody> 
                </table>
            </section>
        </div>
    );
};

export default Home;