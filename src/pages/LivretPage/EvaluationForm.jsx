import React, { useEffect, useState } from 'react'
import EvaluationServices from '../../Services/EvaluationService'

function EvaluationForm() {
    const [evaluation, setEvaluation] = useState({
        // "module_id": 28,
        // "apprenant_id": 49,
        // "evaluation_type_id": 1,
        "evaluation_resultat_id": null,
        // "comment": "Peut faire mieux"
    })
    const [evaluationTypes, setEvaluationTypes] = useState([]);

    const getAllEvaluationTypes = async () => {
        try {
            const response = await EvaluationServices.getAllEvaluationTypes();
            setEvaluationTypes(response.data);
        } catch (error) {
            console.error('Error while getting evaluation types', error)
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.currentTarget;
        setEvaluation({...evaluation, [name]:value})
    }

    console.log(evaluation)

    useEffect (() => {
        getAllEvaluationTypes();
    }, [])
    
    return (
    <div>
        <form>
            <label htmlFor="evaluation-resultat">Résultat de l'évaluation* :</label>
            {evaluationTypes.map(evaluationType => <>
                <div key={evaluationType.id} >
                    <input type="radio" name="evaluation-resultat" id={`evaluation-resultat-${evaluationType.id}`} value={evaluationType.name} onChange={handleChange}/>
                    <label htmlFor={`evaluation-resultat-${evaluationType.id}`}>{evaluationType.name}</label>
                </div>
            </>
            )}
            <button>Ajouter l'évaluation</button>
        </form>
    </div>
    )
}

export default EvaluationForm
