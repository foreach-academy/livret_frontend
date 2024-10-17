import React from 'react'

function EvaluationTypeForm({onSubmit, handleCheckboxChange, evaluationTypes, selectedEvaluationTypes}) {
    return (
    <form onSubmit={onSubmit} className='evaluation-type-form'>
        <label htmlFor="evaluation-type" className='evaluation-type-form-title'>Évaluations réalisées pour ce module * :</label>
        <div className='evaluation-type-form-checkbox'>
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
        </div>
        <button type="submit" className='primary-button'>Enregistrer les évaluations réalisées</button>
    </form> 
    )
}

export default EvaluationTypeForm
