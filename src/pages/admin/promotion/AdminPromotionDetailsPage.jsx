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

function PromotionDetailsPage() {
    const { isAdmin } = useContext(AuthContext);
    const { id } = useParams();
    const [promoDetail, setPromoDetail] = useState({});
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [modules, setModules] = useState([]);
    const navigate = useNavigate();
    const [trainingId, setTrainingId] = useState()
    const formatDate = (dateString) => {
        return new Intl.DateTimeFormat("fr-FR").format(new Date(dateString));
    };
    const [editingModules, setEditingModules] = useState({});


    useEffect(() => {
        getPromotionDetails();
        getAllUsers();

    }, [id]);
    console.log(modules)
    useEffect(() => {
        if (promoDetail?.training?.id) {
            setTrainingId(promoDetail.training.id);
        }
    }, [promoDetail]);
    console.log(modules)
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

    // const handleSubmit = async (e) => {
    //     e.preventDefault
    // }

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
                    {modules && modules.map((module, index) => (
                        <div key={index}>
                            {editingModules[module.id] ? (
                                <div>
                                    <Input type="text" value={module.moduleInfo.title} />
                                    <Button buttonTitle="Enregistrer" className="bg-fe-green" setAction={() => setEditingModules({ ...editingModules, [module.id]: false })} />
                                </div>
                            ) : (
                                <li className="d-flex justify-content-between align-items-center">
                                    {module.moduleInfo.title} {formatDate(module.start_date)} {formatDate(module.end_date)} {module.trainerInfo.firstname} {module.trainerInfo.lastname}
                                </li>
                            )}
                            <Button
                                buttonTitle={editingModules[module.id] ? "Annuler" : "Modifier"}
                                className="bg-fe-orange"
                                setAction={() => setEditingModules({ ...editingModules, [module.id]: !editingModules[module.id] })}
                            />
                        </div>
                    ))}
                </ul>

            </Accordion>
        </AdminLayout>
    );
}

export default PromotionDetailsPage;
