import { useNavigate, useParams } from "react-router-dom";
import TrainingServices from "../../../services/TrainingServices";
import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import AuthContext from "../../../context/AuthContext";
import AdminLayout from "../../../components/pages/admin/AdminLayout";
import PromotionsService from "../../../services/PromotionsService";
import ModulesService from "../../../services/ModulesService";

function TrainingDetailPage() {
    const { id } = useParams();
    const [training, setTraining] = useState({});
    const [promotion, setPromotion] = useState([]);
    const { isAdmin } = useContext(AuthContext);
    const navigate = useNavigate();
    const [moduleModification, setModuleModification] = useState(null);
    const [newModule, setNewModule] = useState({ title: "", commentary: "", training_id: id });
    const [isEditing, setIsEditing] = useState(false); // État pour afficher/masquer les inputs
    const [trainingModification, setTrainingModification] = useState({ id: id, title: "", description: "" });

    const getTrainingDetail = async () => {
        try {
            const response = await TrainingServices.fetchTrainingById(id);
            setTraining(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des détails de la formation:", error);
        }
    };

    const fetchPromotionByTraining = async () => {
        try {
            const response = await PromotionsService.getPromotionByTrainingId(id);
            setPromotion(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des promotions associées à la formation:", error);
        }
    };

    const submitModification = async () => {
        if (!moduleModification) return;
        try {
            await ModulesService.updateModule(moduleModification.id, {
                title: moduleModification.title,
                commentary: moduleModification.commentary
            });
            getTrainingDetail();
            setModuleModification(null);
        } catch (error) {
            console.error("Erreur lors de la modification du module", error);
        }
    };

    const addModule = async () => {
        try {
            await ModulesService.addModule(newModule);
            setNewModule({ title: "", commentary: "", trainingId: id });
            getTrainingDetail();
        } catch (error) {
            console.error("Erreur lors de la création du module", error);
        }
    };

    const deleteModule = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce module ? Cette action est irréversible et supprimera toutes les évaluations en lien avec ce module.")) return;
        try {
            await ModulesService.deleteModule(id);
            getTrainingDetail();
        } catch (error) {
            console.error("Erreur lors de la suppression du module", error);
        }
    };

    const updateTraining = async () => {
        if (!trainingModification.title || !trainingModification.description) {
            alert("Veuillez remplir tous les champs avant de valider.");
            return;
        }

        try {
            await TrainingServices.updateTraining(id, trainingModification);
            getTrainingDetail(); // Recharge les données après la mise à jour
            setIsEditing(false); // Désactive le mode édition
            alert("Formation mise à jour avec succès !");
        } catch (error) {
            console.error("Erreur lors de la modification de la formation", error);
        }
    };

    useEffect(() => {
        getTrainingDetail();
        fetchPromotionByTraining();
    }, []);

    useEffect(() => {
        if (training) {
            setTrainingModification({
                id: training.id,
                title: training.title || "",
                description: training.description || ""
            });
        }
    }, [training]);

    return (
        <AdminLayout>
            <div className="container-admin">
                <div className="d-flex flex-row justify-content-between align-items-center">
                    {isEditing ? (
                        <input
                            type="text"
                            className="form-control"
                            value={trainingModification.title}
                            onChange={(e) => setTrainingModification({ ...trainingModification, title: e.target.value })}
                        />
                    ) : (
                        <h1>{training.title}</h1>
                    )}
                    

                </div>

                <h3>Description :</h3>
                <div className="d-flex flex-row justify-content-between">
                {isEditing ? (
                    <textarea
                        className="form-control"
                        value={trainingModification.description}
                        onChange={(e) => setTrainingModification({ ...trainingModification, description: e.target.value })}
                    />
                ) : (
                    <p>{training.description}</p>
                )}
                    {isAdmin && (
                        <button className="primary-button" onClick={() => setIsEditing(!isEditing)}>
                            {isEditing ? "Annuler" : "Modifier la formation"}
                        </button>
                    )}
                                    {isEditing && (
                    <button className="primary-button" onClick={updateTraining}>
                        Enregistrer
                    </button>
                )}
                </div>


                <div className="d-flex flex-column gap-5">
                    {/* Modules */}
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Modules
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne">
                                <div className="accordion-body">
                                    {isAdmin && (
                                        <div className="d-flex flex-column gap-2">
                                            <input type="text" placeholder="Nom du module" value={newModule.title} onChange={(e) => setNewModule({ ...newModule, title: e.target.value })} />
                                            <input type="text" placeholder="Description du module" value={newModule.commentary} onChange={(e) => setNewModule({ ...newModule, commentary: e.target.value })} />
                                            <button className="primary-button" onClick={addModule}>Ajouter un module</button>
                                        </div>
                                    )}

                                    <Table striped bordered hover responsive className="mt-4">
                                        <thead>
                                            <tr>
                                                <th>Titre des modules</th>
                                                <th>Description</th>
                                                {isAdmin && <th>Action</th>}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {training.modules && training.modules.map((module) => (
                                                <tr key={module.id}>
                                                    <td>
                                                        {moduleModification?.id === module.id ? (
                                                            <input type="text" value={moduleModification.title} onChange={(e) => setModuleModification({ ...moduleModification, title: e.target.value })} />
                                                        ) : (
                                                            module.title
                                                        )}
                                                    </td>
                                                    <td>
                                                        {moduleModification?.id === module.id ? (
                                                            <input type="text" value={moduleModification.commentary} onChange={(e) => setModuleModification({ ...moduleModification, commentary: e.target.value })} />
                                                        ) : (
                                                            module.commentary
                                                        )}
                                                    </td>
                                                    {isAdmin && (
                                                        <td className="d-flex justify-content-center gap-2">
                                                            {moduleModification?.id === module.id ? (
                                                                <>
                                                                    <button className="primary-button" onClick={submitModification}>Enregistrer</button>
                                                                    <button className="btn btn-danger" onClick={() => setModuleModification(null)}>Annuler</button>
                                                                </>
                                                            ) : (
                                                                <button className="primary-button" onClick={() => setModuleModification({ id: module.id, title: module.title, commentary: module.commentary })}>Modifier</button>
                                                            )}
                                                            <button className="btn btn-danger" onClick={() => deleteModule(module.id)}>Supprimer</button>
                                                        </td>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    
                                </div>
                            </div>

                            
                        </div>
                    </div>
                </div>

                                    {/* Promotions */}
                                    <div className="accordion" id="accordionExample2">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button
                                    className="accordion-button"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo"
                                    aria-expanded="true"
                                    aria-controls="collapseTwo">
                                    Promotions
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo">
                                <div className="accordion-body">
                                    <Table striped bordered hover responsive className="mt-4">
                                        <thead>
                                            <tr>
                                                <th>Titre des promotions</th>
                                                {isAdmin && <th>Action</th>}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {promotion && promotion.map((promo) => (
                                                <tr key={promo.id}>
                                                    <td>{promo.title}</td>
                                                    {isAdmin && (
                                                        <td className="d-flex justify-content-center">
                                                            <button
                                                                className="primary-button "
                                                                onClick={() => navigate(`/admin/promotions/${promo.id}`)}>
                                                                Modifier
                                                            </button >

                                                        </td>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </AdminLayout>
    );
}

export default TrainingDetailPage;
