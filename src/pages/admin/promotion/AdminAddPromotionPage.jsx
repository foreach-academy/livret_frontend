import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/pages/admin/AdminLayout';
import Input from '../../../components/shared/form/Input';
import TrainingServices from '../../../services/TrainingServices';
import PromotionsService from '../../../services/PromotionsService';
import UserServices from '../../../services/UserServices';
import SelectInputGeneric from '../../../components/shared/form/SelectInputGeneric';
import { FRONT_ADMIN_PROMOTION } from '../../../utils/frontUrl';
import { admin, student, trainer } from '../../../utils/roleList'

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
        UserServices.fetchAllUsers(setUsers);
    }, []);

    const getUsersByRole = (roleName) => users.filter(user => user.userRole.name === roleName);
    const listSelector = [
        { label: "Sélectionner un superviseur", role: "supervisors", options: getUsersByRole(admin) },
        { label: "Sélectionner un formateur", role: "trainers", options: getUsersByRole(trainer) },
        { label: "Sélectionner un étudiant", role: "students", options: getUsersByRole(student) }
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
                            <SelectInputGeneric
                                label="Choisissez une formation"
                                options={trainings}
                                selectedValue={promotion.training_id}
                                onChange={(e) => setPromotion({ ...promotion, training_id: e.target.value })}
                                getOptionLabel={(training) => training.title}
                            />

                            <Input
                                changeFunction={(e) => setPromotion({ ...promotion, title: e.target.value })}
                                labelName="Nom de la promotion :"
                                type="text"
                                value={promotion.title}
                                className="color-black-text"
                            />
                        </div>
                        {listSelector.map(({ label, role, options }, index) => (
                            <SelectInputGeneric
                                key={index}
                                label={label}
                                options={options}
                                selectedValue=""
                                onChange={(e) => handleUserSelection(role, Number(e.target.value))}
                                selectedItems={promotion[role]}
                                onRemove={(id) => handleUserRemoval(role, id)}
                                showSelectedList={true}
                                getOptionLabel={(user) => `${user.firstname} ${user.lastname}`}
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
