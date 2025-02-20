import { useNavigate, useParams } from "react-router-dom";
import TrainingServices from "../../../services/TrainingServices";
import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import AuthContext from "../../../context/AuthContext";
import AdminLayout from "../../../components/pages/admin/AdminLayout";
import PromotionsService from "../../../services/PromotionsService";
import { FRONT_ADMIN_PROMOTIONDETAILS } from "../../../utils/frontUrl";

function TrainingDetailPage() {
    const { id } = useParams();
    const [training, setTraining] = useState({});
    const [promotion, setPromotion] = useState([]);
    const { isAuthenticated, isAdmin, setIsAuthenticated, setIsAdmin, isTrainer ,setToken } = useContext(AuthContext);
    const navigate = useNavigate()


    const getTrainingDetail = async () =>{
        try{
            const response = await TrainingServices.fetchTrainingById(id);
            setTraining(response.data);
        }
        catch(error){
            console.error("Erreur lors de la récupération des détails de la formation:", error);
        }
    }
    const fetchPromotionByTraining = async () =>{
        try{
            const response = await PromotionsService.getPromotionByTrainingId(id);
            console.log(response.data);
            setPromotion(response.data);
        }
        catch(error){
            console.error("Erreur lors de la récupération des promotions associées à la formation:", error);
        }
    }


    useEffect(() => {
        getTrainingDetail();
        fetchPromotionByTraining();
    }, [])

    return(
        <AdminLayout>
        <div className="container-admin">
<h1> {training.title}</h1>
<h3>Description :</h3>
<p>{training.description}</p>
<div className="d-flex flex-column gap-5">
<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Modules
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <Table striped bordered hover responsive className="mt-4">
    <thead>
        <tr>
            <th>Nom du module</th>
            <th>Description</th>
            {isAdmin && (<th>Action</th>)}
        </tr>
    </thead>
    <tbody>
        {training.modules && training.modules.map((module)=>(
            <tr key={module.id}>
                <td>{module.title}</td>
                <td>{module.commentary}</td>
               {isAdmin&&(<td className="d-flex justify-content-center">
                    <button className="primary-button" >Modifier</button>
                </td>)} 
            </tr>
        ))}
    </tbody>
    </Table>
      </div>
    </div>
  </div>
  </div>

  <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
        Promotions
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <Table striped bordered hover responsive className="mt-4">
        <thead>
        <tr>
            <th>Nom de la promotion</th>

            {isAdmin && (<th>Action</th>)}
        </tr>
        </thead>
        <tbody>
        {promotion  && promotion.map((promotion)=>(
            <tr key={promotion.id}>
                <td>{promotion.title}</td>
               {isAdmin&&(<td className="d-flex justify-content-center">
                    <button className="tertiary-button" onClick={() => (navigate(`/admin/promotions/${promotion.id}`))} >Voir plus</button>
                </td>)} 
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
    )
}

export default TrainingDetailPage;