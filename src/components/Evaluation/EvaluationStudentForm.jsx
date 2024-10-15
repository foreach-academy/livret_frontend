import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import UserServices from '../../Services/UserServices';

function EvaluationStudentForm({onSubmit, studentId, handleChange, evaluation, evaluationResultats}) {
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

    useEffect (() => {
        fetchUserById();
    }, [])

return <>
    <h1></h1>
    <form onSubmit={onSubmit}>
        <h2>Apprenant à évaluer : {student.first_name} {student.surname}</h2>
        <label htmlFor="evaluation-resultat">Résultat de l’évaluation* :</label>
        {evaluationResultats.map(evaluationResultat => 
            <div key={evaluationResultat.id} >
                <input type="radio" name="evaluation_resultat_id" id={`evaluation-resultat-${evaluationResultat.id}`} value={evaluationResultat.id} onChange={handleChange} required/>
                <label htmlFor={`evaluation-resultat-${evaluationResultat.id}`}>{evaluationResultat.name}</label>
            </div>
        )}
        <div>
            <label htmlFor="evaluation-comment"></label>
            <textarea name="comment" id="evaluation-comment" placeholder='Vos propositions' value={evaluation.comment} onChange={handleChange}></textarea>
        </div>
        <button onClick={() => {navigateTo('../')}}>Annuler</button>
        <button type='submit'>Enregistrer l’évaluation</button>
    </form>
    </>
}

export default EvaluationStudentForm
