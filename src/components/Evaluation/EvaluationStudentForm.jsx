import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import UserServices from '../../Services/UserServices';

function EvaluationStudentForm({onSubmit, handleChange, evaluation, evaluationResultats}) {
    const {formationId, studentId} = useParams();
    const navigate = useNavigate();
    const navigateTo = (route) => {
        navigate(route);
        window.scrollTo(0, 0);
    };
    const [student, setStudent] = useState([]);

    const fetchUserById = async () => {
        try {
            const response = await UserServices.fetchUserById(studentId);
            setStudent(response.data);
        } catch (error) {
            console.error('Error while getting this user', error)
        }
    }

    const colorResultats = {
        "Acquis" : "#059669",
        "En cours d’acquisition" : "#B45309",
        "Non acquis" : "#B91C1C"
    }

    useEffect (() => {
        fetchUserById();
    }, [studentId])

return <>
    <form onSubmit={onSubmit} className='evaluation-student-form'>
        <h2>Apprenant·e : {student.first_name} {student.surname}</h2>
        <div className='evaluation-student-form-results' >
            <p htmlFor="evaluation-resultat">Résultat de l’évaluation* :</p>
            <div className='evaluation-student-form-results-choices' >
                {evaluationResultats.map(evaluationResultat => 
                    <div key={evaluationResultat.id}>
                        <input type="radio" name="evaluation_resultat_id" id={`evaluation-resultat-${evaluationResultat.id}`} value={evaluationResultat.id} onChange={handleChange} required/>
                        <label htmlFor={`evaluation-resultat-${evaluationResultat.id}`} style={{ color : colorResultats[evaluationResultat.name]}}>{evaluationResultat.name}</label>
                    </div>
                )}
            </div>
        </div>
        <div className='evaluation-student-form-comment'>
            <p htmlFor="evaluation-comment">Propositions d’améliorations : </p>
            <textarea rows="5" name="comment" id="evaluation-comment" placeholder='Vos propositions' value={evaluation.comment} onChange={handleChange}></textarea>
        </div>
        <div className='evaluation-student-actions'>
            <span onClick={() => {navigateTo(`/formation/${formationId}/students`)}} className='cancel-button cursor-pointer'>Annuler</span>
            <button type='submit'className='primary-button'>Enregistrer l’évaluation</button>
        </div>
    </form>
    </>
}

export default EvaluationStudentForm
