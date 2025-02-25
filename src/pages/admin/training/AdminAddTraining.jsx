import { useState } from "react";
import TrainingServices from "../../../services/TrainingServices";
import AdminLayout from "../../../components/pages/admin/AdminLayout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TextArea from "../../../components/shared/form/TextArea";
import Input from "../../../components/shared/form/Input";
import Button from "../../../components/shared/Button";

function AddTraining() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [modules, setModules] = useState([{ title: "", commentary: "" }]);
    const navigate = useNavigate()

    const addModule = () => {
        setModules([...modules, { title: "", commentary: "" }]);
    };

    const removeModule = (index) => {
        setModules((prevModules) => prevModules.filter((_, i) => i !== index));
    };

    const handleModuleChange = (index, field, value) => {
        setModules((prevModules) =>
            prevModules.map((module, i) =>
                i === index ? { ...module, [field]: value } : module
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trainingData = {
            title,
            description,
            modules: modules.filter(module => module.title.trim() !== ""), // Ne pas envoyer les modules vides
        };
        await TrainingServices.addTraining(trainingData,navigate , toast );
     
    };

    return (
        <AdminLayout>
            <div className="container-admin">
                <h1>Ajouter une formation</h1>
                <div className="grey-background">
                    <form onSubmit={handleSubmit} className="form-container">
                        <fieldset>
                            <legend>Formation :</legend>
                            <div className="form-group">
                                <Input

                                    type="text"
                                    changeFunction={(e) => setTitle(e.target.value)}
                                    required
                                    labelName="Titre de la formation :"
                                    value={title}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description :</label>
                                <TextArea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></TextArea>
                            </div>
                        </fieldset>

                        <fieldset className="light-grey-background">
                            <legend>Module(s) :</legend>
                            {modules.map((module, index) => (
                                <div key={index} className="module-container">
                                    <h3>Module #{index + 1} :</h3>
                                    <div className="form-group">
                                        <Input
                                            changeFunction={(e) => handleModuleChange(index, "title", e.target.value)}
                                            type="text"
                                            value={module.title}
                                            labelName="Nom du module : "
                                            required

                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Description :</label>
                                        <TextArea
                                            value={module.commentary}
                                            onChange={(e) => handleModuleChange(index, "commentary", e.target.value)}
                                        ></TextArea>
                                    </div>
                                    <Button
                                        buttonTitle="Supprimer ce module"
                                        setAction={() => removeModule(index)}
                                        className="bg-danger"
                                    />
                                </div>
                            ))}
                            <Button
                                buttonTitle="Ajouter un module"
                                className="bg-fe-orange"
                                setAction={() => addModule()}

                            />

                        </fieldset>
                        <button type="submit" className="submit-btn">Ajouter</button>
                    </form>

                </div>
            </div>
        </AdminLayout>
    );
}

export default AddTraining;
