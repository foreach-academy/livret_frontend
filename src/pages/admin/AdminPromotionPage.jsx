import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PromotionsService from "../../services/PromotionsService";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";

const AdminPromotionPage = () => {
  const [promotions, setPromotions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  useEffect(() => {
    fetchAllPromotions();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredPromotions = promotions.filter((promotion) =>
    promotion.title.toLowerCase().includes(searchTerm)
  );

  return (
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

      {/* Zone de recherche */}
      <Row className="mt-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="🔍 Rechercher une promotion..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
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
  );
};

export default AdminPromotionPage;
