import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/pages/admin/AdminLayout';
import Input from '../../../components/shared/form/Input';
import TrainingServices from '../../../services/TrainingServices';
import PromotionsService from '../../../services/PromotionsService';
import { useNavigate } from 'react-router-dom';
import { FRONT_ADMIN_PROMOTION } from '../../../utils/frontUrl';
import UserServices from '../../../services/UserServices';
import SelectInputGeneric from '../../../components/shared/form/SelectInputGeneric';

function AdminAddPromotionPage() {
    const [selectedTraining, setSelectedTraining] = useState("");
    const [promotion, setPromotion] = useState({
        title: "",
        training_id: "",
        supervisors: [],
        trainers: [],
        students: [],
    });

    const [trainings, setTrainings] = useState([]);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    const [selectedUser, setSelectedUser] = useState("");
    const [selectedSupervisors, setSelectedSupervisors] = useState([]);
    const [selectedTrainers, setSelectedTrainers] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);

    const supervisors = users.filter(user => user.userRole.id === 1);
    const trainers = users.filter(user => user.userRole.id === 2);
    const students = users.filter(user => user.userRole.id === 3);

    useEffect(() => {
        const fetchAllTrainings = async () => {
            try {
                const response = await TrainingServices.fetchAllTraining();
                setTrainings(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des formations:", error);
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

        fetchAllTrainings();
        getAllUsers();
    }, []);

    useEffect(() => {
        setPromotion(prevPromotion => ({
            ...prevPromotion,
            supervisors: selectedSupervisors,
            trainers: selectedTrainers,
            students: selectedStudents,
        }));
    }, [selectedSupervisors, selectedTrainers, selectedStudents]);

    const handleAddUser = (role) => {
        if (!selectedUser) return;
        const userId = Number(selectedUser);

        switch (role) {
            case "supervisor":
                if (!selectedSupervisors.includes(userId)) {
                    setSelectedSupervisors([...selectedSupervisors, userId]);
                }
                break;
            case "trainer":
                if (!selectedTrainers.includes(userId)) {
                    setSelectedTrainers([...selectedTrainers, userId]);
                }
                break;
            case "student":
                if (!selectedStudents.includes(userId)) {
                    setSelectedStudents([...selectedStudents, userId]);
                }
                break;
            default:
                break;
        }
        setSelectedUser(""); // Reset après ajout
    };

    const handleRemoveUser = (role, userId) => {
        switch (role) {
            case "supervisor":
                setSelectedSupervisors(selectedSupervisors.filter(id => id !== userId));
                break;
            case "trainer":
                setSelectedTrainers(selectedTrainers.filter(id => id !== userId));
                break;
            case "student":
                setSelectedStudents(selectedStudents.filter(id => id !== userId));
                break;
            default:
                break;
        }
    };

    const handleSubmit = async () => {
        if (!promotion.title || !promotion.training_id) {
            console.error("Veuillez renseigner tous les champs.");
            return;
        }

        try {
            await PromotionsService.addPromotion(promotion);
            navigate(FRONT_ADMIN_PROMOTION);
        } catch (error) {
            console.error("Erreur lors de l'ajout de la promotion:", error);
        }
    };

    return (
        <AdminLayout>
            <div className="container-admin">
                <h1>Ajouter une promotion</h1>
                <div className="form_blue_contener wider">
                    <div className="form_blue gap-3">
                        <div className='d-flex flex-row gap-3'>
                            <select 
                                value={selectedTraining} 
                                onChange={(e) => {
                                    setSelectedTraining(e.target.value);
                                    setPromotion({ ...promotion, training_id: e.target.value });
                                }}
                            >
                                <option value="" disabled>Choisissez une formation</option>
                                {trainings.map((training) => (
                                    <option key={training.id} value={training.id}>{training.title}</option>
                                ))}
                            </select>
                            <Input 
                                changeFunction={(e) => setPromotion({ ...promotion, title: e.target.value })}  
                                labelName="Nom de la promotion :" 
                                type="text" 
                                value={promotion.title} 
                                className={"color-black-text"}
                            />
                        </div>

                        {/* Sélection du superviseur */}
                        <SelectInputGeneric
                            label="Sélectionner un superviseur"
                            options={supervisors}
                            selectedValue={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            onAdd={() => handleAddUser("supervisor")}
                            selectedItems={selectedSupervisors}
                            onRemove={(id) => handleRemoveUser("supervisor", id)}
                            showSelectedList={true}
                        />

                        {/* Sélection du formateur */}
                        <SelectInputGeneric
                            label="Sélectionner un formateur"
                            options={trainers}
                            selectedValue={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            onAdd={() => handleAddUser("trainer")}
                            selectedItems={selectedTrainers}
                            onRemove={(id) => handleRemoveUser("trainer", id)}
                            showSelectedList={true}
                        />

                        {/* Sélection des étudiants */}
                        <SelectInputGeneric
                            label="Sélectionner un étudiant"
                            options={students}
                            selectedValue={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            onAdd={() => handleAddUser("student")}
                            selectedItems={selectedStudents}
                            onRemove={(id) => handleRemoveUser("student", id)}
                            showSelectedList={true}
                        />

                        <button onClick={handleSubmit} className="primary-button">
                            Ajouter la promotion
                        </button>
                    </div> 
                </div> 
            </div> 
        </AdminLayout>
    );
}

export default AdminAddPromotionPage;
