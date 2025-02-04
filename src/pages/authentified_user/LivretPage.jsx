import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import "../../styles/LivretPage/LivretPage.css";

function LivretPage() {

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

  useEffect(() => {

  }, [])
  

  return (
    <div className='formation-container'>
      <h1>{formationName}</h1>
      <div className='formation-filter-container'>
        {showYearDropdown && (
          <div className='formation-filter'>
            <label htmlFor="year">Année :</label>
            <select name="year" id="year" value={selectedYear}>
              <option value="Première année">Première année</option>
              <option value="Deuxième année">Deuxième année</option>
            </select>
          </div>
        )}
        <div className='formation-filter'>
          <label htmlFor="module">Module :</label>
          <select name="module" id="module">
            {(modules.length <= 0 || modules.length <=0) && 
              <option defaultValue  disabled>Aucun module</option>
            }
            {modules.map((module) => (
              <option key={module.id} value={module.id}>{module.title}</option>
            ))}
          </select>
        </div>
        <div className='formation-filter'>
          <label htmlFor="search">Apprenant·e :</label>
          <div className="search-container">
            <input type="search" name="search" id="search" placeholder="Nom de l'apprenant·e"  />
            <span className="material-icons-outlined">search</span>
          </div>
        </div>
      </div>
      {/* {modules.length > 0 ? */}
        <>
          <div>
            <h2><span className='badge badge-primary'></span>Evaluations à compléter</h2>
          </div> 
          <div>
            <table className='formation-filter-table'>
              <thead>
                <tr>
                  <th>Apprenant·e·s</th>
                  <th>Date de naissance</th>
                  <th>Entreprise</th>
                  <th>Évaluations</th>
                </tr>
              </thead>
              <tbody>
                  <tr key="">
                    <td>Timothe</td>
                    <td>05051994</td>
                    <td>
                      {/* {selectedModule && selectedModule.formateur_id === formateurId ? (
                        student.evaluation && student.evaluation.length > 0 ?
                          <a href={`/evaluation-form/${formationId}/${moduleId}/${student.id}`}>Voir l'évaluation</a>
                          : <button className='primary-button' onClick={() => {navigateTo(`/evaluation-form/${formationId}/${moduleId}/${student.id}`,navigate)}}>Ajouter une évaluation</button>
                      ) : (
                        student.evaluation && student.evaluation.length > 0 ?
                          <a href={`/evaluation-form/${formationId}/${moduleId}/${student.id}`}>Voir l'évaluation</a>
                          : <span>Aucune évaluation</span>
                      )} */}
                    </td>
                  </tr>
              </tbody>
            </table>
          </div>
        </>
        {/* : <span>Vous n'avez pas de modules dans cette formation</span> */}
      {/* } */}
    </div>
  );
}

export default LivretPage;
