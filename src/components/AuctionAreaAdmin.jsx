import { AuctionAdmin } from "./AuctionAdmin";

import { useMain } from '../service/MainProvider';
import { useEffect, useState, useContext } from 'react';
import { AuctionCreate } from "./AuctionCreate";
export function AuctionAreaAdmin(){
    const { socket, updateCount } = useMain();
    const [auctions, setAuctions] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/box-auctions/1');
                const data = await response.json();
                const boxAuction = data[0];
                if (boxAuction && boxAuction.Auctions) {
                    // Asigna directamente todas las subastas a 'setAuctions' sin filtrar por estado
                    setAuctions(boxAuction.Auctions);
                }
            } catch (error) {
                console.error('Error al recuperar los BoxAuction:', error);
            }
        };

        fetchData();
    }, [updateCount]);
    return(
        <>
            <AuctionCreate/>
            <AuctionAdmin auctions={auctions} />

        </>
        
    )
}