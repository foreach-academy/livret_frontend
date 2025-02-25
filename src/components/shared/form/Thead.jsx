import React from 'react'

function Thead({theads, isAdmin}) {
  return (
    <thead> 
        {theads.map((thead)=>(
            <th key={thead.id}>{thead.label}</th>
        ))}
        {isAdmin && (
          <th>Actions</th>
        )}
    </thead>
  )
}

export default Thead