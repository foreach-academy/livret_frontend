import { useContext, useEffect, useState } from "react";
import TrainingServices from "../../../services/TrainingServices";
import { Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { navigateTo } from "../../../utils/navigate";
import { FRONT_ADMIN_ADD_TRAINING, FRONT_ADMIN_TRAINING } from "../../../utils/frontUrl";
import AuthContext from "../../../context/AuthContext";
import AdminLayout from "../../../components/pages/admin/AdminLayout";
import Thead from "../../../components/shared/form/Thead";
import Tbody from "../../../components/shared/form/Tbody";

function AdminTrainingPage () {
    const [trainings, setTrainings] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const { isAdmin } = useContext(AuthContext);
    const theadName = [{ 
        label: "Nom de la formation"
    },
    { label: "Action"}
 ]
 const columns = [
    { key: "title", label: "Titre" }
];

const action = {
    label: "Voir plus",
    onClick: (training, navigate) => navigate(`${FRONT_ADMIN_TRAINING}/${training.id}`)
};


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
        <AdminLayout>
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
                <Thead theads={theadName}></Thead>   
                <Tbody data={filteredTrainings} columns={columns} action={action} />     
            </Table>
        </div>
        </AdminLayout>
    );
}

export default AdminTrainingPage;
