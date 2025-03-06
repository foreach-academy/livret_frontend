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
import ModulePromotionService from '../../../services/ModulePromotionService';
import Button from '../../../components/shared/Button'

function AdminAddPromotionPage() {
    const navigate = useNavigate();
    const [trainings, setTrainings] = useState([]);
    const [users, setUsers] = useState([]);
    const [modules, setModules] = useState([]);
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
            ModulesService.getModulesByTraining(selectedTraining, setModules);
        }
    }, [selectedTraining]);

    const getUsersByRole = (roleName) => users.filter(user => user.userRole.name === roleName);
    
    const listSelector = [
        { label: "Sélectionner un superviseur", role: "supervisors", options: getUsersByRole(admin) },
        { label: "Sélectionner un formateur", role: "trainers", options: getUsersByRole(trainer) },
        { label: "Sélectionner un étudiant", role: "students", options: getUsersByRole(student) }
    ];

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

    const handleModuleChange = (moduleId, field, value) => {
        setPromotion((prev) => ({
            ...prev,
            modules: prev.modules.map(module => module.id === moduleId ? { ...module, [field]: value } : module)
        }));
    };

    const handleSubmit = async () => {
        if (!promotion.title || !promotion.training_id) {
            console.error("Veuillez renseigner tous les champs.");
            return;
        }

        if (promotion.students.length === 0 || promotion.trainers.length === 0) {
            console.error("Veuillez sélectionner au moins un étudiant et un formateur.");
            return;
        }

        try {
            const newPromotion = await PromotionsService.addPromotion(promotion);
            
            if (newPromotion?.id) {
                await Promise.all(promotion.modules.map(module => 
                    ModulePromotionService.addModulePromotion({
                        trainer_id: module.trainerId,
                        promotion_id: newPromotion.id,
                        module_id: module.id,
                        start_date: module.startDate,
                        end_date: module.endDate
                    })
                ));
            }

            navigate(FRONT_ADMIN_PROMOTION);
        } catch (error) {
            console.error("Erreur lors de l'ajout de la promotion ou des modules:", error);
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
                                onChange={(e) => handleUserSelection(role, Number(e.target.value))}
                                selectedItems={promotion[role]}
                                onRemove={(id) => handleUserRemoval(role, id)}
                                showSelectedList={true}
                                getOptionLabel={(user) => `${user.firstname} ${user.lastname}`}
                            />
                        ))}

                        <h2>Modules</h2>
                        {modules.map(module => (
                            <div key={module.id} className="d-flex gap-3 align-items-center">
                                <span>{module.title}</span>
                                <Input
                                    labelName="Date de début"
                                    type="date"
                                    value={module.startDate || ""}
                                    changeFunction={(e) => handleModuleChange(module.id, "startDate", e.target.value)}
                                />
                                <Input
                                    labelName="Date de fin"
                                    type="date"
                                    value={module.endDate || ""}
                                    changeFunction={(e) => handleModuleChange(module.id, "endDate", e.target.value)}
                                />
                                <SelectInputGeneric
                                    label="Formateur"
                                    options={getUsersByRole(trainer)}
                                    selectedValue={module.trainerId || ""}
                                    onChange={(e) => handleModuleChange(module.id, "trainerId", Number(e.target.value))}
                                    getOptionLabel={(user) => `${user.firstname} ${user.lastname}`}
                                />
                            </div>
                        ))}
                        <Button buttonTitle="Ajouter la promotion" className="bg-fe-orange" setAction={handleSubmit} /> 
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default AdminAddPromotionPage;
