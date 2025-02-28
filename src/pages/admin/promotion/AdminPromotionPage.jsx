import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PromotionsService from "../../../services/PromotionsService";
import { Table} from "react-bootstrap";
import AuthContext from "../../../context/AuthContext";
import AdminLayout from "../../../components/pages/admin/AdminLayout";
import Thead from "../../../components/shared/form/Thead";
import Tbody from "../../../components/shared/form/Tbody";
import { FRONT_ADMIN_ADD_PROMOTION, FRONT_ADMIN_PROMOTION } from "../../../utils/frontUrl";
import Input from "../../../components/shared/form/Input";
import AdminBodyTitle from "../../../components/shared/AdminBodyTitle";

const AdminPromotionPage = () => {
  const [promotions, setPromotions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);
  const theads = [
    {
      label: "Nom"
    },
    {
      label: "Action"
    }
  ]

  const columns = [{ key: "title", label: "Titre" }];

  const action = {
    label: "Voir plus",
    url: FRONT_ADMIN_PROMOTION,
  };


  const fetchAllPromotions = async () => {
    await PromotionsService.fetchAllPromotions(setPromotions);
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
    <AdminLayout>
      <AdminBodyTitle
        pageTitle="Promotion"
        isAdmin={isAdmin}
        navigate={navigate}
        navigateUrl={FRONT_ADMIN_ADD_PROMOTION}
        buttonTitle="Ajouter une promotion"
        icon="add"
      />
      <Input
        labelName="Rechercher une promotion :"
        type="search"
        value={searchTerm}
        changeFunction={(e) => setSearchTerm(e.target.value)}
        className="w-100"
      />

      {/* Liste des promotions */}
      {filteredPromotions.length === 0 ?  <div className="d-flex justify-content-center mt-5 text-align">Aucune promotion trouvée</div>
 : <Table striped bordered hover responsive className="mt-4">
        <Thead
          theads={theads}
        />
        <Tbody
          data={filteredPromotions}
          columns={columns}
          action={action}
        />

      </Table>}

    </AdminLayout>
  );
};

export default AdminPromotionPage;
