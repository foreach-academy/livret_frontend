import React, {useState, useEffect} from 'react'; // Importe React et les hooks useState, useEffect
import { useNavigate, useParams } from 'react-router-dom'; // Importe les hooks de navigation et de gestion des paramètres d'URL
import UserServices from '../../services/UserServices'; // Importe les services pour la gestion des utilisateurs

// Composant EvaluationStudentForm qui reçoit les props suivantes : mode d'édition, fonctions de fermeture et soumission, gestion du changement, évaluation actuelle et résultats d'évaluation
function EvaluationStudentForm({isEditMode, closeIsEditMode, onSubmit, handleChange, evaluation, evaluationResultats, existingEvaluation}) {
    const {formationId, studentId} = useParams(); // Récupère les IDs de formation et d'étudiant depuis l'URL
    const navigate = useNavigate(); // Hook pour naviguer entre les pages

    // Fonction pour naviguer vers une route donnée
    const navigateTo = (route) => {
        navigate(route);
        window.scrollTo(0, 0); // Fait défiler la page vers le haut
    };

    const [student, setStudent] = useState([]); // État pour stocker les données de l'étudiant

    // Fonction pour récupérer les données d'un étudiant par son ID
    const fetchUserById = async () => {
        try {
            const response = await UserServices.fetchUserById(studentId); // Appelle l'API pour obtenir les données de l'utilisateur
            setStudent(response.data); // Stocke les données de l'étudiant dans l'état
        } catch (error) {
            console.error('Error while getting this user', error); // Gère les erreurs en cas d'échec de la requête
        }
    };

    // Dictionnaire pour définir les couleurs associées aux résultats d'évaluation
    const colorResultats = {
        "Acquis" : "#059669", // Couleur verte pour les compétences acquises
        "En cours d’acquisition" : "#B45309", // Couleur orange pour les compétences en cours d'acquisition
        "Non acquis" : "#B91C1C" // Couleur rouge pour les compétences non acquises
    };

    // Effectue un appel pour récupérer les informations de l'étudiant chaque fois que studentId change
    useEffect (() => {
        fetchUserById();
    }, [studentId]);

    return <>
        {/* Formulaire pour l'évaluation de l'étudiant */}
        <form onSubmit={onSubmit} className='evaluation-student-form'>
            {/* Titre du formulaire, qui change selon le mode d'édition */}
            <h2>{isEditMode ? `Modifer l'évaluation : ${student.first_name} ${student.surname}` : `Apprenant·e : ${student.first_name} ${student.surname}`}</h2>
            
            {/* Section pour choisir le résultat de l'évaluation */}
            <div className='evaluation-student-form-results'>
                <p htmlFor="evaluation-resultat">Résultat de l’évaluation* :</p>
                
                <div className='evaluation-student-form-results-choices'>
                    {/* Boucle pour afficher chaque option de résultat */}
                    {evaluationResultats.map(evaluationResultat => 
                        <div key={evaluationResultat.id}>
                            {/* Radio bouton pour chaque résultat d'évaluation */}
                            <input 
                                type="radio" 
                                name="evaluation_resultat_id" 
                                id={`evaluation-resultat-${evaluationResultat.id}`} 
                                value={evaluationResultat.id} 
                                onChange={handleChange} 
                                required 
                                defaultChecked={existingEvaluation ? existingEvaluation.evaluation_resultat_id === evaluationResultat.id : false} // Coche par défaut si l'évaluation existe
                            />
                            {/* Label pour afficher le nom du résultat, coloré selon le dictionnaire colorResultats */}
                            <label 
                                htmlFor={`evaluation-resultat-${evaluationResultat.id}`} 
                                style={{ color : colorResultats[evaluationResultat.name]}}
                            >
                                {evaluationResultat.name}
                            </label>
                        </div>
                    )}
                </div>
            </div>

            {/* Section pour saisir des propositions d'amélioration */}
            <div className='evaluation-student-form-comment'>
                <p htmlFor="evaluation-comment">Propositions d’améliorations :</p>
                {/* Zone de texte pour écrire les propositions d'amélioration */}
                <textarea 
                    rows="5" 
                    name="comment" 
                    id="evaluation-comment" 
                    placeholder='Vos propositions' 
                    value={evaluation.comment} 
                    onChange={handleChange}
                ></textarea>
            </div>

            {/* Boutons d'action */}
            <div className='evaluation-student-actions'>
                {/* Bouton pour annuler, change de fonction selon le mode d'édition */}
                <span 
                    onClick={isEditMode ? closeIsEditMode : () => {navigateTo(`/formation/${formationId}/students`)}}
                    className='cancel-button cursor-pointer'
                >
                    Annuler
                </span>
                {/* Bouton de soumission, change de texte selon le mode d'édition */}
                <button type='submit' className='primary-button'>
                    {isEditMode ? "Mettre à jour l'évaluation" : "Enregistrer l’évaluation"}
                </button>
            </div>
        </form>
    </>
}

export default EvaluationStudentForm; // Exporte le composant pour l'utiliser dans d'autres parties de l'application
