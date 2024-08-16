// DataConnexion.js

import React, { useEffect, useState } from 'react';

function DataConnexion({ role }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/api/users/role/${role}`)
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, [role]);

    return (
        <div>
            <h1>Utilisateurs avec le rôle "{role}"</h1>
            {data ? (
                <ul>
                    {data.map(user => (
                        <li key={user.id}>
                            {user.first_name}-{user.surname}-{user.email}-{user.formation}-{user.promo}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default DataConnexion;
