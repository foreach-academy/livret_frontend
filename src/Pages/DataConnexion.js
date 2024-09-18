import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DataConnexion.css';

function DataConnexion() {
const { role } = useParams(); // Récupère le rôle depuis l'URL
const [users, setUsers] = useState([]);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(true); // État pour le chargement

useEffect(() => {
    setLoading(true); // Le chargement commence
    console.log({role})
    fetch(`http://127.0.0.1:3000/user/role/${role}`)
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error('Problème de réseau');
            }
            return response.json();
        })
        .then(data => {
            setUsers(data);
            setError(null); // Réinitialise l'erreur
        })
        .catch(error => {
            console.log(error)
            setError('Erreur lors de la récupération des utilisateurs');
        })
        .finally(() => {
            setLoading(false); // Le chargement est terminé
        });
}, [role]);

return (
    <>  
        <h1>Liste des utilisateurs</h1>
        <div className='list'>
            <br />
            {loading ? ( // Affiche un message de chargement pendant que les données sont récupérées
                <p>Chargement en cours...</p>
            ) : error ? (
                <p>{error}</p>
            ) : users.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Rôle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.first_name}</td>
                                <td>{user.surname}</td>
                                <td>{user.email}</td>
                                <td>{user.role.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucun utilisateur trouvé pour le rôle {role}</p>
            )}
        </div>
    </> 
);


   
}


export default DataConnexion;
