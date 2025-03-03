import { useParams } from "react-router-dom";
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
import Button from "../../../components/shared/Button";
import Input from "../../../components/shared/form/Input";
import Accordion from "../../../components/shared/Accordion";
import ModulesTBody from "../../../components/pages/admin/trainings/ModulesTBody";
import { toast } from "react-toastify";
import CustomModal from "../../../components/shared/modal/CustomModal";
import { FRONT_ADMIN_PROMOTION } from "../../../utils/frontUrl";


function TrainingDetailPage() {
    const { id } = useParams();
    const [training, setTraining] = useState({});
    const [promotion, setPromotion] = useState([]);
    const { isAdmin } = useContext(AuthContext);
    const [moduleModification, setModuleModification] = useState(null);
    const [newModule, setNewModule] = useState({
        title: "",
        commentary: "",
        training_id: id,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [displayAddModule, setDisplayAddModule] = useState(false);

    const moduleHeaders = [
        { id: "title", label: "Titre des modules" },
        { id: "commentary", label: "Description" },
    ];

    const moduleColumns = [
        { key: "title" },
        { key: "commentary" }
    ];

    const promotionHeaders = [
        { id: "title", label: "Titre des promotions" },
        { id: "action", label: "Action" },
    ];

    const promotionColumns = [{ label: "title" }];

    const action = {
        label: "Voir plus",
        url: FRONT_ADMIN_PROMOTION,
        className: "bg-fe-blue"
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [moduleToDelete, setModuleToDelete] = useState(null);

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
            commentary: moduleModification.commentary,
        }, toast, setRefresh, setModuleModification);
    };

    const addModule = async () => {
        await ModulesService.addModule(newModule, setRefresh, setDisplayAddModule, toast, setNewModule);
    };

    const handleDeleteRequest = (id, title) => {
        setModuleToDelete({ id, title });
        setIsModalOpen(true);
    };


    const confirmDeleteModule = async () => {
        if (!moduleToDelete) return;
        const { id, title } = moduleToDelete;
        await ModulesService.deleteModule(id, toast, setRefresh);
        setIsModalOpen(false);
        setModuleToDelete(null);
    };

    const updateTraining = async () => {
        if (!training.title || !training.description) {
            alert("Veuillez remplir tous les champs avant de valider.");
            return;
        }
        await TrainingServices.updateTraining(id, training, setRefresh, setIsEditing, toast);
    };
    useEffect(() => {
        getTrainingDetail();
        fetchPromotionByTraining();
        setRefresh(false);
    }, [refresh]);

    return (
        <AdminLayout>

            <div className="d-flex justify-content-between">
                <h1>Détail de la formation {training.title}</h1>
                <div className="d-flex align-self-center">
                    {isAdmin && (
                        <Button
                            className={isEditing ? "bg-danger" : "bg-fe-orange"}
                            buttonTitle={isEditing ? "Annuler" : (<><span class="material-symbols-outlined">
                                edit
                            </span><span > Modifier la formation </span></>)}
                            setAction={() => setIsEditing(!isEditing)}
                        />
                    )}
                    {isEditing && (
                        <Button
                            className="bg-fe-orange"
                            buttonTitle="Enregistrer"
                            setAction={() => updateTraining(training)}
                        />
                    )}
                </div>
            </div>

            <div className="">
                <div className="d-flex flex-column">

                    {isEditing ? (
                        <Input
                            labelName="Titre"
                            type="text"
                            value={training.title}
                            changeFunction={(e) =>
                                setTraining({
                                    ...training,
                                    title: e.target.value,
                                })
                            }
                            required={true}
                        />
                    ) : (<>
                        <label className="fw-bold" htmlFor="">Titre: </label>
                        <p>{training.title}</p>
                    </>
                    )}
                </div>

                <div className="d-flex flex-column">
                    {isEditing ? (
                        <TextArea
                            labelName="Description"
                            value={training.description}
                            onChange={(e) =>
                                setTraining({
                                    ...training,
                                    description: e.target.value,
                                })
                            }
                            required={true}
                        />
                    ) : (
                        <>
                            <label className="fw-bold" htmlFor="">Description: </label>
                            <p>{training.description}</p>
                        </>

                    )}
                </div>
            </div>

            <div className="d-flex flex-column">
                {/* Section Modules */}
                <Accordion accordionLabel="Modules" accordionColor="bg-fe-orange">
                    <Table striped bordered hover responsive className="mt-4">
                        <Thead theads={moduleHeaders} isAdmin={isAdmin} />
                        <ModulesTBody
                            data={training.modules || []}
                            columns={moduleColumns}
                            isAdmin={isAdmin}
                            moduleModification={moduleModification}
                            deleteModule={handleDeleteRequest}
                            submitModification={submitModification}
                            setModuleModification={setModuleModification}

                        ></ModulesTBody>
                    </Table>
                    <div className={`p-2 rounded ${displayAddModule && "bg-fe-gray"}`}>
                        {isAdmin && displayAddModule && (
                            <div className="">
                                <Input
                                    placeholder="Nom du module"
                                    className="mt-2"
                                    type="text"
                                    value={newModule.title}
                                    changeFunction={(e) =>
                                        setNewModule({ ...newModule, title: e.target.value })
                                    }
                                />
                                <Input
                                    type="text"
                                    className="mt-2"
                                    placeholder="Description du module"
                                    value={newModule.commentary}
                                    changeFunction={(e) =>
                                        setNewModule({
                                            ...newModule,
                                            commentary: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        )}
                        <div>
                            {isAdmin && (
                                <Button
                                    buttonTitle={displayAddModule ? "Annuler" : "Créer un module"}
                                    className={displayAddModule ? "bg-danger" : "bg-fe-orange"}
                                    setAction={() => {
                                        setDisplayAddModule(!displayAddModule);
                                    }}
                                />
                            )}
                            {isAdmin && displayAddModule && (
                                <Button
                                    buttonTitle="Ajouter"
                                    className="bg-fe-orange"
                                    setAction={addModule}
                                />
                            )}
                        </div>
                    </div>
                </Accordion>

                {/* Section Promotions */}
                <Accordion accordionLabel="Promotions" accordionColor="bg-fe-orange">
                    <Table striped bordered hover responsive className="mt-4">
                        <Thead theads={promotionHeaders} />
                        <Tbody
                            data={promotion}
                            columns={promotionColumns}
                            action={action}
                        />
                    </Table>
                </Accordion>
            </div>
            <CustomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={moduleToDelete && `Confirmer la suppression du module : ${moduleToDelete.title}`}

            >
                {moduleToDelete &&
                    <>
                        <span> Êtes-vous sûr de vouloir supprimer le module "
                            <span className="fw-bold"> {moduleToDelete.title} </span>" ? Cette action est irréversible. Toutes les évaluations en lien avec ce module seront perdues</span>
                    </>
                }
                <div className="d-flex justify-content-end">
                    <Button buttonTitle="Annuler" className="bg-fe-orange" setAction={() => setIsModalOpen(false)} />
                    <Button buttonTitle="Supprimer" className="bg-danger ms-2" setAction={confirmDeleteModule} />
                </div>
            </CustomModal>


        </AdminLayout>
    );
}

export default TrainingDetailPage;
