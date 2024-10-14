import React, { useState, useEffect, useContext } from 'react';
import FormationServices from '../../Services/FormationServices';
import { useParams, useNavigate } from 'react-router-dom'; 
import "../../styles/LivretPage/LivretPage.css";
import UserServices from '../../Services/UserServices';
import AuthContext from '../../Context/AuthContext';

function LivretPage() {
  // modules : pour afficher les modules aux admins
  const [modules, setModules] = useState([]);
  const [moduleId, setModuleId] = useState(25);
  const { formationId } = useParams(); 
  const [students, setStudents] = useState([]);
  const [formationName, setFormationName] = useState('');
  const [selectedYear, setSelectedYear] = useState("Première année"); 
  const [dynamicFormationId, setDynamicFormationId] = useState(formationId); 
  const [showYearDropdown, setShowYearDropdown] = useState(false); 
  const [search, setSearch] = useState('');
  const navigate = useNavigate(); 
  const formateurId = UserServices.getUserId();
  const { isAdmin } = useContext(AuthContext);

  const fetchModules = async () => {
    try {
      let response;
      if(isAdmin){
        response = await FormationServices.getModulesByFormationId(dynamicFormationId);
      } else {
        response = await FormationServices.getModulesByFormationIdAndFormateurId(dynamicFormationId, formateurId);
      }
      setModules(response.data.modules || []);
    } catch (error) {
      console.error('Error fetching modules:', error);
      setModules([]); 
    }
  }

  const fetchStudents = async () => {
    const response = await FormationServices.getStudentsEvaluationsByFormationAndModule(dynamicFormationId, moduleId);
    setFormationName(response.data.title);
    setStudents(response.data.apprenants);
  };

  const handleChange = (event) => {
    const selectedModuleId = Number(event.target.value);
    setModuleId(selectedModuleId);
  };

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
    const newFormationId = selectedYear === "Première année" ? 2 : 4;
    setDynamicFormationId(newFormationId);
    navigate(`/${newFormationId}/concepteur-developpeur-application`);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const removeAccent = (string) => {
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('fr-FR', options);
  };

  const searchedStudents = students.filter((student) => {
    const firstName = removeAccent(student.first_name).toLowerCase();
    const lastName = removeAccent(student.surname).toLowerCase();
    const searchText = removeAccent(search).toLowerCase();
    return firstName.includes(searchText) || lastName.includes(searchText);
  });

  const studentsNotEvaluated = students.filter((student) => !student.evaluation || student.evaluation.length === 0).length;
  const selectedModule = modules.find((module) => module.id === moduleId);

  useEffect(() => {
    fetchModules();
    fetchStudents();
  }, [dynamicFormationId, moduleId, selectedYear]);

  useEffect(() => {
    if (formationId === '2' || formationId === '4') {
      setShowYearDropdown(true);
    } else {
      setShowYearDropdown(false); 
    }
  }, [formationId]);

  return (
    <div className='formation-container'>
      <h1>{formationName}</h1>
      <div className='formation-filter-container'>
        {showYearDropdown && (
          <div className='formation-filter'>
            <label htmlFor="year">Année :</label>
            <select name="year" id="year" onChange={handleYearChange} value={selectedYear}>
              <option value="Première année">Première année</option>
              <option value="Deuxième année">Deuxième année</option>
            </select>
          </div>
        )}
        <div className='formation-filter'>
          <label htmlFor="module">Module :</label>
          <select name="module" id="module" onChange={handleChange}>
            {(modules.length <= 0 || modules.length <=0) && 
              <option selected disabled>Aucun module</option>
            }
            {modules.map((module) => (
              <option key={module.id} value={module.id}>{module.title}</option>
            ))}
          </select>
        </div>
        <div className='formation-filter'>
          <label htmlFor="search">Apprenant·e :</label>
          <div className="search-container">
            <input type="search" name="search" id="search" placeholder="Nom de l'apprenant·e" onChange={handleSearch} />
            <span className="material-icons-outlined">search</span>
          </div>
        </div>
      </div>
      {modules.length > 0 ?
        <>
          <div>
            <h2><span className='badge-primary'>{studentsNotEvaluated}</span> évaluations à compléter</h2>
          </div> 
          <div>
            <table>
              <thead>
                <tr>
                  <th>Apprenant·e·s</th>
                  <th>Date de naissance</th>
                  <th>Entreprise</th>
                  <th>Évaluations</th>
                </tr>
              </thead>
              <tbody>
                {searchedStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.first_name} {student.surname}</td>
                    <td>{formatDate(student.birthdate)}</td>
                    <td>{student.company}</td>
                    <td>
                      {selectedModule && selectedModule.formateur_id === formateurId ? (
                        student.evaluation && student.evaluation.length > 0 ?
                          <a href="/livret">Voir l'évaluation</a>
                          : <button className='primary-button'>Ajouter une évaluation</button>
                      ) : (
                        student.evaluation && student.evaluation.length > 0 ?
                          <a href="/livret">Voir l'évaluation</a>
                          : <span>Aucune évaluation</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
        : <span>Vous n'avez pas de modules dans cette formation</span>
      }
    </div>
  );
}

export default LivretPage;
