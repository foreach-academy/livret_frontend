import { Link, useLocation } from "react-router-dom"

function ListNavbar({url, logo, lien}) {
    const location = useLocation(); 

    return (
        <>
        <li className={`navbar_admin-item ${location.pathname === url ? "active" : ""}`}>
            <Link to={url}> <img src={`/images/icons/${logo}`} alt={logo} /> {lien} </Link>
          </li>
        </>
    )

}
export default ListNavbar