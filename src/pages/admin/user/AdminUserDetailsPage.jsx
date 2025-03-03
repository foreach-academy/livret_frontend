import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserServices from "../../../services/UserServices";
import { toast } from "react-toastify";
import AdminLayout from "../../../components/pages/admin/AdminLayout";
import Button from "../../../components/shared/Button";
import AdminBodyTitle from "../../../components/shared/AdminBodyTitle";
import Input from "../../../components/shared/form/Input";
import CustomModal from "../../../components/shared/modal/CustomModal";
import RoleServices from "../../../services/RoleServices";
import SelectInputGeneric from "../../../components/shared/form/SelectInputGeneric";
import { admin } from "../../../utils/roleList";


function UserDetailsPage() {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState({});
  const [roles, setRoles] = useState([]);


  useEffect(() => {
    UserServices.fetchUserById(userId, setUser);
    RoleServices.fetchAllRoles(setRoles)
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await UserServices.updateUser(userId, user, navigate, toast);
  };

  const handleDelete = async () => {
    await UserServices.deleteUser(userId, navigate, toast);
  };

  return (
    <AdminLayout>
      <AdminBodyTitle pageTitle={`Modifier ${user.firstname} ${user.lastname}`} />
      <form onSubmit={handleUpdate}>
        <SelectInputGeneric
          label="Rôle"
          options={roles}
          selectedValue={user.role_id}
          onChange={(e) => setUser({ ...user, role_id: e.target.value })}
          getOptionLabel={(role) => role.name}
        />

        <Input
          type="text"
          name="firstname"
          labelName="Prénom"
          value={user.firstname}
          changeFunction={(e) => setUser({ ...user, firstname: e.target.value })}
          required={true}
        />

        <Input
          type="text"
          name="lastname"
          labelName="Nom"
          value={user.lastname}
          changeFunction={(e) => setUser({ ...user, lastname: e.target.value })}
          required
        />

        <Input
          type="email"
          name="email"
          labelName="Email"
          value={user.email}
          changeFunction={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        {user.userRole?.name === admin &&
          <Input
            type="text"
            name="position"
            labelName="Emploi"
            value={user.position || ""}
            changeFunction={(e) => setUser({ ...user, position: e.target.value })}
            placeholder="Ex : Directeur Technique"
            required
          />
        }

        {user.userRole?.name === admin &&
          <Input
            type="file"
            accept="image/*"
            labelName="Photo"
            changeFunction={(e) => setUser({ ...user, photo: e.target.value })}
            value={user.photo || ""}
          />}
        <Button type="submit" buttonTitle="Enregistrer les modifications" className="bg-fe-orange" />
      </form>
      <Button buttonTitle="Supprimer l'utilisateur" className="bg-danger" setAction={() => { setIsOpen(true) }} />
      <CustomModal
        title={`Supprimer le compte de ${user.firstname}`}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <span>Voulez-vous vraiment supprimer cet utilisateur ? Cette action est irréversible.</span>
        <br />
        <Button buttonTitle="Supprimer l'utilisateur" className="bg-danger" setAction={handleDelete} />
      </CustomModal>
    </AdminLayout>
  );
}

export default UserDetailsPage;
