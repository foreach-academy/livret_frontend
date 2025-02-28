import { useContext, useEffect, useState } from "react";
import TrainingServices from "../../../services/TrainingServices";
import { Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { navigateTo } from "../../../utils/navigate";
import {
  FRONT_ADMIN_ADD_TRAINING,
  FRONT_ADMIN_TRAINING,
} from "../../../utils/frontUrl";
import AuthContext from "../../../context/AuthContext";
import AdminLayout from "../../../components/pages/admin/AdminLayout";
import Thead from "../../../components/shared/form/Thead";
import Tbody from "../../../components/shared/form/Tbody";
import AdminBodyTitle from "../../../components/shared/AdminBodyTitle";
import Input from "../../../components/shared/form/Input";

function AdminTrainingPage() {
  const [trainings, setTrainings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);

  const theadName = [
    {
      label: "Nom de la formation",
    },
    { label: "Action" },
  ];
  
  const columns = [{ key: "title", label: "Titre" }];

  const action = {
    label: "Voir plus",
    url: FRONT_ADMIN_TRAINING,
  };

  useEffect(() => {
    TrainingServices.fetchAllTrainings(setTrainings);
  }, []);

  const filteredTrainings = trainings.filter((training) =>
    training.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <AdminBodyTitle
        pageTitle="Formations"
        isAdmin={isAdmin}
        navigate={navigate}
        navigateUrl={FRONT_ADMIN_ADD_TRAINING}
        buttonTitle="Ajouter une formation"
      />

      <Input
        labelName="Rechercher une formation :"
        type="search"
        value={searchTerm}
        changeFunction={(e) => setSearchTerm(e.target.value)}
        className="w-100"
      />

      <Table striped bordered hover responsive className="mt-4">
        <Thead theads={theadName}></Thead>
        <Tbody data={filteredTrainings} columns={columns} action={action} />
      </Table>

    </AdminLayout>
  );
}

export default AdminTrainingPage;
