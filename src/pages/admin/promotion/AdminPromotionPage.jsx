import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TrainingService from "../../../services/TrainingServices";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import AuthContext from "../../../context/AuthContext";
import AdminLayout from "../../../components/pages/admin/AdminLayout";

const AdminPromotionPage = () => {
  const [trainings, setTrainings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTraining, setSelectedTraining] = useState(""); 
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);

  const fetchAllTrainings = async () => {
    const allTrainings = await TrainingService.fetchAllTraining();
    setTrainings(allTrainings);
    console.log(allTrainings);
  };

  useEffect(() => {
    fetchAllTrainings();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleTrainingChange = (event) => {
    setSelectedTraining(event.target.value);
  };

  // Fonction pour récupérer et filtrer les promotions à afficher
  const getFilteredPromotions = () => {
    let promotions = [];

    if (selectedTraining !== "") {
            const training = trainings.find(
        (t) => t.id === parseInt(selectedTraining, 10)
      );
      if (training && training.promotions) {
        promotions = training.promotions;
      }
    } else {
// Si aucune formation n’est sélectionnée (selectedTraining === ""),
// on concatène toutes les promotions de toutes les formations et 
//on affiche tout via le retour de fetchAlltraiings.

        promotions = trainings.reduce(
        (acc, training) => acc.concat(training.promotions || []),
        []
      );
    }
    return promotions.filter((promo) =>
      promo.title.toLowerCase().includes(searchTerm)
    );
  };

  const filteredPromotions = getFilteredPromotions();

  return (
    <AdminLayout>
      <div className="container-admin">
        <div className="d-flex justify-content-between">
          <h1>Promotions</h1>
          {isAdmin && (
            <button
              className="primary-button"
              onClick={() => navigate("/admin/promotions/add")}
            >
              Ajouter une promotion
            </button>
          )}
        </div>

        {/* recherche */}
        <Row className="mt-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="🔍 Rechercher une promotion..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Col>
          <Col md={6}>
            <Form.Select
              value={selectedTraining}
              onChange={handleTrainingChange}
            >
              <option value="">Toutes les formations</option>
              {trainings.map((training) => (
                <option key={training.id} value={training.id}>
                  {training.title}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        {/* Liste des promotions */}
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>Nom</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredPromotions.map((promotion) => (
              <tr key={promotion.id}>
                <td>{promotion.title}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() =>
                      navigate(`/admin/promotions/${promotion.id}`)
                    }
                  >
                    Voir plus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default AdminPromotionPage;
