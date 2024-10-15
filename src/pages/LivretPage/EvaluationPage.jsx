import React, { useEffect, useState } from 'react'
import EvaluationServices from '../../Services/EvaluationService'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import UserServices from '../../Services/UserServices';
import EvaluationTypeForm from '../../components/Evaluation/EvaluationTypeForm';
import EvaluationStudentForm from '../../components/Evaluation/EvaluationStudentForm';

function EvaluationPage() {
    const {moduleId, studentId} = useParams();
    const [module, setModule] = useState({});
    const [evaluation, setEvaluation] = useState({
        module_id: moduleId,
        apprenant_id: studentId,
        evaluation_resultat_id: null,
        comment: ""
    })
    const [evaluationTypes, setEvaluationTypes] = useState([]);
    const [existingEvaluationTypes, setExistingEvaluationTypes] = useState([]);
    const [evaluationResultats, setEvaluationResultats] = useState([]);
    const [selectedEvaluationTypes, setSelectedEvaluationTypes] = useState([]);

    const getModuleById = async () => {
        try {
            const response = await EvaluationServices.getModuleById(moduleId);
            setModule(response.data);
        } catch (error) {
            console.error('Error while fetching this module', error)
        }
    }

    const getAllEvaluationTypes = async () => {
        try {
            const response = await EvaluationServices.getAllEvaluationTypes();
            setEvaluationTypes(response.data);
        } catch (error) {
            console.error('Error while getting evaluation types', error)
        }
    }

    const getEvaluationTypeByModuleId = async () => {
        try {
            const response = await EvaluationServices.getEvaluationTypeByModuleId(moduleId);
            const selectedIds = response.data.map(type => type.evaluation_type_id);
            setExistingEvaluationTypes(response.data);
            setSelectedEvaluationTypes(selectedIds); 
        } catch (error) {
            console.error('Error while getting existing evaluation types', error)
        }
    }

    const getAllEvaluationResultats = async () => {
        try {
            const response = await EvaluationServices.getAllEvaluationResultats();
            setEvaluationResultats(response.data);
        } catch (error) {
            console.error('Error while getting evaluation results', error)
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.currentTarget;
        setEvaluation({...evaluation, [name]:value})
    }

    const handleCheckboxChange = (event) => {
        const value = parseInt(event.target.value);
        setSelectedEvaluationTypes((prevSelected) =>
            prevSelected.includes(value)
                ? prevSelected.filter(id => id !== value) // Uncheck
                : [...prevSelected, value] // Check
        );
    };

    const addEvaluation = async (event) => {
        event.preventDefault();
        if (!evaluation.evaluation_resultat_id) {
            toast.error("Veuillez sélectionner un résultat d'évaluation.");
            return;
        }
        try {
            await EvaluationServices.addEvaluation(evaluation);
            toast.success("Évaluation ajoutée avec succès")
        } catch (error) {
            console.error('Error while creating evaluation', error)
        }
    }

    const addEvaluationTypeToModule = async (event) => {
        event.preventDefault();
        try {
            const selectedEvaluationTypes = Array.from(
                document.querySelectorAll('input[name="evaluation_type_id"]:checked')
            ).map(input => parseInt(input.value));
    
            const existingEvaluationTypeIds = existingEvaluationTypes.map(type => type.evaluation_type_id);
            const evaluationTypesToAdd = selectedEvaluationTypes.filter(id => !existingEvaluationTypeIds.includes(id));
            const evaluationTypesToRemove = existingEvaluationTypeIds.filter(id => !selectedEvaluationTypes.includes(id));
    
            // Ajouter les nouveaux types d'évaluation
            for (const typeId of evaluationTypesToAdd) {
                await EvaluationServices.addEvaluationTypeToModule({
                    module_id: moduleId,
                    evaluation_type_id: typeId
                });
            }
    
            // Supprimer les types d'évaluation non sélectionnés
            for (const typeId of evaluationTypesToRemove) {
                await EvaluationServices.removeEvaluationTypeFromModule({
                    module_id: moduleId,
                    evaluation_type_id: typeId  // Assurez-vous d'envoyer ces paramètres
                });
            }
    
            toast.success("Mise à jour effectuée");
        } catch (error) {
            console.error("Erreur lors de l'ajout du type d'évaluation", error);
            toast.error("Erreur lors de l'ajout du type d'évaluation'");
        }
    }
    

    useEffect (() => {
        getAllEvaluationTypes();
        getAllEvaluationResultats();
        getModuleById();
        // fetchUserById();
        getEvaluationTypeByModuleId();
    }, [])

    return (
    <div>
        <h1>{module.title}</h1>
        {/* <form onSubmit={addEvaluationTypeToModule}>
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
        </form> */}
        <EvaluationTypeForm onSubmit={addEvaluationTypeToModule} handleCheckboxChange={handleCheckboxChange} evaluationTypes={evaluationTypes} selectedEvaluationTypes={selectedEvaluationTypes} />
        <EvaluationStudentForm onSubmit={addEvaluation} studentId={studentId} handleChange={handleChange} evaluation={evaluation} evaluationResultats={evaluationResultats} />
    </div>
    )
}

export default EvaluationPage
