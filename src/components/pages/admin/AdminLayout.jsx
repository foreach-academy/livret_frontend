import React from 'react'
import Navbar from '../../shared/navbar/Navbar'
import NavbarAdmin from '../../shared/navbar/AdminNavbar'

const AdminLayout = ({children}) => {
    return (
        <>
            <Navbar />
            <NavbarAdmin />
            {children}
        </>
    )
}

export default AdminLayout