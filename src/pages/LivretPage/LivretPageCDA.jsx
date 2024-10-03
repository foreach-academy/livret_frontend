import React, { useState, useEffect } from 'react';
import FormationServices from '../../Services/FormationServices';

function LivretPageCDA() {
  const [modules, setModules] = useState([]);
  const [moduleId, setModuleId] = useState(25);
  const [formationId, setFormationId] = useState(2);
  const [students, setStudents] = useState([]);

  const fetchModule = async () => {
    const response = await FormationServices.getModulesByFormationId(2);
    setModules(response.data.modules);
  }

  const fetchStudents = async () => {
    const response = await FormationServices.getStudentsEvaluationsByFormationAndModule(formationId, moduleId);
    setStudents(response.data.apprenants);
  }

  const handleChange =  (event) => {
    const selectedModuleId = Number(event.target.value)
    setModuleId(selectedModuleId)
  }
  console.log(moduleId)

  useEffect(() => {
    fetchModule();
    fetchStudents();
  }, [moduleId])

  return (
    <div>
      <h1>Concepteur développeur d'application</h1>
      <div>
        <label htmlFor="module">Module :</label>
        <select name="module" id="module" onChange={handleChange}>
          {modules.map((module) => (
            <option key={module.id} value={module.id}>{module.title}</option>
          ))}
        </select>
      </div>
      <div>{students.map((student) => (
        <p>{student.first_name} {student.surname} - {student.company} - 
        {student.evaluation && student.evaluation.length > 0 ? 
        student.evaluation[0].resultat.name 
        : 'Ajouter une évaluation'} 
          </p>
      ))}</div>
    </div>
  )
}

export default LivretPageCDA
