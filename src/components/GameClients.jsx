import { useEffect, useState } from 'react';
import moment from 'moment-timezone'; // Importa moment-timezone
import './src/GameClients.css';

export function GameClients({ auction }) {
    const [bets, setBets] = useState([]);

    useEffect(() => {
        // Comprueba si el objeto auction o auction.Bets es indefinido
        if (!auction || !auction.Bets) {
            setBets([]); // Establece bets como un arreglo vacío si no hay apuestas
            return;
        }

        // Si hay apuestas, formatea cada apuesta y establece el estado de bets
        const formattedBets = auction.Bets.map(bet => ({
            ...bet,
            // Asume que 'bet.timebet' es la fecha en formato UTC
            // Convierte a la zona horaria de Perú y formatea
            timebet: moment(bet.timebet).tz('America/Lima').format('HH:mm:ss')
        }));
        setBets(formattedBets);
    }, [auction]);

    // Si no hay apuestas, muestra un mensaje indicando que no hay apuestas para esta subasta
    if (bets.length === 0) {
        return <div className='gc-no-bets'>No hay apuestas para esta subasta.</div>;
    }

    // Si hay apuestas, muestra la tabla de apuestas
    return (
        <table className='gc-table'>
            <thead>
                <tr>
                    <th>Precio</th>
                    <th>Modality</th>
                    <th>Hora</th>
                    <th>Usuario</th>
                </tr>
            </thead>
            <tbody>
                {bets.map((bet, index) => (
                    <tr key={index}>
                        <td>{bet.amount}$</td>
                        <td>{bet.modality === 1 ? 'Manual' : 'Automático'}</td>
                        <td>{bet.timebet}</td>
                        <td>{bet.userclient}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
