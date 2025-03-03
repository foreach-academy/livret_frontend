import React from 'react'

function HomePageSection({title, children}) {
  return (
    <div className='d-flex flex-column align-items-center'>
        <h2>{title}</h2>
        <div className='d-flex'>
            {children}
        </div>
    </div>
  )
}

export default HomePageSection