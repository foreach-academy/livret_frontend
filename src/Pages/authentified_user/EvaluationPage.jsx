import React, { useEffect, useState } from 'react'
import EvaluationServices from '../../services/EvaluationService'
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'
import EvaluationTypeForm from '../../components/Evaluation/EvaluationTypeForm';
import EvaluationStudentForm from '../../components/Evaluation/EvaluationStudentForm';
import "../../styles/LivretPage/EvaluationPage.css"
import FormationServices from '../../services/FormationServices';
import EvaluationStudentOverview from '../../components/Evaluation/EvaluationStudentOverview';
import { formatDate, formatDateWhithHours } from '../../utils/formatters';
import UserServices from '../../services/UserServices';

function EvaluationPage() {
    const {formationId, moduleId, studentId} = useParams();
    const [existingEvaluation, setExistingEvaluation] = useState();
    const formateurId = UserServices.getUserId();
    const navigate = useNavigate();
    const [module, setModule] = useState({});
    const [evaluation, setEvaluation] = useState({
        module_id: moduleId,
        apprenant_id: studentId,
        evaluation_resultat_id: existingEvaluation?.evaluation_resultat_id || null,
        comment: existingEvaluation?.comment || ""
    })
    const [evaluationTypes, setEvaluationTypes] = useState([]);
    const [existingEvaluationTypes, setExistingEvaluationTypes] = useState([]);
    const [evaluationResultats, setEvaluationResultats] = useState([]);
    const [selectedEvaluationTypes, setSelectedEvaluationTypes] = useState([]);
    const [students, setStudents] = useState([]);
    const [formateurName, setFormateurName] = useState("");
    const [evaluationDate, setEvaluationDate] = useState("");
    const [modifiedEvaluationDate, setModifiedEvaluationDate] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);

    const getModuleById = async () => {
        try {
            const response = await EvaluationServices.getModuleById(moduleId);
            setModule(response.data);
            setFormateurName(response.data.formateur.first_name + " " + response.data.formateur.surname);
        } catch (error) {
            console.error('Error while fetching this module', error)
        }
    }

    const getStudentEvaluationsByModule = async () => {
        try {
            const response = await FormationServices.getStudentEvaluationsByModule(studentId, moduleId);
            const evaluationData = response.data.evaluation && response.data.evaluation.length > 0 ? response.data.evaluation[0] : null;
            setExistingEvaluation(evaluationData);
            if (evaluationData) {
                setEvaluationDate(formatDateWhithHours(evaluationData.created_at));
                setModifiedEvaluationDate(formatDateWhithHours(evaluationData.updated_at));
            } else {
                setEvaluationDate(null); 
                setModifiedEvaluationDate(null);
            }
        } catch (error) {
            console.error('Error while fetching this evaluation', error);
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
        setEvaluation(evaluation => ({...evaluation, [name]:value}))
    }

    const handleCheckboxChange = (event) => {
        const value = parseInt(event.target.value);
        setSelectedEvaluationTypes((prevSelected) =>
            prevSelected.includes(value)
                ? prevSelected.filter(id => id !== value) // Uncheck
                : [...prevSelected, value] // Check
        );
    };

    const handleEdit = () => {
        setIsEditMode(true);
    }

    const addEvaluation = async (event) => {
        event.preventDefault();
        if (!evaluation.evaluation_resultat_id) {
            toast.error("Veuillez sélectionner un résultat d'évaluation.");
            return;
        }
        try {
            await EvaluationServices.addEvaluation(evaluation);
            toast.success("Évaluation ajoutée avec succès");
            getStudentEvaluationsByModule();
            await fetchStudents();
        } catch (error) {
            console.error('Error while creating evaluation', error)
        }
    }
    const editEvaluation = async (event) => {
        event.preventDefault();
        const evaluationId = existingEvaluation.id;
        try {
            await EvaluationServices.editEvaluation(evaluationId, evaluation);
            toast.success("Évaluation modifiée avec succès");
            getStudentEvaluationsByModule();
            setIsEditMode(false);
            await fetchStudents();
            setEvaluation({
                module_id: moduleId,
                apprenant_id: studentId,
                evaluation_resultat_id: null,  // Remettre à null ou à une valeur par défaut
                comment: "" // Vider le champ commentaire
            });
        } catch (error) {
            console.error('Error while editing evaluation', error)
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

    const fetchStudents = async () => {
        const response = await FormationServices.getStudentsEvaluationsByFormationAndModule(formationId, moduleId);
        setStudents(response.data.apprenants);
    };

    const studentsToEvaluate = students.filter((student) => {
        return student.evaluation && student.evaluation.length <= 0;
    })    

    const evaluatedStudents = students.filter((student) => {
        return student.evaluation && student.evaluation.length > 0;
    })    
    
    useEffect(() => {
        getStudentEvaluationsByModule();
    }, [studentId]);

    useEffect(() => {
        if (existingEvaluation) {
            setEvaluation({
                module_id: moduleId,
                apprenant_id: studentId,
                evaluation_resultat_id: existingEvaluation.evaluation_resultat_id || null,
                comment: existingEvaluation.comment || ""
            });
        }
    }, [existingEvaluation]);

    useEffect (() => {
        getAllEvaluationTypes();
        getAllEvaluationResultats();
        getModuleById();
        fetchStudents();
        getEvaluationTypeByModuleId();
        document.body.classList.add('grey-background');
        return () => {
            document.body.classList.remove('grey-background');
        }
    }, [])

    return (
    <div className='evaluation-form'>
        <section>
            <div className='evaluation-form-header-container'>
                <div className='back-button' onClick={()=>{navigate(`/formation/${formationId}/students`)}}>
                    <span className="material-icons-outlined">expand_circle_down</span>
                    <span>Retour</span>
                </div>
                <h1>{module.title}</h1>
            </div>
        </section>
        <section className='evaluation-form-main-container'>
            <aside className='evaluation-form-nav-container'>
                <div className='evaluation-form-students-to-evaluate'>
                    <p>Apprenant·e·s à évaluer : </p>
                    <ul>
                        {studentsToEvaluate.map((student)=>(
                            <li key={student.id}  style={{fontWeight: student.id == studentId ? "bold" : "normal"}} onClick={()=>{navigate(`/evaluation-form/${formationId}/${moduleId}/${student.id}`)}}>{student.first_name} {student.surname}</li>
                        ))}
                    </ul>
                </div>
                <hr className='evaluation-form-divider' />
                <div className='evaluation-form-evaluated-students'>
                    <p>Apprenant·e·s évalué·e·s : </p>
                    <ul>
                        {evaluatedStudents.map((student)=>(
                            <li key={student.id} style={{fontWeight: student.id == studentId ? "bold" : "normal"}} onClick={()=>{navigate(`/evaluation-form/${formationId}/${moduleId}/${student.id}`)}}>{student.first_name} {student.surname}</li>
                        ))}
                    </ul>
                </div>
            </aside>
            <div className='form'>
                <EvaluationTypeForm onSubmit={addEvaluationTypeToModule} handleCheckboxChange={handleCheckboxChange} evaluationTypes={evaluationTypes} selectedEvaluationTypes={selectedEvaluationTypes} />
                {!existingEvaluation && !isEditMode ? (
                    module.formateur && module.formateur.id === formateurId ? (
                        <EvaluationStudentForm isEditMode={isEditMode} onSubmit={addEvaluation} handleChange={handleChange} evaluation={evaluation} evaluationResultats={evaluationResultats} />
                    ) : (
                        <div className='evaluation-empty-state'>Le formateur n'a pas encore ajouté d'évaluation</div>
                    )
                ) : (
                    isEditMode ? (
                        <EvaluationStudentForm isEditMode={isEditMode} closeIsEditMode={() => setIsEditMode(false)} onSubmit={editEvaluation} handleChange={handleChange} evaluation={evaluation} evaluationResultats={evaluationResultats} existingEvaluation={existingEvaluation} />
                    ) : (
                        <EvaluationStudentOverview handleEdit={handleEdit} existingEvaluation={existingEvaluation} formateurName={formateurName} evaluationDate={evaluationDate} modifiedEvaluationDate={modifiedEvaluationDate} />
                    )
                )}
            </div>
        </section>
    </div>
    )
}

export default EvaluationPage
