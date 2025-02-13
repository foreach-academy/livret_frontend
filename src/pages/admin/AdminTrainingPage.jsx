import { useEffect, useState } from "react";
import TrainingServices from "../../services/TrainingServices";
import { Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { navigateTo } from "../../utils/navigate";
import { FRONT_ADMIN_ADD_TRAINING } from "../../utils/frontUrl";

function AdminTrainingPage () {
    const [trainings, setTrainings] = useState([])
    const navigate = useNavigate();

    const fetchAllTraining = async () => {
        try{
            const response = await TrainingServices.fetchAllTraining();
            console.log(response.data);
            setTrainings(response.data);
        }
        catch(error){
            console.error("Erreur lors de la récupération des formations:", error);
        }
    }

    useEffect(() => {
        fetchAllTraining();
    }, [])

    return (
        <>
        <div className="container-admin">
            <div className="d-flex justify-content-between">
            <h1> Formations </h1>
            <button
              className="primary-button"
              onClick={() => navigateTo(FRONT_ADMIN_ADD_TRAINING, navigate)}
            >
              <span className="material-icons-outlined">add_circle_outline</span>
              <span>Ajouter un utilisateur</span>
            </button>
            </div>
            <Table striped bordered hover responsive className="mt-4">
                <thead>
                    <tr>
                        <th>Nom de la formation</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {trainings.map((training)=>(
                        <tr key={training.id}>
                            <td>{training.title}</td>
                            <td>
                                <Link to={`/admin/training/${training.id}/edit`}>
                                    <button className="btn btn-warning">Voir plus</button>
                                </Link>
                                <button className="btn btn-danger" >Modifier</button>
                            </td>
                        </tr>
                    ) )}
                </tbody>
                </Table>
        </div>
        </>
    )
}

export default AdminTrainingPage;