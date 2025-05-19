import img1 from "../../assets/images/banner8.avif"
import img2 from "../../assets/images/Shogiban.avif"
import img3 from "../../assets/images/Shogi-promotion-zone.avif"
import img4 from "../../assets/images/player.avif"
import imgKing from "../../assets/images/king.avif"
import imgGoldGen from "../../assets/images/goldGeneral.avif"
import imgSilverGen from "../../assets/images/silverGeneral.avif"
import imgSilverGenP from "../../assets/images/silverGeneralP.avif"
import imgKnight from "../../assets/images/knight.avif"
import imgKnightP from "../../assets/images/knightP.avif"
import imgLance from "../../assets/images/lance.avif"
import imgLanceP from "../../assets/images/lanceP.avif"
import imgRook from "../../assets/images/rook.avif"
import imgRookP from "../../assets/images/rookP.avif"
import imgBishop from "../../assets/images/bishop.avif"
import imgBishopP from "../../assets/images/bishopP.avif"
import imgPawn from "../../assets/images/pawn.avif"
import imgPawnP from "../../assets/images/pawnP.avif"


import "./ShogiRules.css"

const ShogiRules = () => {

    return (
        <div>
            <section className="bannerRules banner">
            </section>
            <div className="rules main-content">
                <h1 className="main-content-title">Les règles du Shogi</h1> 
                <section className="rulesIntro">
                    <h2>Introduction</h2>
                    <div className="rulesIntro-content">
                        <div className="rulesIntro-content-imageContainer">
                            <img className="illustration" src={img1} alt="" />
                        </div>
                        <div className="rulesIntro-content-description">
                            <p>
                                Découvrez la richesse du Shogi dans notre section Apprentissage, conçue pour vous guider pas à pas dans la maîtrise de ce jeu de stratégie japonais. Que vous soyez novice ou passionné, explorez les règles essentielles, les mouvements des pièces et les stratégies incontournables pour progresser rapidement. Plongez dans cet univers fascinant et commencez votre parcours vers l’excellence.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="moves">
                    <h2>Pieces et déplacements</h2>
                    <div className="cardsWithoutpromotion">
                        <div className="cardWithoutPromotion">
                            <p className="cardWithoutPromotion-title">Roi - 王 ( Ō)</p>
                            <p className="cardWithoutPromotion-description">
                            Se déplace d’une case dans n’importe quelle direction : 
                            horizontalement, verticalement ou en diagonale. Le Roi ne peut pas être promu.
                            </p>
                            <div className="cardWithoutPromotion-imgContainer">
                                <img src={imgKing} alt="" />
                            </div>
                        </div>
                        <div className="cardWithoutPromotion">
                            <p className="cardWithoutPromotion-title">Général d’or - 金将 (Kinshō)</p>
                            <p className="cardWithoutPromotion-description">
                            Se déplace d’une case horizontalement, verticalement, ou en diagonale vers l’avant. Ne peut pas reculer en diagonale.
                             Le Général d’or ne peut pas être promu.
                            </p>
                            <div className="cardWithoutPromotion-imgContainer">
                                <img src={imgGoldGen} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="cardsWithPromotion">
                        <div className="cardWithPromotion">
                            <p className="cardWithPromotion-title">Général d’argent - 銀将 (Ginshō)</p>
                            <p className="cardWithPromotion-description">
                            Se déplace d’une case en diagonale ou vers l’avant. Ne peut pas reculer horizontalement ou verticalement.
                            Se déplace comme un Général d’or après promotion.
                            </p>
                            <p>Version non promue</p>
                            <div className="cardWithPromotion-imgContainer">
                                <img src={imgSilverGen} alt="" />
                            </div>
                            <p>Version promue</p>
                            <div className="cardWithPromotion-imgContainer">
                                <img src={imgSilverGenP} alt="" />
                            </div>
                        </div>
                        <div className="cardWithPromotion">
                            <p className="cardWithPromotion-title">Cavalier - 桂馬 (Keima)</p>
                            <p className="cardWithPromotion-description">
                            Se déplace en sautant deux cases en avant, en diagonale. Ne peut pas se déplacer latéralement ou en arrière.
                            Se déplace comme un Général d’or après promotion.
                            </p>
                            <p>Version non promue</p>
                            <div className="cardWithPromotion-imgContainer">
                                <img src={imgKnight} alt="" />
                            </div>
                            <p>Version promue</p>
                            <div className="cardWithPromotion-imgContainer">
                                <img src={imgKnightP} alt="" />
                            </div>
                        </div>
                        <div className="cardWithPromotion">
                            <p className="cardWithPromotion-title">Lance - 香車 (Kyōsha) </p>
                            <p className="cardWithPromotion-description">
                            Se déplace verticalement vers l’avant sur n’importe quel nombre de cases. Ne peut pas se déplacer latéralement ou en arrière.
                            Se déplace comme un Général d’or après promotion.
                            </p>
                            <p>Version non promue</p>
                            <div className="cardWithPromotion-imgContainer">
                                <img src={imgLance} alt="" />
                            </div>
                            <p>Version promue</p>
                            <div className="cardWithPromotion-imgContainer">
                                <img src={imgLanceP} alt="" />
                            </div>
                        </div>
                        <div className="cardWithPromotion">
                            <p className="cardWithPromotion-title">Tour - 飛車 (Hisha)</p>
                            <p className="cardWithPromotion-description">
                            Se déplace horizontalement ou verticalement sur n’importe quel nombre de cases. 
                            Peut également se déplacer d’une case en diagonale dans n’importe quelle direction après promotion (devient un Dragon Roi).
                            </p>
                            <p>Version non promue</p>
                            <div className="cardWithPromotion-imgContainer">
                                <img src={imgRook} alt="" />
                            </div>
                            <p>Version promue</p>
                            <div className="cardWithPromotion-imgContainer">
                                <img src={imgRookP} alt="" />
                            </div>
                        </div>
                        <div className="cardWithPromotion">
                            <p className="cardWithPromotion-title">Fou - 角行 (Kakugyō)</p>
                            <p className="cardWithPromotion-description">
                            Se déplace en diagonale sur n’importe quel nombre de cases.
                            Peut également se déplacer d’une case horizontalement ou verticalement après promotion (devient un Cheval de dragon).
                            </p>
                            <p>Version non promue</p>
                            <div className="cardWithPromotion-imgContainer">
                                <img src={imgBishop} alt="" />
                            </div>
                            <p>Version promue</p>
                            <div className="cardWithPromotion-imgContainer">
                                <img src={imgBishopP} alt="" />
                            </div>
                        </div>
                        <div className="cardWithPromotion">
                            <p className="cardWithPromotion-title">Pion - 歩兵 (Fuhyō) </p>
                            <p className="cardWithPromotion-description">
                            Se déplace d’une seule case vers l’avant (y compris pour capturer des pièces). Ne peut pas reculer ou se déplacer latéralement.
                            Se déplace comme un Général d’or après promotion.
                            </p>
                            <p>Version non promue</p>
                            <div className="cardWithPromotion-imgContainer">
                                <img src={imgPawn} alt="" />
                            </div>
                            <p>Version promue</p>
                            <div className="cardWithPromotion-imgContainer">
                                <img src={imgPawnP} alt="" />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="gameplay">
                    <h2>Déroulement d’une partie</h2>
                    <div className="gameplay-content">
                        <div className="gameplay-content-imageContainer">
                            <img className="illustration" src={img2} alt="" />
                        </div>
                        <div className="gameplay-content-description">
                            <p>
                            Une partie de Shogi commence par l’installation des pièces sur le plateau, chaque joueur plaçant ses 20 pièces sur les trois premières rangées de son côté. 
                            C’est toujours le joueur qui contrôle les pièces en position sente (先手) qui commence la partie. Sente est l’équivalent du joueur “noir” dans les échecs traditionnels, mais dans le Shogi, les pièces ne sont pas différenciées par des couleurs. L’autre joueur est appelé gote (後手) et joue en second. 
                            Le joueur qui commence en position sente (先手) est généralement décidé de manière aléatoire ou par un accord entre les deux joueurs avant le début de la partie. L’une des méthodes traditionnelles pour déterminer qui sera sente consiste à utiliser un rituel appelé furigoma (振り駒).
                            Ce rituel implique de lancer cinq pions (les pièces de jeu) en l’air et de voir combien retombent avec la face dorée (côté promu) ou la face normale (non promue) visible. Si la majorité des pions retombent avec la face normale visible, alors le joueur qui a lancé les pions sera sente. Si c’est l’inverse, l’autre joueur sera sente. 
                            </p>
                        </div>
                    </div>
                    <div className = "gameplay-content2">
                        <p>
                            Les joueurs alternent ensuite les tours, et à chaque tour, ils peuvent déplacer une de leurs pièces ou déposer une pièce capturée précédemment sur une case vide. Le mouvement des pièces suit des règles spécifiques, avec certaines pièces pouvant être promues lorsqu’elles atteignent la zone de promotion, ce qui leur confère de nouveaux mouvements. Une particularité du Shogi est la possibilité de “larguer” les pièces capturées, ce qui signifie qu’un joueur peut réintroduire une pièce capturée dans le camp adverse en tant que pièce de son propre camp. Cela ajoute une profondeur stratégique unique au jeu. La partie se termine lorsqu’un joueur parvient à mettre le Roi adverse en échec et mat, c’est-à-dire lorsque le Roi est attaqué de manière à ce qu’il ne puisse plus échapper à la capture. 
                        </p>
                    </div>
                </section>
                <section className="promotion">
                    <h2>Promotion des pièces</h2>
                    <div className="promotion-content">
                        <div className="promotion-content-description">
                            <p>
                            Dans le Shogi, la promotion des pièces est un mécanisme clé qui ajoute de la profondeur stratégique au jeu. Lorsqu’une pièce entre ou se déplace dans les trois dernières rangées du camp adverse (la zone de promotion), elle a la possibilité de se promouvoir. La promotion transforme la pièce en une version plus puissante avec de nouveaux mouvements, similaires à la promotion des pions en échecs, mais avec plus de diversité selon la pièce. Par exemple, un pion promu (と) peut se déplacer comme un général d’or, tandis qu’une tour promue (竜) peut se déplacer à la fois comme une tour et un roi. La promotion est généralement facultative, mais elle devient obligatoire pour certaines pièces si elles n’ont plus de mouvements valides dans leur position actuelle. Une fois promue, la pièce conserve son statut de promotion pour le reste de la partie, même si elle est capturée et réintroduite sur le plateau.
                            </p>
                        </div>
                        <div className="promotion-content-imageContainer">
                            <img className="illustration" src={img3} alt="" />
                        </div>
                    </div>
                </section>
                <section className="drop">
                    <h2>Le parachutage</h2>
                    <div className="drop-content">
                        <div className="drop-content-imageContainer">
                            <img className="illustration" src={img4} alt="" />
                        </div>
                        <div className="drop-content-description">
                            <p>
                            Le parachutage est une règle unique et stratégique du Shogi qui permet à un joueur de réintroduire sur le plateau une pièce capturée, mais sous certaines conditions. Lorsqu’un joueur capture une pièce adverse, celle-ci ne sort pas définitivement du jeu, mais est conservée dans sa réserve de pièces capturées. Lors de son tour, au lieu de déplacer une pièce déjà sur le plateau, le joueur peut “parachuter” (c’est-à-dire placer) une pièce capturée sur n’importe quelle case vide du plateau, en orientant la pièce vers l’adversaire, ce qui signifie qu’elle devient une pièce de ce joueur.<br/>
                            Cependant, certaines règles limitent le parachutage :<br/>
                            <span style={{ marginRight: "20px" }}></span>1. Un pion ne peut pas être parachuté sur une colonne où un autre pion non promu du même
                            joueur est déjà présent.<br/>
                            <span style={{ marginRight: "20px" }}></span>2. Une pièce parachutée ne peut pas donner immédiatement un échec et mat au Roi adverse (ce qu’on appelle un “parachutage de mat”).<br/>
                            <span style={{ marginRight: "20px" }}></span>3. Un pion ne peut pas être parachuté sur la dernière rangée, car il ne pourrait pas avancer et doit obligatoirement se promouvoir ou rester bloqué.<br/>
                            Le parachutage offre une grande flexibilité stratégique, permettant des retournements de situation et une gestion complexe des ressources capturées.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="endGame">
                    <h2>Fin de partie</h2>
                    <div className="endGame-text">
                        <p>
                        En Shogi, il existe plusieurs conditions qui peuvent mettre fin à une partie. Voici les principaux cas de fin de partie :
                            <br/><br/><span style={{ marginRight: "20px" }}></span>
                            1.	Échec et mat (Tsumi, 詰み) :
                            La partie se termine lorsqu’un joueur met le roi de son adversaire en échec et mat, c’est-à-dire que le roi est attaqué et ne peut pas éviter la capture au coup suivant.
                            <br/><br/><span style={{ marginRight: "20px" }}></span> 
                            2.	Abandon (Tōta, 投了) :
                            Un joueur peut choisir d’abandonner la partie lorsqu’il estime que la défaite est inévitable. C’est une pratique courante dans les parties professionnelles où un joueur reconnaît sa défaite avant d’être mis en échec et mat.
                            <br/><br/><span style={{ marginRight: "20px" }}></span>   
                            3.	Pat (Jishōgi, 持将棋) :
                            Si les deux joueurs n’ont plus assez de matériel pour mater le roi adverse, ou si les deux joueurs acceptent de ne plus continuer à jouer en raison de la faiblesse des positions, la partie peut être déclarée nulle. En pratique, cela se produit rarement, car le Shogi offre souvent des possibilités de parachutage pour poursuivre l’attaque.
                            <br/><br/><span style={{ marginRight: "20px" }}></span> 
                            4.	Perpétuel (Sennichite, 千日手) :
                            La partie est déclarée nulle si la même position se répète quatre fois avec les mêmes joueurs à jouer. Cette règle est conçue pour éviter les situations où les joueurs répéteraient les mêmes coups sans fin.
                            <br/><br/><span style={{ marginRight: "20px" }}></span> 
                            5.	Perte par Nifu (二歩) :
                            Un joueur perd immédiatement la partie s’il place un pion non promu dans une colonne où il a déjà un autre pion non promu. C’est une infraction à la règle du Shogi et entraîne une défaite instantanée.
                            <br/><br/><span style={{ marginRight: "20px" }}></span> 
                            6.	Défaite par dépassement de temps :
                            Dans les parties chronométrées, un joueur perd si son temps imparti est écoulé avant de faire son coup. Les parties professionnelles incluent souvent un temps principal suivi de périodes de byoyomi (secondes de réflexion supplémentaires).
                            <br/><br/><span style={{ marginRight: "20px" }}></span> 
                            7.	Victoire par compte de points (Nyūgyoku, 入玉) :
                            Si un joueur parvient à entrer avec son roi dans le camp adverse (les trois dernières rangées) et à accumuler 24 points ou plus (en comptant le roi et les autres pièces encore sur le plateau), il peut déclarer une victoire par points. L’adversaire a alors la possibilité de tenter de faire de même dans un nombre de coups défini (souvent 24). Si l’adversaire échoue, le joueur ayant atteint le nombre de points requis gagne.
                            <br/><br/><span style={{ marginRight: "20px" }}></span> 
                            8.	Défaite par Ippuku (一歩詰め) :
                            Ce cas rare survient lorsqu’un joueur place son roi en échec à cause d’un parachutage illégal. Cela entraîne une défaite immédiate.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ShogiRules;