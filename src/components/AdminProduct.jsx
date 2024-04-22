import { NavBarAdmin } from "./NavBarAdmin";
import { ProductAreaAdmin } from "./ProductAreaAdmin";
import { useLocation } from 'react-router-dom'; // Importa useLocation
export function AdminProduct(){
    const location = useLocation(); // Utiliza useLocation para acceder a la ubicación actual
    const adminData = location.state?.adminData; 
    return(
        <main>
            <NavBarAdmin/>
            <ProductAreaAdmin/>
        </main>
       
    )
}