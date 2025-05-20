import "./ShogiHistory.css"
import img1 from "../../assets/images/player2.avif";
import img2 from "../../assets/images/map.avif";
import img3 from "../../assets/images/paint.avif";
import img4 from "../../assets/images/banner10.avif";
import img5 from "../../assets/images/banner4.avif";
import img6 from "../../assets/images/manga.avif";
import PageTitle from "../common/PageTitle";

const ShogiHistory = () => {

    return (
        <div>
            <section className="bannerHistory banner">
            </section>
            <div className="history main-content">
                <PageTitle>Origine et histoire du Shogi</PageTitle>
                <section className="history-intro">
                    <h2>Introduction</h2>
                    <div className="history-intro-content">
                        <div className="history-intro-content-imageContainer">
                            <img className="illustration" src={img1} alt="" />
                        </div>
                        <div className="history-intro-content-description">
                             <p>Le Shogi, souvent désigné sous le nom d’échecs japonais, est un jeu de stratégie d’une profondeur et d’une complexité remarquables qui fait partie intégrante de la culture japonaise. Ce jeu millénaire, qui a su traverser les âges, est bien plus qu’un simple divertissement : il incarne des traditions séculaires et reflète l’évolution culturelle et intellectuelle du Japon. Avec ses racines ancrées dans l’histoire de l’Asie, le Shogi a su évoluer pour devenir un symbole de la stratégie et de la réflexion au Japon. Son parcours historique est marqué par des influences multiples et des adaptations qui ont façonné le jeu tel que nous le connaissons aujourd’hui.</p>
                        </div>
                    </div>
                </section>
                <section className="history-origin">
                    <h2>Les Origines du Shogi</h2>
                    <div className="history-origin-content">
                        <div className="history-origin-content-description">
                             <p>Le Shogi trouve ses racines dans un jeu indien ancien appelé Chaturanga, qui est apparu au 6ème siècle. Ce jeu était une forme primitive d’échecs, joué sur un plateau de 8x8 cases. Chaturanga a été introduit en Chine où il est devenu Xiangqi (échecs chinois) avant de se répandre au Japon, où il a été adapté et modifié pour devenir le Shogi. Les premières mentions du Shogi au Japon datent du 8ème siècle, pendant la période Nara (710-794), mais le jeu tel que nous le connaissons aujourd’hui a commencé à se former durant la période Heian (794-1185).</p>
                        </div>
                        <div className="history-origin-content-imageContainer">
                            <img className="illustration" src={img2} alt="" />
                        </div>
                    </div>
                </section>
                <section className="history-evolution">
                    <h2>Evolution à Travers Les Âges</h2>
                    <div className="history-evolution-content">
                        <div className="history-evolution-content-imageContainer">
                            <img className="illustration" src={img3} alt="" />
                        </div>
                        <div className="history-evolution-content-description">
                             <p>Au Japon, le Shogi a connu une évolution significative. À la période Heian, le jeu a été simplifié et standardisé, et il a gagné en popularité parmi la noblesse japonaise. Durant la période Edo (1603-1868), le Shogi s’est démocratisé, avec la création de clubs de jeu et l’organisation de tournois réguliers. Les règles ont été affinées et des stratégies complexes ont été développées, contribuant à la richesse du jeu. La publication de nombreux livres sur les stratégies du Shogi a également permis aux joueurs de tous niveaux de perfectionner leurs compétences.</p>
                        </div>
                    </div>
                </section>
                <section className="history-specificity">
                    <h2>Les Spécificités du Shogi</h2>
                    <div className="history-specificity-content">
                        <div className="history-specificity-content-description">
                             <p>Le Shogi est unique parmi les jeux d’échecs pour plusieurs raisons : <br />
                                •	Le Parachutage (Drop) : Les pièces capturées par un joueur peuvent être réintroduites sur le plateau, créant des dynamiques de jeu complexes et stratégiques. <br />
                                •	La Promotion des Pièces : Les pièces qui avancent dans la zone de promotion de l’adversaire se transforment en versions plus puissantes, offrant des opportunités stratégiques uniques. <br />
                                •	Le Jeu Ouvert : Contrairement aux échecs occidentaux, où les pièces sont généralement déplacées dans des configurations fermées, le Shogi permet des mouvements plus ouverts et des échanges de pièces fréquents.</p>
                        </div>
                        <div className="history-specificity-content-imageContainer">
                            <img className="illustration" src={img4} alt="" />
                        </div>
                    </div>
                </section>
                <section className="history-nowadays">
                    <h2>Le Shogi Aujourd’hui</h2>
                    <div className="history-nowadays-content">
                        <div className="history-nowadays-content-imageContainer">
                            <img className="illustration" src={img5} alt="" />
                        </div>
                        <div className="history-nowadays-content-description">
                             <p>Aujourd’hui, le Shogi est pratiqué dans le monde entier. Au Japon, il est un sport national avec des compétitions prestigieuses, des joueurs professionnels et des équipes de formation. À l’international, des clubs, des forums en ligne et des tournois permettent aux passionnés de Shogi de se connecter et de jouer. Le jeu continue d’évoluer avec des innovations technologiques, y compris des logiciels d’analyse et des plateformes de jeu en ligne, tout en préservant les traditions anciennes qui font sa richesse.</p>
                        </div>
                    </div>
                </section>
                <section className="history-culture">
                    <h2>Le Shogi dans la Culture Japonaise</h2>
                    <div className="history-culture-content">
                        <div className="history-culture-content-description">
                             <p>Le Shogi occupe une place de choix dans la culture japonaise, où il est bien plus qu’un simple jeu. Il est profondément enraciné dans l’imaginaire collectif et a trouvé sa place dans divers aspects de la culture populaire. Dans les mangas et les animes, le Shogi est souvent présenté comme un symbole de stratégie et de réflexion intense. Des œuvres comme “March Comes in Like a Lion” mettent en lumière les défis du jeu et ses implications pour les personnages, offrant une vision dramatique et inspirante du Shogi. Dans le cinéma, le Shogi est parfois utilisé pour explorer des thèmes de stratégie et de détermination personnelle, enrichissant les récits avec ses nuances complexes. La littérature japonaise intègre également le Shogi comme un motif symbolique, représentant des idées sur la stratégie et la philosophie de vie. Enfin, les médias et la culture populaire continuent de célébrer le Shogi, soulignant son rôle dans le patrimoine culturel du Japon et son impact sur les générations actuelles et futures. Cette intégration dans la culture japonaise renforce le statut du Shogi en tant que jeu emblématique, reflétant la richesse intellectuelle et la profondeur des valeurs japonaises.</p>
                        </div>
                        <div className="history-culture-content-imageContainer">
                            <img className="illustration-6" src={img6} alt="" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ShogiHistory;