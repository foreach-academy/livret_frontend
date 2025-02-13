import { useParams } from "react-router-dom";
import TrainingServices from "../../services/TrainingServices";
import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";

function TrainingDetailPage() {
    const { id } = useParams();
    const [training, setTraining] = useState({});
    const { isAuthenticated, isAdmin, setIsAuthenticated, setIsAdmin, isTrainer ,setToken } = useContext(AuthContext);


    const getTrainingDetail = async () =>{
        try{
            const response = await TrainingServices.fetchTrainingById(id);
            console.log(response.data);
            setTraining(response.data);
        }
        catch(error){
            console.error("Erreur lors de la récupération des détails de la formation:", error);
        }
    }

    useEffect(() => {
        getTrainingDetail();
    }, [])

    return(
        <>
        <div className="container-admin">
<h1> {training.title}</h1>
<h3>Description :</h3>
<p>{training.description}</p>

<Table striped bordered hover responsive className="mt-4">
    <thead>
        <tr>
            <th>Nom du module</th>
            <th  className="d-flex justify-content-end">Action</th>
        </tr>
    </thead>
    <tbody>
        {training.modules && training.modules.map((module)=>(
            <tr key={module.id}>
                <td>{module.title}</td>
                <td className="d-flex justify-content-end">
                    <button className="tertiary-button" >Voir plus</button>
                    <button className="primary-button" >Modifier</button>
                </td>
            </tr>
        ))}
    </tbody>
    </Table>
        </div>
        </>
    )
}

export default TrainingDetailPage;