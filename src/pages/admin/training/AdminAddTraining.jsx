import { useState } from "react";
import TrainingServices from "../../../services/TrainingServices";
import AdminLayout from "../../../components/pages/admin/AdminLayout";

function AddTraining() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [modules, setModules] = useState([{ title: "", commentary: "" }]);
    const [message, setMessage] = useState("");

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
    
        try {
            await TrainingServices.addTraining(trainingData);
            setMessage("Formation et modules ajoutés avec succès !");
            setTitle("");
            setDescription("");
            setModules([{ title: "", commentary: "" }]); // Réinitialiser après ajout
        } catch (error) {
            console.error("Erreur:", error);
            setMessage("Erreur lors de la connexion au serveur.");
            
        }
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
                            <label htmlFor="title">Titre : </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description :</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                    </fieldset>

                    <fieldset className="light-grey-background">
                        <legend>Module(s) :</legend>
                        {modules.map((module, index) => (
                            <div key={index} className="module-container">
                                <h3>Module #{index + 1} :</h3>
                                <div className="form-group">
                                    <label>Nom du module : </label>
                                    <input
                                        type="text"
                                        value={module.title}
                                        onChange={(e) => handleModuleChange(index, "title", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description :</label>
                                    <textarea
                                        value={module.commentary}
                                        onChange={(e) => handleModuleChange(index, "commentary", e.target.value)}
                                    ></textarea>
                                </div>
                                <button type="button" onClick={() => removeModule(index)}>Supprimer ce module</button>
                            </div>
                        ))}
                        <button type="button" onClick={addModule} className="add-module-btn">
                            Ajouter un module
                        </button>
                    </fieldset>

                    <button type="submit" className="submit-btn">Ajouter</button>
                </form>

                {message && <p className="message">{message}</p>}
            </div>
        </div>
        </AdminLayout>
    );
}

export default AddTraining;
