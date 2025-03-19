import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PromotionsService from "../../../services/PromotionsService";
import { Table } from "react-bootstrap";
import AuthContext from "../../../context/AuthContext";
import AdminLayout from "../../../components/pages/admin/AdminLayout";
import Thead from "../../../components/shared/form/Thead";
import Tbody from "../../../components/shared/form/Tbody";
import Accordion from "../../../components/shared/Accordion";
import SelectInputGeneric from "../../../components/shared/form/SelectInputGeneric";
import Input from "../../../components/shared/form/Input";
import AdminBodyTitle from "../../../components/shared/AdminBodyTitle";
import { FRONT_ADMIN_ADD_PROMOTION, FRONT_ADMIN_PROMOTION } from "../../../utils/frontUrl";

const AdminPromotionPage = () => {
  const [promotions, setPromotions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTraining, setSelectedTraining] = useState("");
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);
  
  useEffect(() => {
    const fetchAllPromotions = async () => {
      await PromotionsService.fetchAllPromotions(setPromotions);
    };
    fetchAllPromotions();
  }, []);

  // Regrouper les promotions par formation
  const groupedPromotions = promotions.reduce((acc, promo) => {
    const trainingId = promo.training.id;
    if (!acc[trainingId]) {
      acc[trainingId] = {
        title: promo.training.title,
        promotions: []
      };
    }
    acc[trainingId].promotions.push(promo);
    return acc;
  }, {});

  // Filtrer les formations
  const filteredPromotions = Object.entries(groupedPromotions)
    .filter(([id, training]) =>
      (selectedTraining === "" || selectedTraining === id) &&
      training.promotions.some(promo => promo.title.toLowerCase().includes(searchTerm))
    );

  return (
    <AdminLayout>
      <AdminBodyTitle
        pageTitle="Promotion"
        isAdmin={isAdmin}
        navigate={navigate}
        navigateUrl={FRONT_ADMIN_ADD_PROMOTION}
        buttonTitle="Ajouter une promotion"
        icon="add"
      />
      
      <div className="d-flex gap-3">
        <Input
          labelName="Rechercher une promotion :"
          type="search"
          value={searchTerm}
          changeFunction={(e) => setSearchTerm(e.target.value.toLowerCase())}
          className="w-100"
        />
        <SelectInputGeneric
          label="Filtrer par formation"
          options={Object.values(groupedPromotions).map((training, index) => ({ id: index.toString(), title: training.title }))}
          selectedValue={selectedTraining}
          onChange={(e) => setSelectedTraining(e.target.value)}
          getOptionLabel={(option) => option.title}
          className="w-25"
        />
      </div>

      {filteredPromotions.length === 0 ? (
        <div className="d-flex justify-content-center mt-5 text-align">Aucune promotion trouvée</div>
      ) : (
        filteredPromotions.map(([id, training]) => (
          <Accordion key={id} accordionLabel={training.title} accordionColor="bg-fe-blue">
            <Table striped bordered hover responsive className="mt-4">
              <Thead theads={[{ label: "Nom de la promotion" }, { label: "Action" }]} />
              <Tbody
                data={training.promotions}
                columns={[{ label: "title" }]}
                action={{ label: "Voir plus", url: FRONT_ADMIN_PROMOTION, className: "bg-fe-blue" }}
              />
            </Table>
          </Accordion>
        ))
      )}
    </AdminLayout>
  );
};

export default AdminPromotionPage;
