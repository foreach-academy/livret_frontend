import React, { useEffect, useState } from 'react'
import EvaluationServices from '../../Services/EvaluationService'
import { toast } from 'react-toastify'

function EvaluationForm() {
    const [evaluation, setEvaluation] = useState({
        // "module_id": 28,
        // "apprenant_id": 49,
        "evaluation_type_id": null,
        // "evaluation_resultat_id": null,
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

    const addEvaluation = async (event) => {
        event.preventDefault();
        try {
            await EvaluationServices.addEvaluation(evaluation);
            toast.success("Évaluation ajoutée avec succès")
        } catch (error) {
            console.error('Error while creating evaluation', error)
        }
    }

    console.log("evaluation" + evaluation)

    useEffect (() => {
        getAllEvaluationTypes();
    }, [])
    
    return (
    <div>
        <form onSubmit={addEvaluation}>
            <label htmlFor="evaluation-type">Évaluations réalisées pour ce module * :</label>
            {evaluationTypes.map(evaluationType => <>
                <div key={evaluationType.id} >
                    <input type="radio" name="evaluation_type_id" id={`evaluation-type-${evaluationType.id}`} value={evaluationType.id} onChange={handleChange}/>
                    <label htmlFor={`evaluation-type-${evaluationType.id}`}>{evaluationType.name}</label>
                </div>
            </>
            )}
            <button type='submit'>Ajouter l'évaluation</button>
        </form>
    </div>
    )
}

export default EvaluationForm
