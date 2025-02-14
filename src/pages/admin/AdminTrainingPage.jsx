import { useContext, useEffect, useState } from "react";
import TrainingServices from "../../services/TrainingServices";
import { Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { navigateTo } from "../../utils/navigate";
import { FRONT_ADMIN_ADD_TRAINING, FRONT_ADMIN_TRAINING } from "../../utils/frontUrl";
import AuthContext from "../../context/AuthContext";

function AdminTrainingPage () {
    const [trainings, setTrainings] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const { isAdmin } = useContext(AuthContext);

    const fetchAllTraining = async () => {
        try {
            const response = await TrainingServices.fetchAllTraining();
            setTrainings(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des formations:", error);
        }
    };

    useEffect(() => {
        fetchAllTraining();
    }, []);

    const filteredTrainings = trainings.filter(training =>
        training.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container-admin">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Formations</h1>
  
                {isAdmin && (
                    <button
                        className="primary-button"
                        onClick={() => navigateTo(FRONT_ADMIN_ADD_TRAINING, navigate)}
                    >
                        <span className="material-icons-outlined">add_circle_outline</span>
                        <span>Ajouter une formation</span>
                    </button>
                )}
    
            </div>
            <div>
                <span>Rechercher une formation :</span>
              
                              <input 
                    type="text" 
                    placeholder=" 🔍 Nom de la formation" 
                    className="form-control w-25" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
              
                </div>
            <Table striped bordered hover responsive className="mt-4">
                <thead>
                    <tr>
                        <th>Nom de la formation</th>
                        <th className="d-flex justify-content-end">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTrainings.map((training) => (
                        <tr key={training.id}>
                            <td>{training.title}</td>
                            <td className="d-flex justify-content-end">
                                <button 
                                    className="tertiary-button" 
                                    onClick={() => navigate(`${FRONT_ADMIN_TRAINING}/${training.id}`)}
                                >
                                    Voir plus
                                </button>
                                {isAdmin && (
                                    <button className="primary-button">Modifier</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default AdminTrainingPage;
