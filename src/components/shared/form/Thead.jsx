import React from 'react'

function Thead({theads, isAdmin}) {
  return (
    <thead> 
      <tr>
        {theads.map((thead, index)=>(
            <th key={index}>{thead.label}</th>
        ))}
        {isAdmin && (
          <th>Actions</th>
        )}</tr>
    </thead>
  )
}

export default Thead