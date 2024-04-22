import { useLocation } from 'react-router-dom'; // Importa useLocation
import { NavBarAdmin } from './NavBarAdmin';
import { AuctionAreaAdmin } from './AuctionAreaAdmin';


export function AdminAuction(){
    const location = useLocation(); // Utiliza useLocation para acceder a la ubicación actual
    const adminData = location.state?.adminData; 

    return(
        <main>
            <NavBarAdmin/>
            <AuctionAreaAdmin/>
            
        </main>
    );
}