import { useLocation } from 'react-router-dom'; // Importa useLocation
import { NavBarAdmin } from './NavBarAdmin';
import { ClientArea } from './ClientArea';

export function AdminMain(){
    const location = useLocation(); // Utiliza useLocation para acceder a la ubicación actual
    const adminData = location.state?.adminData; 

    return(
        <main>
            <NavBarAdmin/>
            <ClientArea/>
            
        </main>
    );
}