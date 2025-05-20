import { Link } from "react-router-dom";
import "./ClubList.css"
import { clubs } from "../../assets/data/clubsData";
import PageTitle from "../common/PageTitle";

const ClubList = () => {

    return (
        <div>
            <section className="bannerClubsList banner">
            </section>
            <div className="main-content">
                <PageTitle>Les clubs en France</PageTitle>
                <div className="clubsList">
                    {clubs.map(club => {
                        return (
                           <div key={club.id} className="clubCard">
                                <p className="clubCard-title">{club.title}</p>
                                <div className="clubCard-description">
                                    <p className="clubCard-description-adress">
                                        <span className = "clubCardSubtitle">Adresse: </span><br />
                                        {club.adress.map(el => (
                                            <span key={el}>{el[0]}<br/>{el[1]}<br/></span>
                                    ))}
                                    </p>
                                    <p className="clubCard-description-schedule">
                                    <span className = "clubCardSubtitle">Horaire: </span> <br />
                                        {club.horaire.map(el => (
                                            <span key={el}>{el}<br/></span>
                                        ))}
                                        
                                    </p>
                                    <p className="clubCard-description-contact">
                                    <span className = "clubCardSubtitle">Contact:  </span><br/>
                                        {club.contact.map(el => (
                                            <span key={el}>{el}<br/></span>
                                        ))}
                                    </p>
                                </div>        
                                <div className="club-card-button button button-container">
                                    <a
                                    className="button-link"
                                    href={club.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    >
                                    Voir site
                                    </a>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            
        </div>
    );
};

export default ClubList;