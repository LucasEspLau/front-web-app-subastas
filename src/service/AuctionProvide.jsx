// AuctionProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMain } from './MainProvider'; // Importa el hook useMain del MainProvider

const AuctionContext = createContext();

export const useAuction = () => useContext(AuctionContext);

export const AuctionProvider = ({ children }) => {
    const { socket } = useMain(); // Utiliza el socket proporcionado por MainProvider
    const [auction, setAuction] = useState(null);

    useEffect(() => {
        socket.on('auctionUpdated', (updatedAuction) => {
            setAuction(updatedAuction);
        });
    
        return () => {
            socket.off('auctionUpdated');
        };
    }, [socket]);
    

    return (
        <AuctionContext.Provider value={{ auction }}>
            {children}
        </AuctionContext.Provider>
    );
};
