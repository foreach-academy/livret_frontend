import React from 'react'

function HomePageSection({title, children}) {
  return (
    <div className='d-flex flex-column align-items-center  mt-5'>
        <h1>{title}</h1>
        <div className='d-flex align-items-center justify-content-center min-vw-100'>
            {children}
        </div>
    </div>
  )
}

export default HomePageSection