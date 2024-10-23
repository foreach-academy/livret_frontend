import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserServices from '../../Services/UserServices';
import AuthContext from '../../Context/AuthContext';

function EvaluationStudentOverview({ handleEdit, existingEvaluation, formateurName, evaluationDate, modifiedEvaluationDate }) {
    const { moduleId, formationId, studentId } = useParams();
    const { isAdmin, setIsAdmin } = useContext(AuthContext);
    const [student, setStudent] = useState([]);

    const fetchUserById = async () => {
        try {
            const response = await UserServices.fetchUserById(studentId);
            setStudent(response.data);
        } catch (error) {
            console.error('Error while getting this user', error);
        }
    };

    const colorResultats = {
        "Acquis": "#059669",
        "En cours d’acquisition": "#B45309",
        "Non acquis": "#B91C1C"
    };

    useEffect(() => {
        fetchUserById();
    }, [studentId]);

    // Vérifier si les dates sont identiques
    const isModifiedSameAsCreated = evaluationDate === modifiedEvaluationDate;

    return (
        <>
            <form className='evaluation-student-form'>
                <div className='evaluation-student-form-header'>
                    <h2>Apprenant·e : {student.first_name} {student.surname}</h2>
                    {isAdmin && 
                    <div className='edit-button' onClick={handleEdit}>
                        <span className="material-icons">edit</span>
                        <p>Modifier</p>
                    </div>
                    }
                </div>
                <div className='badge-overview'>
                    <span className='badge badge-grey'>Date : <span className='bold'>{evaluationDate}</span></span>
                    {!isModifiedSameAsCreated && (  // Afficher seulement si les dates sont différentes
                        <span className='badge badge-grey'>Modifié le : <span className='bold'>{modifiedEvaluationDate}</span></span>
                    )}
                    <span className='badge badge-grey'>Formateur : <span className='bold'>{formateurName}</span></span>
                </div>
                <div className='evaluation-student-form-results'>
                    <p className="evaluation-resultat">Résultat de l’évaluation* : <span className='evaluation-resultat-overview' style={{ color: existingEvaluation.resultat ? colorResultats[existingEvaluation.resultat.name] : '#000' }}>
                        {existingEvaluation.resultat ? existingEvaluation.resultat.name : 'N/A'}</span></p>
                </div>
                {existingEvaluation.comment && 
                    <div className='evaluation-student-form-comment'>
                        <p className="evaluation-comment-title-overview">Propositions d’améliorations : </p>
                        <div className='evaluation-comment-overview-container'>
                            <span className="material-icons-outlined">subdirectory_arrow_right</span>
                            <div className='evaluation-comment-overview'>{existingEvaluation.comment}</div>
                        </div>
                    </div>
                }
            </form>
        </>
    );
}

export default EvaluationStudentOverview;
