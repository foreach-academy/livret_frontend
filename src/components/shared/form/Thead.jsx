import React from 'react'

function Thead({theads}) {
  return (
    <thead> 
        {theads.map((thead)=>(
            <th key={thead.id}>{thead.label}</th>
        ))}
    </thead>
  )
}

export default Thead