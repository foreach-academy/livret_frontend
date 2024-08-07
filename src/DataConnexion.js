import React, { useEffect, useState } from 'react';

function DataConnexion() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:3000/api/data')
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h1>Data from Backend:</h1>
            {data ? <p>{data.message}</p> : <p>Loading...</p>}
        </div>
    );
}

export default DataConnexion;