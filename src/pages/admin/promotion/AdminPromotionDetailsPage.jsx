import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import PromotionsService from "../../../services/PromotionsService";
import UserServices from "../../../services/UserServices";
import AuthContext from "../../../context/AuthContext";
import AdminLayout from "../../../components/pages/admin/AdminLayout";
import { FRONT_ADMIN_DASHBOARD } from "../../../utils/frontUrl";
import SelectInputGeneric from "../../../components/shared/form/SelectInputGeneric";
import Accordion from "../../../components/shared/Accordion";
import AdminBodyTitle from "../../../components/shared/AdminBodyTitle"
import Button from "../../../components/shared/Button";
import { admin, student, trainer } from "../../../utils/roleList";
import ModulesService from "../../../services/ModulesService";
import Input from "../../../components/shared/form/Input"
import { toast } from "react-toastify";

function PromotionDetailsPage() {
    const { isAdmin } = useContext(AuthContext);
    const { id } = useParams();
    const [promoDetail, setPromoDetail] = useState({});
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [modules, setModules] = useState([]);
    const navigate = useNavigate();
    const [moduleEdits, setModuleEdits] = useState({});
    const [trainingId, setTrainingId] = useState()
    const [editingModules, setEditingModules] = useState({});
    useEffect(() => {
        getPromotionDetails();
        getAllUsers();

    }, [id]);
    useEffect(() => {
        if (promoDetail?.training?.id) {
            setTrainingId(promoDetail.training.id);
        }
    }, [promoDetail]);
    useEffect(() => {
        ModulesService.getModuleByPromotion(id, setModules);
    }, []);

    const getPromotionDetails = async () => {
        await PromotionsService.fetchPromotionById(id, setPromoDetail);
    };

    const getAllUsers = async () => {
        await UserServices.fetchAllUsers(setUsers);
    };

    const handleAddUser = async (role) => {
        if (!selectedUser) return;
        try {
            const actions = {
                supervisor: PromotionsService.addSupervisorToPromotion,
                trainer: PromotionsService.addTrainerToPromotion,
                student: PromotionsService.addStudientToPromotion,
            };
            await actions[role](id, selectedUser);
            getPromotionDetails();
            setSelectedUser("");
        } catch (error) {
            console.error(`Erreur lors de l'ajout du ${role}:`, error.response?.data || error.message);
        }
    };

    const handleRemoveUser = async (role, userId) => {
        try {
            const actions = {
                supervisor: PromotionsService.deleteSupervisorFromPromotion,
                trainer: PromotionsService.deleteTrainerFromPromotion,
                student: PromotionsService.deleteStudientFromPromotion,
            };
            await actions[role](id, userId);
            getPromotionDetails();
        } catch (error) {
            console.error(`Erreur lors de la suppression du ${role}:`, error.response?.data || error.message);
        }
    };

    const deletePromotion = async () => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette promotion ?")) return;
        try {
            await PromotionsService.deletePromotion(id);
            navigate(FRONT_ADMIN_DASHBOARD);
        } catch (error) {
            console.error("Erreur lors de la suppression de la promotion:", error.response?.data || error.message);
        }
    };

    const supervisors = users.filter(user => user.userRole.name === admin);
    const trainers = users.filter(user => user.userRole.name === trainer);
    const students = users.filter(user => user.userRole.name === student);

    const handleEditModule = (module) => {
        setEditingModules({ ...editingModules, [module.module_id]: true });

        setModuleEdits((prev) => ({
            ...prev,
            [module.module_id]: {
                module_id: module.module_id,
                startDate: module.start_date,
                endDate: module.end_date,
                trainerId: module.trainer_id
            }
        }));
    };

    const handleSaveModule = async (moduleId) => {

        const moduleData = moduleEdits[moduleId];
        if (!moduleData) {
            console.error("Erreur: moduleData est undefined pour moduleId", moduleId, "Contenu actuel de moduleEdits:", moduleEdits);
            return;
        }

        const updatedModule = {
            promotion_id: id,
            module_id: moduleData.module_id,
            trainer_id: moduleData.trainerId,
            start_date: moduleData.startDate,
            end_date: moduleData.endDate
        };

        try {
            await ModulesService.updateModulePromotion(updatedModule);
            setEditingModules({ ...editingModules, [moduleId]: false });
            ModulesService.getModuleByPromotion(id, setModules);
            toast.success(`Module mis à jour avec succès`);
        } catch (error) {
            console.error("Erreur lors de la mise à jour du module :", error.response?.data || error.message);
        }
    };

    const handleCancelEdit = (moduleId) => {
        setEditingModules((prev) => ({
            ...prev,
            [moduleId]: false
        }));
    };


    return (
        <AdminLayout>
            <AdminBodyTitle
                buttonTitle="Supprimer la promotion"
                isAdmin={isAdmin}
                pageTitle={promoDetail?.title}
                action={deletePromotion}
                buttonClassName="bg-danger"
                icon="delete"
            />
            <Accordion accordionLabel="Responsables" accordionColor="bg-fe-purple">
                <ul>
                    {promoDetail?.promotionSupervisors?.map((user, index) => (
                        <li key={index} className="d-flex justify-content-between align-items-center">
                            {user.supervisorUser.firstname} {user.supervisorUser.lastname}
                            {isAdmin && (
                                <Button
                                    buttonTitle="Retirer"
                                    className="bg-danger"
                                    setAction={() => handleRemoveUser("supervisor", user.supervisorUser.id)}

                                />
                            )}
                        </li>
                    ))}
                </ul>
                {isAdmin && (
                    <SelectInputGeneric
                        label="Sélectionner un responsable"
                        options={supervisors}
                        selectedValue={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        onAdd={() => handleAddUser("supervisor")}
                        getOptionLabel={(user) => `${user.firstname} ${user.lastname}`}
                    />
                )}

            </Accordion>

            <Accordion accordionLabel="Formateurs" accordionColor="bg-fe-green">
                <ul>
                    {promoDetail?.promotionTrainers?.map((user, index) => (
                        <li key={index} className="d-flex justify-content-between align-items-center">
                            {user.trainerUser.firstname} {user.trainerUser.lastname}
                            {isAdmin && (
                                <Button
                                    buttonTitle="Retirer"
                                    className="bg-danger"
                                    setAction={() => handleRemoveUser("trainer", user.trainerUser.id)}
                                />
                            )}
                        </li>
                    ))}
                </ul>
                {isAdmin && (
                    <SelectInputGeneric
                        label="Sélectionner un formateur"
                        options={trainers}
                        selectedValue={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        onAdd={() => handleAddUser("trainer")}
                        getOptionLabel={(user) => `${user.firstname} ${user.lastname}`}
                    />
                )}

            </Accordion>

            <Accordion accordionLabel="Étudiants" accordionColor="bg-fe-dark-blue">
                <ul>
                    {promoDetail?.promotionStudients?.map((user, index) => (
                        <li key={index} className="d-flex justify-content-between align-items-center">
                            {user.studientUser.firstname} {user.studientUser.lastname}
                            {isAdmin && (
                                <Button
                                    buttonTitle="Retirer"
                                    className="bg-danger"
                                    setAction={() => handleRemoveUser("student", user.studientUser.id)}
                                />
                            )}
                        </li>
                    ))}
                </ul>
                {isAdmin && (
                    <SelectInputGeneric
                        label="Sélectionner un étudiant"
                        options={students}
                        selectedValue={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        onAdd={() => handleAddUser("student")}
                        getOptionLabel={(user) => `${user.firstname} ${user.lastname}`}
                    />
                )}

            </Accordion>
            <Accordion accordionLabel="Modules" accordionColor="bg-fe-orange">
                <ul>
                    {modules.map((module, index) => (
                        <div key={index} className="mb-3">
                            {editingModules[module.module_id] ? (
                                <div className="d-flex flex-column gap-2">
                                    {module.moduleInfo.title}
                                    <Input
                                        type="date"
                                        label="Date de début"
                                        value={moduleEdits[module.module_id]?.startDate || ""}
                                        changeFunction={(e) => setModuleEdits({
                                            ...moduleEdits,
                                            [module.module_id]: {
                                                ...moduleEdits[module.module_id],
                                                startDate: e.target.value
                                            }
                                        })}
                                    />

                                    <Input
                                        type="date"
                                        label="Date de fin"
                                        value={moduleEdits[module.module_id]?.endDate || ""}
                                        changeFunction={(e) => setModuleEdits({
                                            ...moduleEdits,
                                            [module.module_id]: {
                                                ...moduleEdits[module.module_id],
                                                endDate: e.target.value
                                            }
                                        })}
                                    />
                                    <SelectInputGeneric
                                        label="Formateur"
                                        options={promoDetail?.promotionTrainers || []}
                                        selectedValue={promoDetail?.promotionTrainers?.find(t => t.trainer_id === moduleEdits[module.module_id]?.trainerId)?.id || ""}
                                        onChange={(e) => {
                                            const selectedTrainerId = Number(e.target.value);
                                            const selectedTrainer = promoDetail?.promotionTrainers.find(t => t.id === selectedTrainerId);
                                            setModuleEdits({
                                                ...moduleEdits,
                                                [module.module_id]: {
                                                    ...moduleEdits[module.module_id],
                                                    trainerId: selectedTrainer?.trainer_id
                                                }
                                            });
                                        }}
                                        getOptionLabel={(user) => `${user.trainerUser.firstname} ${user.trainerUser.lastname}`}
                                        getOptionValue={(user) => user.id}
                                    />
                                    <div className="d-flex gap-2">
                                        <Button buttonTitle="Enregistrer" className="bg-fe-green" setAction={() => handleSaveModule(module.module_id)} />
                                        <Button buttonTitle="Annuler" className="bg-danger" setAction={() => handleCancelEdit(module.module_id)} />
                                    </div>
                                </div>
                            ) : (
                                <li className="d-flex justify-content-between align-items-center">
                                    {module.moduleInfo.title}
                                    {` - ${new Intl.DateTimeFormat("fr-FR").format(new Date(module.start_date))}`}
                                    {` au ${new Intl.DateTimeFormat("fr-FR").format(new Date(module.end_date))}`}
                                    {module.trainerInfo ? ` - ${module.trainerInfo.firstname} ${module.trainerInfo.lastname}` : " - Pas de formateur assigné"}
                                    <Button  buttonTitle="Modifier" className="bg-fe-orange" setAction={() => handleEditModule(module)} />
                                </li>
                            )}
                        </div>
                    ))}

                </ul>
            </Accordion>
        </AdminLayout>
    );
}

export default PromotionDetailsPage;
