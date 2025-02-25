import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/pages/admin/AdminLayout';
import Input from '../../../components/shared/form/Input';
import TrainingServices from '../../../services/TrainingServices';
import PromotionsService from '../../../services/PromotionsService';
import UserServices from '../../../services/UserServices';
import SelectInputGeneric from '../../../components/shared/form/SelectInputGeneric';
import { FRONT_ADMIN_PROMOTION } from '../../../utils/frontUrl';

function AdminAddPromotionPage() {
    const navigate = useNavigate();
    const [trainings, setTrainings] = useState([]);
    const [users, setUsers] = useState([]);
    const [promotion, setPromotion] = useState({
        title: "",
        training_id: "",
        supervisors: [],
        trainers: [],
        students: [],
    });

    useEffect(() => {
        TrainingServices.fetchAllTrainings(setTrainings);
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await UserServices.fetchAllUsers();
            setUsers(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs:", error.response?.data || error.message);
        }
    };

    const getUsersByRole = (roleId) => users.filter(user => user.userRole.id === roleId);
    const listSelector = [
        { label: "Sélectionner un superviseur", role: "supervisors", options: getUsersByRole(1) },
        { label: "Sélectionner un formateur", role: "trainers", options: getUsersByRole(2) },
        { label: "Sélectionner un étudiant", role: "students", options: getUsersByRole(3) }
    ]
    const handleUserSelection = (role, userId) => {
        if (!userId) return;
        setPromotion((prev) => ({
            ...prev,
            [role]: prev[role].includes(userId) ? prev[role] : [...prev[role], userId],
        }));
    };
    const handleUserRemoval = (role, userId) => {
        setPromotion((prev) => ({
            ...prev,
            [role]: prev[role].filter(id => id !== userId),
        }));
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
                                value={promotion.training_id}
                                onChange={(e) => setPromotion({ ...promotion, training_id: e.target.value })}
                            >
                                <option value="" disabled>Choisissez une formation</option>
                                {trainings.map(training => (
                                    <option key={training.id} value={training.id}>{training.title}</option>
                                ))}
                            </select>
                            <Input
                                changeFunction={(e) => setPromotion({ ...promotion, title: e.target.value })}
                                labelName="Nom de la promotion :"
                                type="text"
                                value={promotion.title}
                                className="color-black-text"
                            />
                        </div>
                        {listSelector.map(({ label, role, options }) => (
                            <SelectInputGeneric
                                key={role}
                                label={label}
                                options={options}
                                selectedValue=""
                                onChange={(e) => handleUserSelection(role, Number(e.target.value))}
                                selectedItems={promotion[role]}
                                onRemove={(id) => handleUserRemoval(role, id)}
                                showSelectedList={true}
                            />
                        ))}

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
