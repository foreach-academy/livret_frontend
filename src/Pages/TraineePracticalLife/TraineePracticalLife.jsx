import React from 'react';
import '../../styles/TraineePracticalLife/TraineePracticalLife.css';
import PracticalLifeImg from '../../assets/images/PracticalLifeImg.png';
import two_men_laptops from '../../assets/images/two_men_laptops.png';

const TraineePracticalLife = () => {
    return (
      <div className="practical_life_section">
        <div id="practical_life_container">
          <div id="practical_life_title">
            <h1>Vie pratique du stagiaire</h1>
          </div>
          <div id="practical_life_img">
            <img
              src={PracticalLifeImg}
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
              06 07 69 23 21 ou par mail, à l’adresse
              laury.bossaert@foreach-academy.fr.
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
          <div>
          <img
              src={two_men_laptops}
              id="two_men_laptops"
              alt="Deux pc portables sur une table avec deux personnes qui travaillent"
            />
          </div>
          <div>
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
                <li>Le stagiaire s’engage à détenir les prérequis minimaux tels que stipulés 
                dans le descriptif détaillé de la formation suivie.</li>
                <li>Le stagiaire doit prendre connaissance du règlement intérieur et s’y conformer.</li>
            </ul>
            <ul>
        Chaque stagiaire est tenu au respect des règles de vie en collectivité, notamment sur le respect :
        <li class="practical_life_list_style">De la personne : stagiaires, enseignants, toute personne amenée à intervenir dans le cadre de la formation</li>
        <li class="practical_life_list_style">des règles d’hygiène et civilité</li>
        <li class="practical_life_list_style">des matériels, locaux et mobiliers</li>
        </ul>
        <ul>
        <li>Le stagiaire est acteur de sa formation. La richesse de celle-ci dépendra de son engagement propre, de son investissement et de sa curiosité.</li>
        <li>Chaque stagiaire doit veiller à sa sécurité personnelle et à celle des autres en respectant les consignes générales et particulières de sécurité et d’hygiène en vigueur sur le lieu de formation.</li>
        <li>Tout accident ou incident survenu à l'occasion ou en cours de formation doit être immédiatement déclaré par le stagiaire accidenté ou les personnes témoins de l'accident au responsable de la formation ou à son représentant.</li>
        <li>Les stagiaires ne devront en aucun cas introduire des produits illicites sur le lieu de formation.</li>
        </ul>
        </div>
      </div>
    );
}

export default TraineePracticalLife;
