import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import PromotionsService from "../../../services/PromotionsService";
import UserServices from "../../../services/UserServices";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AuthContext from "../../../context/AuthContext";
import AdminLayout from "../../../components/pages/admin/AdminLayout";

function PromotionDetailsPage() {
    const { isAuthenticated, isAdmin, setIsAuthenticated, setIsAdmin, isTrainer, setToken } = useContext(AuthContext);
    const { id } = useParams();
    const [promoDetail, setPromoDetail] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedSupervisor, setSelectedSupervisor] = useState("");
    const [selectedTrainer, setSelectedTrainer] = useState("");
    const [selectedStudent, setSelectedStudent] = useState("");


    const getPromotionDetails = async (id) => {
        try {
            const response = await PromotionsService.fetchPromotionById(id);
            console.log(response.data);
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

    const addSupervisorPromotion = async () => {
        if (!selectedSupervisor) {
            console.error("Aucun responsable sélectionné");
            return;
        }
        try {
            await PromotionsService.addSupervisorToPromotion(id, selectedSupervisor);
            console.log(`Responsable ajouté à la promotion ${promoDetail?.title}`);
            getPromotionDetails(id);
        } catch (error) {
            console.error("Erreur lors de l'ajout du responsable:", error.response?.data || error.message);
        }
    };
    const removeSupervisor = async (userId) => {
        try {
            await PromotionsService.deleteSupervisorFromPromotion(id, userId);
            console.log(`Responsable retiré de la promotion ${promoDetail?.title}`);
            getPromotionDetails(id);
        } catch (error) {
            console.error("Erreur lors de la suppression du responsable:", error.response?.data || error.message);
        }
    };

    const addTrainerPromotion = async () => {
        if (!selectedTrainer) {
            console.error("Aucun formateur sélectionné");
            return;
        }
        try {
            await PromotionsService.addTrainerToPromotion(id, selectedTrainer);
            console.log(`Formateur ajouté à la promotion ${promoDetail?.title}`);
            getPromotionDetails(id);
        } catch (error) {
            console.error("Erreur lors de l'ajout du formateur:", error.response?.data || error.message);
        }
    };
    const removeTrainer = async (userId) => {
        try {
            await PromotionsService.deleteTrainerFromPromotion(id, userId);
            console.log(`Formateur retiré de la promotion ${promoDetail?.title}`);
            getPromotionDetails(id);
        } catch (error) {
            console.error("Erreur lors de la suppression du formateur:", error.response?.data || error.message);
        }
    };

    const addStudientPromotion = async () => {
        if (!selectedStudent) {
            console.error("Aucun étudiant sélectionné");
            return;
        }
        try {
            await PromotionsService.addStudientToPromotion(id, selectedStudent);
            console.log(`Étudiant ajouté à la promotion ${promoDetail?.title}`);
            getPromotionDetails(id);
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'étudiant:", error.response?.data || error.message);
        }
    };
    const removeStudient = async (userId) => {
        try {
            console.log(userId);
            await PromotionsService.deleteStudientFromPromotion(id, userId);
            console.log(`Étudiant retiré de la promotion ${promoDetail?.title}`);
            getPromotionDetails(id); // Rafraîchir la liste après suppression
        } catch (error) {
            console.error("Erreur lors de la suppression de l'étudiant:", error.response?.data || error.message);
        }
    };


    useEffect(() => {
        getPromotionDetails(id);
        getAllUsers();
    }, [id]);

    if (!promoDetail) return <p>Chargement...</p>;

    const supervisors = users.filter(user => user.userRole.id === 1);
    const trainers = users.filter(user => user.userRole.id === 2);
    const students = users.filter(user => user.userRole.id === 3);

    return (
        <AdminLayout>
        <div className="container-admin">
            <h2>Promotion : {promoDetail?.title}</h2>
    
            <div className="accordion" id="promotionAccordion">
                {/* Supervisors */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingSupervisors">
                        <button className="accordion-button supervisor-header collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSupervisors" aria-expanded="false" aria-controls="collapseSupervisors">
                            Responsables
                        </button>
                    </h2>
                    <div id="collapseSupervisors" className="accordion-collapse collapse" aria-labelledby="headingSupervisors">
                        <div className="accordion-body">
                            <ul>
                                {promoDetail?.promotionSupervisors?.map(user => (
                                    <li key={user.id} className="d-flex justify-content-between align-items-center">
                                        {user.supervisorUser.firstname} {user.supervisorUser.lastname}
                                        {isAdmin && (
                                            <button className="btn btn-danger btn-sm ms-2" onClick={() => removeSupervisor(user.supervisorUser.id)}>
                                                Retirer
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            {isAdmin && (
                                <div className="d-flex align-items-center">
                                    <select className="form-select me-2" value={selectedSupervisor} onChange={(e) => setSelectedSupervisor(e.target.value)}>
                                        <option value="">Sélectionner un responsable</option>
                                        {supervisors.map(user => (
                                            <option key={user.id} value={user.id}>{user.firstname} {user.lastname}</option>
                                        ))}
                                    </select>
                                    <button className="primary-button" onClick={addSupervisorPromotion}>Ajouter</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
    
                {/* Trainers */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTrainers">
                        <button className="accordion-button trainer-header collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTrainers" aria-expanded="false" aria-controls="collapseTrainers">
                            Formateurs
                        </button>
                    </h2>
                    <div id="collapseTrainers" className="accordion-collapse collapse" aria-labelledby="headingTrainers">
                        <div className="accordion-body">
                            <ul>
                                {promoDetail?.promotionTrainers?.map(user => (
                                    <li key={user.id} className="d-flex justify-content-between align-items-center">
                                        {user.trainerUser.firstname} {user.trainerUser.lastname}
                                        {isAdmin && (
                                            <button className="btn btn-danger btn-sm ms-2" onClick={() => removeTrainer(user.trainerUser.id)}>
                                                Retirer
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            {isAdmin && (
                                <div className="d-flex align-items-center">
                                    <select className="form-select me-2" value={selectedTrainer} onChange={(e) => setSelectedTrainer(e.target.value)}>
                                        <option value="">Sélectionner un formateur</option>
                                        {trainers.map(user => (
                                            <option key={user.id} value={user.id}>{user.firstname} {user.lastname}</option>
                                        ))}
                                    </select>
                                    <button className="primary-button" onClick={addTrainerPromotion}>Ajouter</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
    
                {/* Students */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingStudents">
                        <button className="accordion-button student-header collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseStudents" aria-expanded="false" aria-controls="collapseStudents">
                            Étudiants
                        </button>
                    </h2>
                    <div id="collapseStudents" className="accordion-collapse collapse" aria-labelledby="headingStudents">
                        <div className="accordion-body">
                            <ul>
                                {promoDetail?.promotionStudients?.map(user => (
                                    <li key={user.studient_id} className="d-flex justify-content-between align-items-center">
                                        {user.studientUser.firstname} {user.studientUser.lastname}
                                        {isAdmin && (
                                            <button className="btn btn-danger btn-sm ms-2" onClick={() => removeStudient(user.studentUser.id)}>
                                                Retirer
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            {isAdmin && (
                                <div className="d-flex align-items-center">
                                    <select className="form-select me-2" value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
                                        <option value="">Sélectionner un étudiant</option>
                                        {students.map(user => (
                                            <option key={user.id} value={user.id}>{user.firstname} {user.lastname}</option>
                                        ))}
                                    </select>
                                    <button className="primary-button" onClick={addStudientPromotion}>Ajouter</button>
                                </div>
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
