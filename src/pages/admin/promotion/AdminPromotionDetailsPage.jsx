import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import PromotionsService from "../../../services/PromotionsService";
import UserServices from "../../../services/UserServices";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AuthContext from "../../../context/AuthContext";
import AdminLayout from "../../../components/pages/admin/AdminLayout";
import { FRONT_ADMIN_DASHBOARD } from "../../../utils/frontUrl";
import SelectInputGeneric from "../../../components/shared/form/SelectInputGeneric";

function PromotionDetailsPage() {
    const { isAdmin } = useContext(AuthContext);
    const { id } = useParams();
    const [promoDetail, setPromoDetail] = useState(null);
    const [users, setUsers] = useState([]);

    const [selectedUser, setSelectedUser] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getPromotionDetails();
        getAllUsers();
    }, [id]);

    const getPromotionDetails = async () => {
        try {
            const response = await PromotionsService.fetchPromotionById(id);
            setPromoDetail(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération de la promotion:", error.response?.data || error.message);
        }
    };

    const getAllUsers = async () => {
        try {
            const response = await UserServices.fetchAllUsers();
            setUsers(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs:", error.response?.data || error.message);
        }
    };

    const handleAddUser = async (role) => {
        if (!selectedUser) {
            console.error(`Aucun utilisateur sélectionné pour le rôle ${role}`);
            return;
        }
        try {
            switch (role) {
                case "supervisor":
                    await PromotionsService.addSupervisorToPromotion(id, selectedUser);
                    break;
                case "trainer":
                    await PromotionsService.addTrainerToPromotion(id, selectedUser);
                    break;
                case "student":
                    await PromotionsService.addStudientToPromotion(id, selectedUser);
                    break;
                default:
                    return;
            }
            console.log(`${role} ajouté à la promotion`);
            getPromotionDetails();
            setSelectedUser("");
        } catch (error) {
            console.error(`Erreur lors de l'ajout du ${role}:`, error.response?.data || error.message);
        }
    };

    const handleRemoveUser = async (role, userId) => {
        try {
            switch (role) {
                case "supervisor":
                    await PromotionsService.deleteSupervisorFromPromotion(id, userId);
                    break;
                case "trainer":
                    await PromotionsService.deleteTrainerFromPromotion(id, userId);
                    break;
                case "student":
                    await PromotionsService.deleteStudientFromPromotion(id, userId);
                    break;
                default:
                    return;
            }
            console.log(`${role} retiré de la promotion`);
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

    if (!promoDetail) return <p>Chargement...</p>;

    const supervisors = users.filter(user => user.userRole.id === 1);
    const trainers = users.filter(user => user.userRole.id === 2);
    const students = users.filter(user => user.userRole.id === 3);

    return (
        <AdminLayout>
            <div className="container-admin">
                <div className="d-flex justify-content-between align-items-center">
                    <h2>Promotion : {promoDetail?.title}</h2>
                    <button className="btn btn-danger" onClick={deletePromotion}>Supprimer la promotion</button>
                </div>

                <div className="accordion" id="promotionAccordion">
                    {/* Supervisors */}
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingSupervisors">
                            <button className="accordion-button supervisor-header collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSupervisors">
                                Responsables
                            </button>
                        </h2>
                        <div id="collapseSupervisors" className="accordion-collapse collapse">
                            <div className="accordion-body">
                                <ul>
                                    {promoDetail?.promotionSupervisors?.map(user => (
                                        <li key={user.id} className="d-flex justify-content-between align-items-center">
                                            {user.supervisorUser.firstname} {user.supervisorUser.lastname}
                                            {isAdmin && (
                                                <button className="btn btn-danger btn-sm ms-2" onClick={() => handleRemoveUser("supervisor", user.supervisorUser.id)}>
                                                    Retirer
                                                </button>
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
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Trainers */}
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTrainers">
                            <button className="accordion-button trainer-header collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTrainers">
                                Formateurs
                            </button>
                        </h2>
                        <div id="collapseTrainers" className="accordion-collapse collapse">
                            <div className="accordion-body">
                                <ul>
                                    {promoDetail?.promotionTrainers?.map(user => (
                                        <li key={user.id} className="d-flex justify-content-between align-items-center">
                                            {user.trainerUser.firstname} {user.trainerUser.lastname}
                                            {isAdmin && (
                                                <button className="btn btn-danger btn-sm ms-2" onClick={() => handleRemoveUser("trainer", user.trainerUser.id)}>
                                                    Retirer
                                                </button>
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
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Students */}
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingStudents">
                            <button className="accordion-button student-header collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseStudents">
                                Étudiants
                            </button>
                        </h2>
                        <div id="collapseStudents" className="accordion-collapse collapse">
                            <div className="accordion-body">
                                <ul>
                                    {promoDetail?.promotionStudients?.map(user => (
                                        <li key={user.studient_id} className="d-flex justify-content-between align-items-center">
                                            {user.studientUser.firstname} {user.studientUser.lastname}
                                            {isAdmin && (
                                                <button className="btn btn-danger btn-sm ms-2" onClick={() => handleRemoveUser("student", user.studientUser.id)}>
                                                    Retirer
                                                </button>
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
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default PromotionDetailsPage;
