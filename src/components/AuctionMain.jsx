import { useEffect, useState } from 'react';
import { BoxAuction } from './BoxAuction';

export function AuctionMain() {
    const [boxAuctions, setBoxAuctions] = useState([]);

    useEffect(() => {
        // URL del endpoint que devuelve todos los BoxAuction con sus Auctions relacionadas
        fetch('http://localhost:3000/api/box-auctions')
            .then(response => response.json())
            .then(data => {
                setBoxAuctions(data);
                console.log(data)
            })
            .catch(error => {
                console.error('Error al recuperar los BoxAuction:', error);
            });
    }, []);


    return (
        <>
            {boxAuctions.map((boxAuction) => (
                // Utiliza boxAuction.id como key, asumiendo que cada boxAuction tiene un id único
                <BoxAuction key={boxAuction.id} data={boxAuction} />
            ))}
        </>
    );
}


