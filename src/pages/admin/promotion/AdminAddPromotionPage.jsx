import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/pages/admin/AdminLayout';
import Input from '../../../components/shared/form/Input';
import TrainingServices from '../../../services/TrainingServices';
import PromotionsService from '../../../services/PromotionsService';
import UserServices from '../../../services/UserServices';
import SelectInputGeneric from '../../../components/shared/form/SelectInputGeneric';
import { FRONT_ADMIN_PROMOTION } from '../../../utils/frontUrl';
import { admin, student, trainer } from '../../../utils/roleList';
import ModulesService from '../../../services/ModulesService';
import Button from '../../../components/shared/Button'
import { toast } from 'react-toastify';
import AdminBodyTitle from '../../../components/shared/AdminBodyTitle.jsx';

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
        modules: []
    });
    const selectedTraining = promotion.training_id;

    useEffect(() => {
        TrainingServices.fetchAllTrainings(setTrainings);
        UserServices.fetchAllUsers(setUsers);
        if (selectedTraining) {
            ModulesService.getModulesByTraining(selectedTraining, setPromotion);
        }
    }, [selectedTraining]);

    const getUsersByRole = (roleName) => users.filter(user => user.userRole.name === roleName);

    const listSelector = [
        { label: "Sélectionner un responsable", role: "supervisors", options: getUsersByRole(admin) },
        { label: "Sélectionner un formateur", role: "trainers", options: getUsersByRole(trainer) },
        { label: "Sélectionner un étudiant", role: "students", options: getUsersByRole(student) }
    ];

    const handleUserSelection = (role, userId) => {
        if (!userId) return;

        const selectedUser = users.find(user => user.id === userId);
        if (!selectedUser) return;

        const newEntry = { id: userId, userName: `${selectedUser.firstname} ${selectedUser.lastname}` };

        setPromotion((prev) => ({
            ...prev,
            [role]: prev[role].some(user => user.id === userId) ? prev[role] : [...prev[role], newEntry],
        }));
    };


    const handleUserRemoval = (role, userId) => {
        setPromotion((prev) => ({
            ...prev,
            [role]: prev[role].filter(user => user.id !== userId),
        }));
    };


    const handleModuleChange = (moduleId, field, value) => {
        setPromotion((prev) => ({
            ...prev,
            modules: prev.modules.map(module => module.id === moduleId ? { ...module, [field]: value } : module)
        }));
    };

    const handleSubmit = async () => {
        if (!promotion.title) {
            toast.error("Veuillez renseigner un nom de promotion.", { className: "toast-error", });
            return;
        }

        try {
            await PromotionsService.addPromotion(promotion);
            navigate(FRONT_ADMIN_PROMOTION);
        } catch (error) {
            console.error("Erreur lors de l'ajout de la promotion ou des modules:", error);
            throw (error);

        }
    };
    console.log(promotion.modules)
    return (
        <AdminLayout>
            <AdminBodyTitle pageTitle="Ajouter une promotion" />
            <div className="form_blue_contener wider">
                <div className="form_blue gap-3">
                    <div className='d-flex align-items-center'>
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
                    <div className='d-flex flex-row'>
                        {listSelector.map(({ label, role, options }, index) => (
                            <div>
                                <SelectInputGeneric
                                    key={index}
                                    label={label}
                                    options={options}
                                    onChange={(e) => handleUserSelection(role, Number(e.target.value))}
                                    selectedItems={promotion[role].map(user => user.id)}
                                    onRemove={(id) => handleUserRemoval(role, id)}
                                    showSelectedList={true}
                                    getOptionLabel={(user) => `${user.firstname} ${user.lastname}`}
                                />
                            </div>
                        ))}
                    </div>
                    <h2 className='text-black'>Modules</h2>
                    {promotion.modules.map(module => (
                        <div key={module.id} className="d-flex justify-content-start align-items-end">
                            <span className='text-black'>{module.title}</span>
                            <Input
                                className="text-black"
                                labelName="Date de début"
                                type="date"
                                value={module.startDate || ""}
                                changeFunction={(e) => handleModuleChange(module.id, "startDate", e.target.value)}
                            />
                            <Input
                                className="text-black"
                                labelName="Date de fin"
                                type="date"
                                value={module.endDate || ""}
                                changeFunction={(e) => handleModuleChange(module.id, "endDate", e.target.value)}
                            />
                            <SelectInputGeneric
                                label="Formateur"
                                options={promotion.trainers}
                                onChange={(e) => {
                                    handleModuleChange(module.id, "trainerId", e.target.value);
                                }}
                                getOptionLabel={(trainer) => trainer.userName}
                            />
                        </div>
                    ))}
                    <Button buttonTitle="Ajouter la promotion" className="bg-fe-orange" setAction={handleSubmit} />
                </div>
            </div>
        </AdminLayout>
    );
}

export default AdminAddPromotionPage;
