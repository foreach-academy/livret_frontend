import React from 'react'

function Thead({theads, isAdmin}) {
  return (
    <thead> 
        {theads.map((thead, index)=>(
            <th key={index}>{thead.label}</th>
        ))}
        {isAdmin && (
          <th>Actions</th>
        )}
    </thead>
  )
}

export default Thead