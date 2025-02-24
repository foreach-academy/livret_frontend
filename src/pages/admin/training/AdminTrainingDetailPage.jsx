import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import TrainingServices from "../../../services/TrainingServices";
import PromotionsService from "../../../services/PromotionsService";
import ModulesService from "../../../services/ModulesService";
import AuthContext from "../../../context/AuthContext";
import AdminLayout from "../../../components/pages/admin/AdminLayout";
import Thead from "../../../components/shared/form/Thead";
import Tbody from "../../../components/shared/form/Tbody";
import TextArea from "../../../components/shared/form/TextArea";

function TrainingDetailPage() {
    const { id } = useParams();
    const [training, setTraining] = useState({});
    const [promotion, setPromotion] = useState([]);
    const { isAdmin } = useContext(AuthContext);
    const [moduleModification, setModuleModification] = useState(null);
    const [newModule, setNewModule] = useState({ title: "", commentary: "", training_id: id });
    const [isEditing, setIsEditing] = useState(false);
    const [trainingModification, setTrainingModification] = useState({ id: id, title: "", description: "" });
    const [refresh, setRefresh] = useState(false);

    const moduleHeaders = [
        { id: "title", label: "Titre des modules" },
        { id: "commentary", label: "Description" },
        { id: "action", label: "Action" }
    ];

    const moduleColumns = [
        {
            key: "title",
            render: (module) =>
                moduleModification?.id === module.id ? (
                    <TextArea
                        value={moduleModification.title}
                        onChange={(e) =>
                            setModuleModification({ ...moduleModification, title: e.target.value })
                        }
                    />
                ) : (
                    module.title
                )
        },
        {
            key: "commentary",
            render: (module) =>
                moduleModification?.id === module.id ? (
                    <TextArea
                        value={moduleModification.commentary}
                        onChange={(e) =>
                            setModuleModification({ ...moduleModification, commentary: e.target.value })
                        }
                    />
                ) : (
                    module.commentary
                )
        },
        {
            key: "action",
            render: (module) => (
                <div className="d-flex justify-content-center gap-2 flex-column">
                    {moduleModification?.id === module.id ? (
                        <>
                            <button className="primary-button" onClick={submitModification}>
                                Enregistrer
                            </button>
                            <button className="btn btn-danger" onClick={() => setModuleModification(null)}>
                                Annuler
                            </button>
                        </>
                    ) : (
                        <button
                            className="primary-button"
                            onClick={() =>
                                setModuleModification({
                                    id: module.id,
                                    title: module.title,
                                    commentary: module.commentary
                                })
                            }
                        >
                            Modifier
                        </button>
                    )}
                    <button className="btn btn-danger" onClick={() => deleteModule(module.id)}>
                        Supprimer
                    </button>
                </div>
            )
        }
    ];

    const promotionHeaders = [
        { id: "title", label: "Titre des promotions" },
        { id: "action", label: "Action" }
    ];

    const promotionColumns = [{ key: "title" }];

    const getTrainingDetail = async () => {
        await TrainingServices.fetchTrainingById(id, setTraining);
    };
    const fetchPromotionByTraining = async () => {
      await PromotionsService.getPromotionByTrainingId(id, setPromotion);

    };

    const submitModification = async () => {
        if (!moduleModification) return;
        await ModulesService.updateModule(moduleModification.id, {
            title: moduleModification.title,
            commentary: moduleModification.commentary
        });
        setRefresh(true);
        setModuleModification(null);
    };

    const addModule = async () => {
        await ModulesService.addModule(newModule);
        setNewModule({ title: "", commentary: "", training_id: id });
        setRefresh(true);
    };

    const deleteModule = async (id) => {
        if (
            !window.confirm(
                "Êtes-vous sûr de vouloir supprimer ce module ? Cette action est irréversible et supprimera toutes les évaluations en lien avec ce module."
            )
        )
            return;
        await ModulesService.deleteModule(id);
        setRefresh(true);
    };

    const updateTraining = async () => {
        if (!trainingModification.title || !trainingModification.description) {
            alert("Veuillez remplir tous les champs avant de valider.");
            return;
        }
        await TrainingServices.updateTraining(id, trainingModification);
        setRefresh(true);
        setIsEditing(false);
        alert("Formation mise à jour avec succès !");
    };

    useEffect(() => {
        getTrainingDetail();
        fetchPromotionByTraining();
        setRefresh(false);
    }, [refresh]);

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
                            onChange={(e) =>
                                setTrainingModification({ ...trainingModification, title: e.target.value })
                            }
                        />
                    ) : (
                        <h1>{training.title}</h1>
                    )}
                </div>

                <h3>Description :</h3>
                <div className="d-flex flex-row justify-content-between">
                    {isEditing ? (
                        <TextArea
                            className="form-control"
                            value={trainingModification.description}
                            onChange={(e) =>
                                setTrainingModification({ ...trainingModification, description: e.target.value })
                            }
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
                    {/* Section Modules */}
                    <div className="accordion" id="accordionModules">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingModules">
                                <button
                                    className="accordion-button"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseModules"
                                    aria-expanded="true"
                                    aria-controls="collapseModules"
                                >
                                    Modules
                                </button>
                            </h2>
                            <div
                                id="collapseModules"
                                className="accordion-collapse collapse show"
                                aria-labelledby="headingModules"
                            >
                                <div className="accordion-body">
                                    {isAdmin && (
                                        <div className="d-flex flex-column gap-2">
                                            <input
                                                type="text"
                                                placeholder="Nom du module"
                                                value={newModule.title}
                                                onChange={(e) =>
                                                    setNewModule({ ...newModule, title: e.target.value })
                                                }
                                            />
                                            <input
                                                type="text"
                                                placeholder="Description du module"
                                                value={newModule.commentary}
                                                onChange={(e) =>
                                                    setNewModule({ ...newModule, commentary: e.target.value })
                                                }
                                            />
                                            <button className="primary-button" onClick={addModule}>
                                                Ajouter un module
                                            </button>
                                        </div>
                                    )}

                                    <Table striped bordered hover responsive className="mt-4">
                                        <Thead theads={moduleHeaders} />
                                        <Tbody data={training.modules || []} columns={moduleColumns} />
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section Promotions */}
                    <div className="accordion" id="accordionPromotions">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingPromotions">
                                <button
                                    className="accordion-button"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapsePromotions"
                                    aria-expanded="true"
                                    aria-controls="collapsePromotions"
                                >
                                    Promotions
                                </button>
                            </h2>
                            <div
                                id="collapsePromotions"
                                className="accordion-collapse collapse show"
                                aria-labelledby="headingPromotions"
                            >
                                <div className="accordion-body">
                                    <Table striped bordered hover responsive className="mt-4">
                                        <Thead theads={promotionHeaders} />
                                        <Tbody
                                            data={promotion}
                                            columns={promotionColumns}
                                            action={{
                                                label: "Voir plus",
                                                onClick: (promo, navigate) =>
                                                    navigate(`/admin/promotions/${promo.id}`)
                                            }}
                                        />
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default TrainingDetailPage;
