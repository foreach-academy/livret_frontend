import React from 'react'

function EvaluationTypeForm({onSubmit, handleCheckboxChange, evaluationTypes, selectedEvaluationTypes}) {
    return (
    <form onSubmit={onSubmit}>
        <label htmlFor="evaluation-type">Évaluations réalisées pour ce module * :</label>
        {evaluationTypes.map(evaluationType => 
            <div key={evaluationType.id}>
                <input 
                    type="checkbox" 
                    checked={selectedEvaluationTypes.includes(evaluationType.id)}  // Utiliser selectedEvaluationTypes pour gérer l'état coché
                    name="evaluation_type_id" 
                    id={`evaluation-type-${evaluationType.id}`} 
                    value={evaluationType.id} 
                    onChange={handleCheckboxChange}
                />
                <label htmlFor={`evaluation-type-${evaluationType.id}`}>{evaluationType.name}</label>
            </div>
        )}
        <button type="submit">Enregistrer les réalisations réalisées</button>
    </form> 
    )
}

export default EvaluationTypeForm
