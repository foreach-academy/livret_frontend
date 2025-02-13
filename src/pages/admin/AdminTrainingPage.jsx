import { useContext, useEffect, useState } from "react";
import TrainingServices from "../../services/TrainingServices";
import { Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { navigateTo } from "../../utils/navigate";
import { FRONT_ADMIN_ADD_TRAINING, FRONT_ADMIN_TRAINING, FRONT_ADMIN_TRAININGDETAILS } from "../../utils/frontUrl";
import AuthContext from "../../context/AuthContext";

function AdminTrainingPage () {
    const [trainings, setTrainings] = useState([])
    const navigate = useNavigate();
    const { isAuthenticated, isAdmin, setIsAuthenticated, setIsAdmin, isTrainer ,setToken } = useContext(AuthContext);

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
            {isAdmin &&(
            <button
              className="primary-button"
              onClick={() => navigateTo(FRONT_ADMIN_ADD_TRAINING, navigate)}
            >
              <span className="material-icons-outlined">add_circle_outline</span>
            <span>Ajouter une formation</span>
            </button>)}
            </div>
            <Table striped bordered hover responsive className="mt-4">
                <thead>
                    <tr>
                        <th>Nom de la formation</th>
                        <th className="d-flex justify-content-end">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {trainings.map((training)=>(
                        <tr key={training.id}>
                            <td>{training.title}</td>
                            <td className="d-flex justify-content-end">
                           
                                    <button className="tertiary-button" onClick={()=> navigate(`${FRONT_ADMIN_TRAINING}/${training.id}`)}>Voir plus</button>
                                
                                {isAdmin &&(<button className="primary-button" >Modifier</button>)}
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