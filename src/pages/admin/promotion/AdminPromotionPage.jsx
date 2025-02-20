import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PromotionsService from "../../../services/PromotionsService";
import TrainingService from "../../../services/TrainingServices";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import AuthContext from "../../../context/AuthContext";
import AdminLayout from "../../../components/pages/admin/AdminLayout";

const AdminPromotionPage = () => {
  const [promotions, setPromotions] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTraining, setSelectedTraining] = useState(""); // État pour la formation sélectionnée
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);

  const fetchAllPromotions = async () => {
    try {
      const response = await PromotionsService.fetchAllPromotions();
      setPromotions(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des promotions:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const fetchAllTrainings = async () => {
    try {
      const response = await TrainingService.fetchAllTraining();
      setTrainings(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des formations:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    fetchAllPromotions();
    fetchAllTrainings();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleTrainingChange = (event) => {
    setSelectedTraining(event.target.value);
  };

  // Filtrer les promotions selon la recherche et la formation sélectionnée
  const filteredPromotions = promotions.filter((promotion) => {
    const matchesSearch = promotion.title.toLowerCase().includes(searchTerm);
    const matchesTraining =
      selectedTraining === "" || promotion.training_id === parseInt(selectedTraining);
    return matchesSearch && matchesTraining;
  });

  return (
    <AdminLayout>
      <div className="container-admin">
        {/* En-tête de la liste des promotions */}
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

        {/* Filtres */}
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
            <Form.Select value={selectedTraining} onChange={handleTrainingChange}>
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
                    onClick={() => navigate(`/admin/promotions/${promotion.id}`)}
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
