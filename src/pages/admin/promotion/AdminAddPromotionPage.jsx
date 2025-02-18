import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/pages/admin/AdminLayout';
import Input from '../../../components/shared/form/Input';
import TrainingServices from '../../../services/TrainingServices';
import PromotionsService from '../../../services/PromotionsService';
import { useNavigate } from 'react-router-dom';
import { FRONT_ADMIN_PROMOTION } from '../../../utils/frontUrl';
import UserServices from '../../../services/UserServices';

function AdminAddPromotionPage() {
    const [selectedTraining, setSelectedTraining] = useState("");
    const [promotion, setPromotion] = useState({
        title: "",
        training_id: "",
        supervisors: [],
        trainers: [],
        students: [],
    });

    const [trainings, setTrainings] = useState([]);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    
    const [selectedSupervisor, setSelectedSupervisor] = useState("");
    const [selectedTrainer, setSelectedTrainer] = useState("");
    const [selectedStudent, setSelectedStudent] = useState("");

    const [selectedSupervisors, setSelectedSupervisors] = useState([]);
    const [selectedTrainers, setSelectedTrainers] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);

    const supervisors = users.filter(user => user.userRole.id === 1);
    const trainers = users.filter(user => user.userRole.id === 2);
    const students = users.filter(user => user.userRole.id === 3);

    useEffect(() => {
        const fetchAllTrainings = async () => {
            try {
                const response = await TrainingServices.fetchAllTraining();
                setTrainings(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des formations:", error);
            }
        };

        const getAllUsers = async () => {
            try {
                const response = await UserServices.fetchAllUsers();
                setUsers(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs:", error.response?.data || error.message);
            }
        };

        fetchAllTrainings();
        getAllUsers();
    }, []);


    useEffect(() => {
        setPromotion(prevPromotion => ({
            ...prevPromotion,
            supervisors: selectedSupervisors,
            trainers: selectedTrainers,
            students: selectedStudents,
        }));
    }, [selectedSupervisors, selectedTrainers, selectedStudents]);

    const addSupervisor = () => {
        if (selectedSupervisor && !selectedSupervisors.includes(Number(selectedSupervisor))) {
            setSelectedSupervisors([...selectedSupervisors, Number(selectedSupervisor)]);
        }
    };

    const addTrainer = () => {
        if (selectedTrainer && !selectedTrainers.includes(Number(selectedTrainer))) {
            setSelectedTrainers([...selectedTrainers, Number(selectedTrainer)]);
        }
    };

    const addStudent = () => {
        if (selectedStudent && !selectedStudents.includes(Number(selectedStudent))) {
            setSelectedStudents([...selectedStudents, Number(selectedStudent)]);
        }
    };

    const removeSupervisor = (id) => {
        setSelectedSupervisors(selectedSupervisors.filter(supervisorId => supervisorId !== id));
    };

    const removeTrainer = (id) => {
        setSelectedTrainers(selectedTrainers.filter(trainerId => trainerId !== id));
    };

    const removeStudent = (id) => {
        setSelectedStudents(selectedStudents.filter(studentId => studentId !== id));
    };

    const handleSubmit = async () => {
        if (!promotion.title || !promotion.training_id) {
            console.error("Veuillez renseigner tous les champs.");
            return;
        }

        try {
            console.log(promotion)
            await PromotionsService.addPromotion(promotion);
            navigate(FRONT_ADMIN_PROMOTION);
        } catch (error) {
            console.error("Erreur lors de l'ajout de la promotion:", error);
        }
    };

    return (
        <AdminLayout>
            <div className="container-admin">
                <h1>Ajouter une promotion</h1>
                <div className="form_blue_contener wider">
                    <div className="form_blue gap-3">
                        <div className='d-flex flex-row gap-3'>
                            <select 
                                value={selectedTraining} 
                                onChange={(e) => {
                                    setSelectedTraining(e.target.value);
                                    setPromotion({ ...promotion, training_id: e.target.value });
                                }}
                            >
                                <option value="" disabled>Choisissez une formation</option>
                                {trainings.map((training) => (
                                    <option key={training.id} value={training.id}>{training.title}</option>
                                ))}
                            </select>
                            <Input 
                                changeFunction={(e) => setPromotion({ ...promotion, title: e.target.value })}  
                                labelName="Nom de la promotion :" 
                                type="text" 
                                value={promotion.title} 
                            />
                        </div>

                        {/* Sélection du superviseur */}
                        <div className="d-flex gap-2">
                            <select value={selectedSupervisor} onChange={(e) => setSelectedSupervisor(e.target.value)}>
                                <option value="" disabled>Choisissez un superviseur</option>
                                {supervisors.map((supervisor) => (
                                    <option key={supervisor.id} value={supervisor.id}>
                                        {supervisor.firstname} {supervisor.lastname}
                                    </option>
                                ))}
                            </select>
                            <button onClick={addSupervisor} className="primary-button">Ajouter</button>
                        </div>
                        <ul>
                            {selectedSupervisors.map((id) => {
                                const user = users.find(user => user.id === id);
                                return user ? <li key={id}>{user.firstname} {user.lastname} <button onClick={() => removeSupervisor(id)}>❌</button></li> : null;
                            })}
                        </ul>

                        {/* Sélection du formateur */}
                        <div className="d-flex gap-2">
                            <select value={selectedTrainer} onChange={(e) => setSelectedTrainer(e.target.value)}>
                                <option value="" disabled>Choisissez un formateur</option>
                                {trainers.map((trainer) => (
                                    <option key={trainer.id} value={trainer.id}>
                                        {trainer.firstname} {trainer.lastname}
                                    </option>
                                ))}
                            </select>
                            <button onClick={addTrainer} className="primary-button">Ajouter</button>
                        </div>
                        <ul>
                            {selectedTrainers.map((id) => {
                                const user = users.find(user => user.id === id);
                                return user ? <li key={id}>{user.firstname} {user.lastname} <button onClick={() => removeTrainer(id)}>❌</button></li> : null;
                            })}
                        </ul>

                        {/* Sélection des étudiants */}
                        <div className="d-flex gap-2">
                            <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
                                <option value="" disabled>Choisissez un étudiant</option>
                                {students.map((student) => (
                                    <option key={student.id} value={student.id}>
                                        {student.firstname} {student.lastname}
                                    </option>
                                ))}
                            </select>
                            <button onClick={addStudent} className="primary-button">Ajouter</button>
                        </div>
                        <ul>
                            {selectedStudents.map((id) => {
                                const user = users.find(user => user.id === id);
                                return user ? <li key={id}>{user.firstname} {user.lastname} <button onClick={() => removeStudent(id)}>❌</button></li> : null;
                            })}
                        </ul>

                        <button onClick={handleSubmit} className="primary-button">
                            Ajouter la promotion
                        </button>
                    </div> 
                </div> 
            </div> 
        </AdminLayout>
    );
}

export default AdminAddPromotionPage;
