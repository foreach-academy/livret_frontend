import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/pages/admin/AdminLayout';
import Input from '../../../components/shared/form/Input';
import TrainingServices from '../../../services/TrainingServices';
import PromotionsService from '../../../services/PromotionsService';
import { useNavigate } from 'react-router-dom';
import { FRONT_ADMIN_PROMOTION } from '../../../utils/frontUrl';

function AdminAddPromotionPage() {
    const [selectedTraining, setSelectedTraining] = useState("");
    const [promotion, setPromotion] = useState({
        title: "",
        training_id: "",
    });
    const [trainings, setTrainings] = useState([]);
    const navigate = useNavigate();

    const fetchAllTrainings = async () => {
        try {
            const response = await TrainingServices.fetchAllTraining();
            setTrainings(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des formations:", error);
        }
    };

    const handleSubmit = async () => {
        if (!promotion.title || !promotion.training_id) {
            console.error("Veuillez renseigner tous les champs.");
            return;
        }

        try {
            await PromotionsService.addPromotion(promotion);
            navigate(FRONT_ADMIN_PROMOTION)
        } catch (error) {
            console.error("Erreur lors de l'ajout de la promotion:", error);
        }
    };

    useEffect(() => {
        fetchAllTrainings();
    }, []);

    return (
        <AdminLayout>
        
            <div className="container-admin">
                <h1>Ajouter une promotion</h1>
            <div className="form_blue_contener wider">
            <div className="form_blue">
                <Input 
                    changeFunction={(e) => setPromotion({ ...promotion, title: e.target.value })}  
                    labelName="Nom de la promotion" 
                    type="text" 
                    value={promotion.title} 
                />
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
