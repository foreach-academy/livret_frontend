import React, { useState, useEffect, useContext } from 'react'; // Importe React et les hooks useState, useEffect et useContext
import { useParams } from 'react-router-dom'; // Importe le hook pour obtenir les paramètres de l'URL
import UserServices from '../../services/UserServices'; // Importe le service pour interagir avec l'API utilisateur
import AuthContext from '../../context/AuthContext'; // Importe le contexte d'authentification

// Composant EvaluationStudentOverview qui reçoit en props : handleEdit, existingEvaluation, formateurName, evaluationDate et modifiedEvaluationDate
function EvaluationStudentOverview({ handleEdit, existingEvaluation, formateurName, evaluationDate, modifiedEvaluationDate }) {
    // Récupère les paramètres d'URL (moduleId, formationId, studentId)
    const { moduleId, formationId, studentId } = useParams();
    // Accède aux valeurs d'isAdmin et setIsAdmin du contexte AuthContext
    const { isAdmin, setIsAdmin } = useContext(AuthContext);
    const [student, setStudent] = useState([]); // État local pour stocker les données de l'étudiant

    // Fonction asynchrone pour récupérer les informations de l'étudiant
    const fetchUserById = async () => {
        try {
            const response = await UserServices.fetchUserById(studentId); // Appelle l'API pour obtenir les données de l'étudiant
            setStudent(response.data); // Met à jour l'état avec les données de l'étudiant
        } catch (error) {
            console.error('Error while getting this user', error); // Affiche une erreur en cas d'échec de la requête
        }
    };

    // Dictionnaire de couleurs pour chaque type de résultat d'évaluation
    const colorResultats = {
        "Acquis": "#059669", // Vert pour les compétences acquises
        "En cours d’acquisition": "#B45309", // Orange pour les compétences en cours d'acquisition
        "Non acquis": "#B91C1C" // Rouge pour les compétences non acquises
    };

    // Utilise useEffect pour appeler fetchUserById lors du montage du composant ou lorsque studentId change
    useEffect(() => {
        fetchUserById();
    }, [studentId]);

    // Variable pour vérifier si la date de modification est la même que la date de création
    const isModifiedSameAsCreated = evaluationDate === modifiedEvaluationDate;

    return (
        <>
            {/* Formulaire de vue d'ensemble de l'évaluation de l'étudiant */}
            <form className='evaluation-student-form'>
                <div className='evaluation-student-form-header'>
                    {/* Affiche le nom de l'étudiant */}
                    <h2>Apprenant·e : {student.first_name} {student.surname}</h2>
                    {/* Affiche le bouton "Modifier" uniquement si l'utilisateur est un administrateur */}
                    {isAdmin && 
                    <div className='edit-button' onClick={handleEdit}>
                        <span className="material-icons">edit</span>
                        <p>Modifier</p>
                    </div>
                    }
                </div>

                {/* Badges d'informations supplémentaires sur l'évaluation */}
                <div className='badge-overview'>
                    <span className='badge badge-grey'>Date : <span className='bold'>{evaluationDate}</span></span>
                    {/* Affiche la date de modification uniquement si elle diffère de la date de création */}
                    {!isModifiedSameAsCreated && (
                        <span className='badge badge-grey'>Modifié le : <span className='bold'>{modifiedEvaluationDate}</span></span>
                    )}
                    <span className='badge badge-grey'>Formateur : <span className='bold'>{formateurName}</span></span>
                </div>

                {/* Section pour afficher le résultat de l'évaluation */}
                <div className='evaluation-student-form-results'>
                    <p className="evaluation-resultat">
                        Résultat de l’évaluation* : 
                        {/* Affiche le résultat avec une couleur spécifique, ou 'N/A' si aucun résultat */}
                        <span 
                            className='evaluation-resultat-overview' 
                            style={{ color: existingEvaluation.resultat ? colorResultats[existingEvaluation.resultat.name] : '#000' }}
                        >
                            {existingEvaluation.resultat ? existingEvaluation.resultat.name : 'N/A'}
                        </span>
                    </p>
                </div>

                {/* Section pour afficher les propositions d'améliorations si elles existent */}
                {existingEvaluation.comment && 
                    <div className='evaluation-student-form-comment'>
                        <p className="evaluation-comment-title-overview">Propositions d’améliorations :</p>
                        <div className='evaluation-comment-overview-container'>
                            <span className="material-icons-outlined">subdirectory_arrow_right</span>
                            {/* Affiche le commentaire existant */}
                            <div className='evaluation-comment-overview'>{existingEvaluation.comment}</div>
                        </div>
                    </div>
                }
            </form>
        </>
    );
}

export default EvaluationStudentOverview; // Exporte le composant pour pouvoir l'utiliser ailleurs dans l'application