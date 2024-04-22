import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:3000';
const MainContext = createContext();

export const useMain = () => useContext(MainContext);

export const MainProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [updateCount, setUpdateCount] = useState(0); // Usar un contador en lugar de un booleano

    useEffect(() => {
        const newSocket = io(SOCKET_SERVER_URL);
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Conectado al servidor');
        });

        // Manejador para el evento de actualización de subastas
        newSocket.on('auctionUpdate', () => {
            // Incrementa el contador cada vez que se recibe una actualización de subasta
            setUpdateCount(count => count + 1);
        });

        // Añade aquí el manejador para el evento 'clientCreateAdmin'
        newSocket.on('clientCreateAdmin', () => {
            // Puedes incrementar el contador o manejar este evento de una forma específica
            console.log('Lista de clientes actualizada');
            // Por ejemplo, incrementar el contador para forzar una actualización en los componentes que dependen de la lista de clientes
            setUpdateCount(count => count + 1);
        });

        newSocket.on('auctionUdptateState', () => {
            // Puedes incrementar el contador o manejar este evento de una forma específica
            console.log('Auction updated');
            // Por ejemplo, incrementar el contador para forzar una actualización en los componentes que dependen de la lista de clientes
            setUpdateCount(count => count + 1);
        });
        newSocket.on('productCreateAdmin', () => {
            // Puedes incrementar el contador o manejar este evento de una forma específica
            console.log('List Product updated');
            // Por ejemplo, incrementar el contador para forzar una actualización en los componentes que dependen de la lista de clientes
            setUpdateCount(count => count + 1);
        });

        newSocket.on('auctionCreated', () => {
            // Puedes incrementar el contador o manejar este evento de una forma específica
            console.log('Auction created');
            // Por ejemplo, incrementar el contador para forzar una actualización en los componentes que dependen de la lista de clientes
            setUpdateCount(count => count + 1);
        });
        newSocket.on('betCreated', () => {
            // Puedes incrementar el contador o manejar este evento de una forma específica
            console.log('Bet created');
            // Por ejemplo, incrementar el contador para forzar una actualización en los componentes que dependen de la lista de clientes
            setUpdateCount(count => count + 1);
        });
        
        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <MainContext.Provider value={{ socket, updateCount }}>
            {children}
        </MainContext.Provider>
    );
};
