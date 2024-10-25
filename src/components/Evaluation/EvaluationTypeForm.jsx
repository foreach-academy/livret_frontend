import React from 'react'; // Importe React pour créer le composant

// Composant fonctionnel qui gère un formulaire de sélection de types d'évaluation
// Reçoit en props : onSubmit (pour la soumission), handleCheckboxChange (pour gérer les changements de cases), 
// evaluationTypes (liste des types d'évaluation), et selectedEvaluationTypes (types sélectionnés)
function EvaluationTypeForm({ onSubmit, handleCheckboxChange, evaluationTypes, selectedEvaluationTypes }) {
    return (
        // Formulaire qui appelle onSubmit à la soumission
        <form onSubmit={onSubmit} className='evaluation-type-form'>
            {/* Titre du formulaire */}
            <label htmlFor="evaluation-type" className='evaluation-type-form-title'>
                Évaluations réalisées pour ce module * :
            </label>
            {/* Conteneur pour les cases à cocher */}
            <div className='evaluation-type-form-checkbox'>
                {/* Boucle sur chaque type d'évaluation pour créer une case à cocher */}
                {evaluationTypes.map(evaluationType => 
                    <div key={evaluationType.id}> {/* Utilise l'ID unique pour la clé */}
                        <input 
                            type="checkbox" 
                            checked={selectedEvaluationTypes.includes(evaluationType.id)}  // Détermine si la case est cochée
                            name="evaluation_type_id" 
                            id={`evaluation-type-${evaluationType.id}`} 
                            value={evaluationType.id} 
                            onChange={handleCheckboxChange} // Gère le changement d'état
                        />
                        <label htmlFor={`evaluation-type-${evaluationType.id}`}>
                            {evaluationType.name} {/* Affiche le nom du type d'évaluation */}
                        </label>
                    </div>
                )}
            </div>
            {/* Bouton de soumission */}
            <button type="submit" className='primary-button'>
                Enregistrer les évaluations réalisées
            </button>
        </form> 
    );
}

export default EvaluationTypeForm; // Exporte le composant pour utilisation ailleurs