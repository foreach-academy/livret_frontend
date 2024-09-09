import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DataConnexion.css';

function DataConnexion() {
    const { role } = useParams(); // Récupère le nom du rôle depuis les paramètres de l'URL
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/User/role/${role}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUsers(data); 
            })
            .catch(error => {
                setError('Error fetching users');
                console.error('Error fetching users:', error);
            });
    }, [role]);

    return (
        <>  
            <h1> Liste des utilisateurs</h1>
            <div className='list'>
                <br></br>
                {error && <p>{error}</p>}
                {users.length > 0 ? (
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
