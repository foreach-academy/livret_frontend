import { useNavigate, useParams } from "react-router-dom";
import TrainingServices from "../../../services/TrainingServices";
import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import AuthContext from "../../../context/AuthContext";
import AdminLayout from "../../../components/pages/admin/AdminLayout";
import PromotionsService from "../../../services/PromotionsService";
import ModulesService from "../../../services/ModulesService";

function TrainingDetailPage() {
    const { id } = useParams();
    const [training, setTraining] = useState({});
    const [promotion, setPromotion] = useState([]);
    const { isAdmin } = useContext(AuthContext);
    const navigate = useNavigate();
    const [moduleModification, setModuleModification] = useState(null);
    const [newModule, setNewModule] = useState({
        title: "",
        commentary: "",
        training_id: id
    });

    const getTrainingDetail = async () => {
        try {
            const response = await TrainingServices.fetchTrainingById(id);
            setTraining(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des détails de la formation:", error);
        }
    };

    const fetchPromotionByTraining = async () => {
        try {
            const response = await PromotionsService.getPromotionByTrainingId(id);
            setPromotion(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des promotions associées à la formation:", error);
        }
    };

    const submitModification = async () => {
        if (!moduleModification) return;
        try {
            await ModulesService.updateModule(moduleModification.id, {
                title: moduleModification.title,
                commentary: moduleModification.commentary
            });
            getTrainingDetail();
            setModuleModification(null);
        } catch (error) {
            console.error("Erreur lors de la modification du module", error);
        }
    };

    const addModule = async () => {
        try {
            await ModulesService.addModule(newModule);
            setNewModule({ title: "", commentary: "", trainingId: id });
            getTrainingDetail(); 
        } catch (error) {
            console.error("Erreur lors de la création du module", error);
        }
    };
    

    useEffect(() => {
        getTrainingDetail();
        fetchPromotionByTraining();
    }, []);

    return (
        <AdminLayout>
            <div className="container-admin">
                <h1>{training.title}</h1>
                <h3>Description :</h3>
                <p>{training.description}</p>

                <div className="d-flex flex-column gap-5">
                    {/* Modules */}
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button 
                                    className="accordion-button" 
                                    type="button" 
                                    data-bs-toggle="collapse" 
                                    data-bs-target="#collapseOne" 
                                    aria-expanded="true" 
                                    aria-controls="collapseOne">
                                    Modules
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne">
                                <div className="accordion-body">

                                {isAdmin && (
    <div className="d-flex flex-column gap-2">
        <input 
            type="text" 
            placeholder="Nom du module" 
            value={newModule.title} 
            onChange={(e) => setNewModule({ ...newModule, title: e.target.value })} 
        />
        <input 
            type="text" 
            placeholder="Description du module" 
            value={newModule.commentary} 
            onChange={(e) => setNewModule({ ...newModule, commentary: e.target.value })} 
        />
        <button className="primary-button" onClick={addModule}>Ajouter un module</button>
    </div>
)}

                              

                                    <Table striped bordered hover responsive className="mt-4">
                                        <thead>
                                            <tr>
                                                <th>Nom du module</th>
                                                <th>Description</th>
                                                {isAdmin && <th>Action</th>}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {training.modules && training.modules.map((module) => (
                                                <tr key={module.id}>
                                                    <td>
                                                        {moduleModification?.id === module.id ? (
                                                            <input 
                                                                type="text" 
                                                                value={moduleModification.title} 
                                                                onChange={(e) => setModuleModification({ 
                                                                    ...moduleModification, 
                                                                    title: e.target.value 
                                                                })}
                                                            />
                                                        ) : (
                                                            module.title
                                                        )}
                                                    </td>
                                                    <td>
                                                        {moduleModification?.id === module.id ? (
                                                            <input 
                                                                type="text" 
                                                                value={moduleModification.commentary} 
                                                                onChange={(e) => setModuleModification({ 
                                                                    ...moduleModification, 
                                                                    commentary: e.target.value 
                                                                })}
                                                            />
                                                        ) : (
                                                            module.commentary
                                                        )}
                                                    </td>
                                                    {isAdmin && (
                                                        <td className="d-flex justify-content-center gap-2">
                                                            {moduleModification?.id === module.id ? (
                                                                <>
                                                                    <button className="primary-button" onClick={submitModification}>Enregistrer</button>
                                                                    <button className="secondary-button" onClick={() => setModuleModification(null)}>Annuler</button>
                                                                </>
                                                            ) : (
                                                                <button className="primary-button" onClick={() => setModuleModification({ id: module.id, title: module.title, commentary: module.commentary })}>Modifier</button>
                                                            )}
                                                        </td>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Promotions */}
                    <div className="accordion" id="accordionExample2">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button 
                                    className="accordion-button" 
                                    type="button" 
                                    data-bs-toggle="collapse" 
                                    data-bs-target="#collapseTwo" 
                                    aria-expanded="true" 
                                    aria-controls="collapseTwo">
                                    Promotions
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo">
                                <div className="accordion-body">
                                    <Table striped bordered hover responsive className="mt-4">
                                        <thead>
                                            <tr>
                                                <th>Nom de la promotion</th>
                                                {isAdmin && <th>Action</th>}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {promotion && promotion.map((promo) => (
                                                <tr key={promo.id}>
                                                    <td>{promo.title}</td>
                                                    {isAdmin && (
                                                        <td className="d-flex justify-content-center">
                                                            <button 
                                                                className="tertiary-button" 
                                                                onClick={() => navigate(`/admin/promotions/${promo.id}`)}>
                                                                Voir plus
                                                            </button>
                                                        </td>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}

export default TrainingDetailPage;
