import "./Home.css"
import logo from '../assets/images/logo-shogi-titre.png';
import img1 from "../assets/images/banner9.png";
import img2 from "../assets/images/banner7.jpg";
import img3 from "../assets/images/shogi-ex3.jpg";
import { Link } from "react-router-dom";

import users from './users.json';
import stats from './stats.json';
import topics from './topics.json';
import comments from './comments.json';


const Home = () => {

    const getStatsByUserId = (user_id) => stats.find(stat => stat.user_id == user_id);

    const getUserById = (user_id) => users.find(user => user.id == user_id);

    const getTopicById = (topic_id) => topics.find(topic => topic.id == topic_id);

    const usersSortedByScore = users.sort((a,b) => getStatsByUserId(b.id).score - getStatsByUserId(a.id).score);

    const commentsSortedByDate = comments.sort((a,b) => b.date - a.date);

    return (
        <div>
            <section className="bannerHome banner">
                <div className="logo-container">
                    <img className="logo-img" src={logo} alt="logo de ShogiConnect"/>
                </div>
            </section>
            <div className="home main-content">
                <h1 className="main-content-title">Plongez dans l'Univers du Shogi</h1> 
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
                                <p><Link className="button-link" to="/rules">Accéder aux règles du jeu</Link></p>
                            </div>
                        </div>
                    </div>
                </section>           
                <section className="introCommunity">
                    <h2>Partagez votre passion avec la communauté</h2>
                    <div className="introCommunity-content">
                        <div className="introCommunity-content-description">
                            <div className="introCommunity-content-description-text">
                                <p>Découvrez notre section Communauté, un espace central pour tous les passionnés de Shogi. Ici, vous pourrez non seulement obtenir des informations sur les clubs de Shogi en France et les événements qu’ils organisent, mais aussi participer activement à notre forum. Engagez des discussions enrichissantes, partagez vos expériences, et restez informé des dernières nouvelles et activités. Que vous cherchiez à rejoindre un club, à participer à des tournois ou à échanger avec d’autres joueurs, cette section vous offre toutes les ressources nécessaires pour vous connecter et évoluer dans la communauté Shogi.</p>
                            </div>
                            <div className="introCommunity-content-description-button button">
                                <p><Link className="button-link" to="/forum">Accéder au forum</Link></p>
                            </div>
                        </div>
                        <div className="introCommunity-content-imageContainer">
                            <img className="illustration" src={img3} alt="" />
                        </div>         
                    </div>
                    <h2>Derniers messages sur le forum</h2>
                    <div className="introCommunity-messages">
                        <table className="introCommunity-messages-table">
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
                                    <td><strong>{getTopicById(comment.topic_id).title}</strong></td>
                                    <td>{comment.content}</td>
                                    <td>{`le ${new Date(comment.created_at).toLocaleDateString('fr-FR')} à ${new Date(comment.created_at).toLocaleTimeString()} \npar ${getUserById(comment.user_id).username}`}</td>
                                </tr>
                                    })}
                                
                            </tbody> 
                        </table>
                    </div>
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
                                <p><Link className="button-link" to="/members">Voir les joueurs</Link></p>
                            </div>
                        </div>
                    </div>
                    <h2>Classement des joueurs</h2>
                    <div className="introGame-gamers">
                        <table className="introGame-gamers-table">
                            <thead>
                                <tr>
                                    <th className="col1">Rang</th>
                                    <th className="col2">Pseudo</th>
                                    <th className="col3">Score</th>
                                </tr>
                            </thead> 
                            <tbody>
                                {!usersSortedByScore ? <p>En cours de chargement</p> :
                                usersSortedByScore.map((member,index) => {
                                return <tr key = {index}> 
                                        <td>{index+1}</td>
                                        <td>{member.username}</td>
                                        <td>{getStatsByUserId(member.id).score}</td>
                                        </tr>
                                })}
                            </tbody> 
                        </table>
                    </div>
                </section>
            </div>    
        </div>
    );
};

export default Home;