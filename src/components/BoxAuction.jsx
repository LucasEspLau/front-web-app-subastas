import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom'; // Importa useLocation
import { TopProduct } from './TopProduct';
import { BetClients } from './BetClients';
import { GameClients } from './GameClients';
import { useMain } from '../service/MainProvider';

export function BoxAuction() {
    const [auction, setAuction] = useState(null);
    const { socket, updateCount } = useMain();
    const location = useLocation(); // Utiliza useLocation para acceder a la ubicación actual
    const clientData = location.state?.clientData; // Accede a los datos del cliente enviados desde el Login

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/box-auctions/1');
                const data = await response.json();
                const boxAuction = data[0];
                if (boxAuction && boxAuction.Auctions) {
                    const desiredAuction = boxAuction.Auctions.find(a => a.FK_Estado === 1);
                    setAuction(desiredAuction || {});
                }
            } catch (error) {
                console.error('Error al recuperar los BoxAuction:', error);
            }
        };
    
        fetchData();
    }, [updateCount]);

    return (
        <main>
            <TopProduct auction={auction} />
            <BetClients user={clientData || {}} auction={auction} /> {/* Asegúrate de manejar el caso de que clientData sea undefined */}
            <GameClients auction={auction}/>
        </main>
    );
}
