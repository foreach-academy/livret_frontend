import React, { useState, useEffect } from 'react';
import FormationServices from '../../Services/FormationServices';
import { useParams } from 'react-router-dom';
import "../../styles/LivretPage/LivretPage.css"

function LivretPage () {
  const [modules, setModules] = useState([]);
  const [moduleId, setModuleId] = useState(25);
  const { formationId }= useParams();
  const [formationName, setFormationName] = useState([]);
  const [students, setStudents] = useState([]);
  const [ search, setSeach ] = useState('');

  const fetchModule = async () => {
    const response = await FormationServices.getModulesByFormationId(formationId);
    setModules(response.data.modules);
  }

  const fetchStudents = async () => {
    const response = await FormationServices.getStudentsEvaluationsByFormationAndModule(formationId, moduleId);
    setFormationName(response.data.title);
    setStudents(response.data.apprenants);
  } 

  const handleChange =  (event) => {
    const selectedModuleId = Number(event.target.value)
    setModuleId(selectedModuleId)
  }

  const handleSearch = (event) => {
    setSeach(event.target.value.toLowerCase());
  }
  console.log("recherche : " + search)

  const searchedStudents = students.filter((student) => {
    return (
      student.first_name.toLowerCase().includes(search) ||
      student.surname.toLowerCase().includes(search)
    );
  });
  console.log("étudiants recherchés : " + searchedStudents)

  useEffect(() => {
    fetchModule();
    fetchStudents();
  }, [moduleId]);

  useEffect(() => {
    fetchStudents();
  }, [formationId]);

  return (
    <div className='formation-container'>
      <h1>{formationName}</h1>
      <div className='formation-filter-container'>
        <div className='formation-filter'>
          <label htmlFor="module">Module :</label>
          <select name="module" id="module" onChange={handleChange}>
            {modules.map((module) => (
              <option key={module.id} value={module.id}>{module.title}</option>
            ))}
          </select>
        </div>
        <div className='formation-filter'>
          <label htmlFor="search">Étudiant :</label>
          <div className="search-container">
            <input type="search" name="search" id="search" placeholder="Nom de l'étudiant" onChange={handleSearch} />
            <span class="material-icons-outlined">search</span>
          </div>
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Étudiant</th>
              <th>Entreprise</th>
              <th>Livrets de suivi</th>
            </tr>
          </thead>
          <tbody>
            {searchedStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.first_name} {student.surname}</td>
                <td>{student.company}</td>
                <td>{student.evaluation && student.evaluation.length > 0 ? 
                  <a href="/livret">Voir le livret</a> 
                    : <button className='primary-button'>Ajouter une évaluation</button>
                  }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LivretPage
