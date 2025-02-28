import { Link, useLocation } from "react-router-dom";

function TileNavbar({ url, logo, label}) {
  const location = useLocation();
  return (
    <Link
      className={`navbar_admin-item ${
        location.pathname === url ? "active" : ""
      }`}
      to={url}
    >
      <img src={`/images/icons/${logo}`} alt={logo} />
      <span>{label}</span>
    </Link>
  );
}
export default TileNavbar;
