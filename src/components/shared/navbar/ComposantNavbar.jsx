import { Link, useLocation } from "react-router-dom"

function ListNavbar({url, logo, lien}) {
    const location = useLocation(); 

    return (
        <>
  
            <Link className={`navbar_admin-item ${location.pathname === url ? "active" : ""}`} to={url}> <img src={`/images/icons/${logo}`} alt={logo} /> {lien} </Link>
        
        </>
    )

}
export default ListNavbar