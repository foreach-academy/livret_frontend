import React, { useState } from "react";
import "../../styles/TraineePracticalLife/TraineePracticalLife.css";
import Header from "../../components/shared/navbar/Header";


const TraineePracticalLifePage = () => {

  const [headerHeight, setHeaderHeight] = useState(null);
  return (
    <>
  <Header setHeaderHeight={setHeaderHeight}/>
      <div className="practical_life_section">
        <div id="practical_life_container">
          <div id="practical_life_title">
            <h1>Vie pratique du stagiaire</h1>
          </div>
          <div id="practical_life_img">
            <img
              src={process.env.PUBLIC_URL + "/images/students.png"}
              id="students"
              alt="Deux étudiants un homme et une femme avec dossiers"
            />
          </div>
        </div>
        <div>
          <h2>Informations générales</h2>
        </div>
        <div>
          <ul>
            <li>
              Les horaires de votre formation vous sont communiqués via un
              planning qui vous est remis et disponible sur votre extranet
              HOP3TEAM. Celui-ci peut être sujet à modifications dont vous serez
              informé(e)s par votre formateur référent.
            </li>
            <li>
              La Responsable Campus est Laury BOSSAERT. Vous pouvez la joindre
              pour toute question relative à votre formation, par téléphone au
              06 07 69 23 21 ou par mail, à l’adresse{" "}
              <a href="mailto:laury.bossaert@foreach-academy.fr">
                laury.bossaert@foreach-academy.fr
              </a>
              .
            </li>
          </ul>
          <ul>
            <li>
              Une salle de formation dédiée et équipée est mise à la disposition
              des stagiaires ainsi qu’une salle de restauration où il est
              possible de prendre ses repas sur place. Il est demandé à chacun
              d’être responsable de cet espace et de veiller à sa propreté.
            </li>
          </ul>
          <ul>
            <li>
              Comme stipulé dans le règlement intérieur, les stagiaires doivent
              être présents aux horaires de formation. En cas d’absence ou
              d’imprévu, il est impératif de prévenir dans les meilleurs délais
              pour que la bonne marche de l’organisme puisse continuer d’opérer.
              Le contrôle de l’assiduité des stagiaires est mené à bien tout au
              long des formations, par demi-journée, par le biais des feuilles
              d’émargement mais également par la veille exercée par le formateur
              sur la participation et, dans certains cas, par une attestation
              d’entrée ou de fin de stage.
            </li>
            <li>
              L’organisme de formation peut, s’il l’estime nécessaire, ne pas
              autoriser la remise de l'attestation de formation. Cela peut être
              le cas si le stagiaire a été renvoyé temporairement, n'a pas été
              assidu ou a récidivé après des sanctions initiales (ex : absences
              fréquentes, non-respect des horaires, non-participation aux
              exercices de groupe…).
            </li>
          </ul>
        </div>
        <div id="practical_life_laptops_container">
          <img
            src={process.env.PUBLIC_URL + "/images/bg/two_men_laptops.png"}
            id="two_men_laptops"
            alt="Deux pc portables sur une table avec deux personnes qui travaillent"
          />
          <div id="practical_life_evalutation_container">
            <ul class="practical_life_evaluation">
              <li>
                Pour toutes les formations, une évaluation des acquis est
                effectuée régulièrement.
              </li>
              <li>
                Chaque formateur organise ses évaluations et en informe les
                stagiaires.
              </li>
              <li>Il peut s’agir :</li>
            </ul>
            <ul class="practical_life_evaluation">
              <li class="practical_life_list_style">
                D’un entretien individuel mené avec chacun des stagiaires quant
                à leur positionnement dans le contexte de la formation
                (compétences à développer, adéquation du stagiaire en regard du
                métier visé via la formation, etc.).
              </li>
              <li class="practical_life_list_style">
                D’évaluations formelles régulières individuelles ou collectives.
              </li>
            </ul>
            <ul class="practical_life_evaluation">
              <li>
                Un bilan global est établi par le formateur en fin de session de
                formation et permet de vérifier si les objectifs pédagogiques
                ont été atteints et si la formation est validée en termes
                d’acquisition de compétences.
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h2>Le stagiaire</h2>
        </div>
        <div>
          <ul>
            <li>
              Le stagiaire s’engage à détenir les prérequis minimaux tels que
              stipulés dans le descriptif détaillé de la formation suivie.
            </li>
            <li>
              Le stagiaire doit prendre connaissance du règlement intérieur et
              s’y conformer.
            </li>
          </ul>
          <ul>
            Chaque stagiaire est tenu au respect des règles de vie en
            collectivité, notamment sur le respect :
            <li class="practical_life_list_style">
              De la personne : stagiaires, enseignants, toute personne amenée à
              intervenir dans le cadre de la formation
            </li>
            <li class="practical_life_list_style">
              des règles d’hygiène et civilité
            </li>
            <li class="practical_life_list_style">
              des matériels, locaux et mobiliers
            </li>
          </ul>
          <ul>
            <li>
              Le stagiaire est acteur de sa formation. La richesse de celle-ci
              dépendra de son engagement propre, de son investissement et de sa
              curiosité.
            </li>
            <li>
              Chaque stagiaire doit veiller à sa sécurité personnelle et à celle
              des autres en respectant les consignes générales et particulières
              de sécurité et d’hygiène en vigueur sur le lieu de formation.
            </li>
            <li>
              Tout accident ou incident survenu à l'occasion ou en cours de
              formation doit être immédiatement déclaré par le stagiaire
              accidenté ou les personnes témoins de l'accident au responsable de
              la formation ou à son représentant.
            </li>
            <li>
              Les stagiaires ne devront en aucun cas introduire des produits
              illicites sur le lieu de formation.
            </li>
          </ul>
        </div>
        <div>
          <h2>Charte de confidentialité</h2>
        </div>
        <div>
          <ul>
            <li>
              Dans le cadre de son activité d’organisme de formation, FOREACH
              ACADEMY est amené à traiter des informations vous concernant, dont
              certaines sont de nature à vous identifier (« données personnelles
              »), par le biais de formulaires de contact sur le site{" "}
              <a href="http://www.foreach-academy.fr">
                http://www.foreach-academy.fr{" "}
              </a>
              , documents d’ordre administratif ou contractuel, et de nos
              échanges par courrier, courrier ou téléphone.
            </li>
          </ul>
          <ul>
            <li>
              Vos informations personnelles nous permettent notamment de traiter
              vos demandes, d’assurer nos prestations de formation et
              d’améliorer la qualité de nos services. Elles servent aussi à
              mieux vous connaitre pour vous proposer des contenus et des
              formations personnalisées, adaptés à vos besoins. FOREACH ACADEMY
              s’engage à ce que la collecte et le traitement de vos données
              soient conformes au Règlement général sur la protection des
              données (RGPD) et à la loi informatique et libertés du 6 janvier
              1978 modifiée, en matière de protection des données.
            </li>
          </ul>
          <ul>
            <li>
              Afin de garantir le meilleur niveau de protection de vos
              informations, la présente charte de confidentialité vous informe
              de la manière dont nous recueillons et traitons vos données
              personnelles. Nous vous invitons à la lire attentivement.Nous nous
              réservons le droit de modifier la présente charte de
              confidentialité à tout moment. Vous en serez alors informés.
            </li>
          </ul>
          <ul>
            <li className="bold_policy_chapter">
              1 - Pour quelles finalités ulisons-nous vos données ?
            </li>
            <li>
              Nous utilisons vos données personnelles dans les cas prévus par la
              réglementation en vigueur :
            </li>
            <li>
              - Vous fournir les informations ou les services que vous avez
              demandés
            </li>
            <li>- L’exécution d’un contrat ou d’une convention de formation</li>
            <li>- Le respect d’une obligation légale ou réglementaire</li>
            <li>- Votre consentement à l’utilisation de vos données</li>
            <li>
              - L’existence d’un intérêt légitime à utiliser vos données, comme
              par exemple pouvoir vous contacter à propos de différents
              événements relatifs à FOREACH ACADEMY.
            </li>
          </ul>
          <ul>
            Dans tous les cas, vos données personnelles ne sont utilisées que
            dans le cadre de votre formation ou de votre projet professionnel.
          </ul>
          <ul>
            <li className="bold_policy_chapter">
              2 - Quelle est la nature de vos données collectées ?
            </li>
            <li>Les données que vous nous transmettez directement</li>
            <li>
              A l’occasion, des différents contacts que nous avons avec vous,
              vous pouvez être amené à nous communiquer des informations qui
              vous concernent. Elles sont collectées notamment lors d’une
              demande d’information ou un intérêt de votre part concernant notre
              offre de formation.
            </li>
          </ul>
          <ul>
            <li>
              Les données que nous recueillons à l’occasion du suivi de notre
              relation
            </li>
            <li>
              Il s’agit notamment des informations relatives à l’historique de
              votre relation commerciale avec FOREACH ACADEMY ou du suivi du
              parcours de formation.
            </li>
          </ul>
          <ul>
            <li>Exclusion de toute donnée sensible</li>
            <li>
              FOREACH ACADEMY ne collecte aucune donnée sensible vous
              concernant. Sont considérés comme des données sensibles :
              l’origine raciale ou ethnique, les opinions politiques, les
              croyances religieuses ou philosophiques, l’adhésion à un syndicat,
              les données relatives à l’orientation sexuelle. Si de telles
              informations étaient d’une manière ou d’une autre communiquées à
              FOREACH ACADEMY, elles seront supprimées.
            </li>
          </ul>
          <ul>
            <li className="bold_policy_chapter">
              3 - Quelles opérations sont réalisées sur les données ?
            </li>
            <li>
              Les opérations susceptibles d’être réalisées sur vos données sont
              : création, consultation, modification, extraction,
              sauvegarde/restauration, transferts restreints aux destinataires
              mentionnés paragraphe 4, effacement au terme de la durée de
              conservation.
            </li>
          </ul>
          <ul>
            <li className="bold_policy_chapter">
              4 - Destinataires internes et externes
            </li>
            <li>
              Sont susceptibles d’avoir accès à certaines de vos données :
            </li>
            <li>
              - Notre équipe en interne : les personnes qui assurent votre suivi
              de formation, le personnel administratif pour la gestion des
              contrats, conventions, factures…
            </li>
            <li>
              - Les formateurs : qui assurent les prestations de formation et
              qui doivent pouvoir vous fournir les informations nécessaires au
              bon déroulement de celle-ci.
            </li>
            <li>
              - Les autorités de police, autorités judiciaires ou
              administratives lorsque nous avons l’obligation légale de le faire
              ou afin de garantir les droits, les biens et la sécurité de
              FOREACH ACADEMY.
            </li>
          </ul>
          <ul>
            <li>
              Par ailleurs, FOREACH ACADEMY s’engage à ne pas communiquer,
              transférer ou diffuser vos données personnelles à des tiers, sauf
              :
            </li>
            <li>
              - A des fins de respect d’une obligation légale ou réglementaire à
              laquelle FOREACH ACADEMY est soumis
            </li>
            <li>
              - A des fins d’exécution de votre contrat ou convention de
              formation
            </li>
            <li>- Ou si vous donnez votre accord explicite.</li>
          </ul>
          <ul>
            <li className="bold_policy_chapter">
              5 - Vos droits concernant vos données personnelles
            </li>
            <li>Vous disposez des droits suivants :</li>
            <li>- Droit d’accès (Art. 15 du RGPD)</li>
            <li>- Droit de rectification (Art. 16 du RGPD)</li>
            <li>- Droit d’effacement (Art. 17 du RGPD)</li>
            <li>- Droit à la limitation du traitement (Art. 18 du RGPD)</li>
            <li>- Droit à la portabilité des données (Art. 20 du RGPD)</li>
            <li>- Droit d’opposition (Art. 21 du RGPD)</li>
          </ul>
          <ul>
            <li className="bold_policy_chapter">
              6 - Comment exercer vos droits ?
            </li>
            <li>
              Les droits mentionnés ci-dessus peuvent être exercés, en
              justifiant de votre identité, sur simple demande écrite adressée
              par courrier à : FOREACH ACADEMY – 393 rue du Général de Gaulle,
              59700 MARCQ EN BAROEUL ou par courriel :
              <a
                href="mailto:campus-lille@foreach-academy.fr"
                className="practical_life_links"
              >
                campus-lille@foreach-academy.fr
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 id="rights_obligations">
            EN TANT QU'ALTERNANT, QUELS SONT MES DROITS... ET MES OBLIGATIONS ?
          </h2>
        </div>
        <div id="rights_obligations_container">
          <div id="rights">
            <ul>
              <li className="rights_obligations_list">
                1 - Tes droits d'alternant
              </li>
              <li className="rights_obligations_list_dot">
                Le contrat de travail
              </li>
              <li>
                Avec ce contrat qui engage 3 parties prenantes (toi,
                l’entreprise et l’école), l’entreprise s’engage à te désigner un
                tuteur qui va t’encadrer tout au long de ton contrat et te
                donner des missions correspondantes à une fiche de poste. Ce
                contrat définit les conditions : date de début, durée, mission,
                horaires, salaire, etc.
              </li>
              <li className="rights_obligations_list_dot">
                Le statut de salarié
              </li>
              <li>
                En tant qu’alternant, tu accèdes aux mêmes droits que les autres
                salariés de ton entreprise : congés, RTT, CSE, ticket ou carte
                de restauration, etc. Tu bénéficies des dispositions
                législatives, réglementaires ou conventionnelles applicables aux
                autres salariés de ton entreprise.
              </li>
              <li className="rights_obligations_list">Bon à savoir</li>
              <li>
                Tu es en désaccord avec ton employeur ? Si la situation ou le
                dialogue est compliqué, tu peux faire appel au{" "}
                <a href="https://www.service-public.fr/particuliers/vosdroits/F31633">
                  médiateur de l’apprentissage{" "}
                </a>{" "}
                afin de trouver des solutions qui conviennent à chacune des deux
                parties.
              </li>
            </ul>
          </div>
          <div id="obligations">
            <ul>
              <li className="rights_obligations_list">
                2 - Tes obligations d'alternant
              </li>
              <li className="rights_obligations_list_dot">
                La présence en cours
              </li>
              <li>
                Pour toute absence, tu dois en avertir ton tuteur, le centre de
                formation et transmettre un justificatif (sous 48h) comme pour
                un arrêt de travail. Et oui, ta formation étant payée par ton
                entreprise, tu es dans l’obligation de l’en informer ! Les
                absences qui peuvent être justifiées en formation : maladie
                (avec arrêt de travail), convocation (examen, jury, permis…sur
                présentation de celle-ci), mariage, naissance, décès d’un
                proche, journée d’appel. Pour un autre motif, l’absence pourra
                être considérée comme injustifiée et entrainer une perte de
                salaire.
              </li>
              <li className="rights_obligations_list_dot">
                L'implication dans l'entreprise
              </li>
              <li>
                Le rythme école/entreprise n’est pas forcément facile à suivre
                au début mais cela fait partie du jeu. Comme à l’école,
                l’entreprise attend de toi de la ponctualité, de l’assiduité
                mais aussi de la motivation dans tes missions. Donne le meilleur
                de toi-même, c’est ton avenir qui est en jeu !
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TraineePracticalLifePage;
