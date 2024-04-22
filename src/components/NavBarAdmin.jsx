import { Link } from 'react-router-dom';
import './src/NavBarAdmin.css'; // Importa el archivo CSS

export function NavBarAdmin() {
    return (
        <nav className="navbar">
            <Link to="/adm-main" className="nav-link">Inicio</Link>
            <Link to="/adm-auction" className="nav-link">Auction</Link>
            <Link to="/adm-product" className="nav-link">Product</Link>
            <Link to="/" className="nav-link">Log in</Link>
        </nav>
    );
}
