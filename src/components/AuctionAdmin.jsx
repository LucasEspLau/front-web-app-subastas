import { useEffect, useState } from 'react';
import './src/AuctionAdmin.css';

export function AuctionAdmin({ auctions }) {
    const [editedAuctionId, setEditedAuctionId] = useState(null);
    const [editedAuction, setEditedAuction] = useState({});
    const [originalAuctionState, setOriginalAuctionState] = useState('');

    // Función para manejar el inicio de la edición
    const handleEdit = (auction) => {
        setEditedAuctionId(auction.id);
        setOriginalAuctionState(auction.FK_Estado.toString()); // Guarda el estado original de la subasta
        setEditedAuction({
            FK_Estado: auction.FK_Estado.toString(),
            id_client: auction.Client && auction.Client[0] ? auction.Client[0].id : null,
            price: auction.price
        });
    };

    // Función para manejar el cambio de estado
    const handleChangeState = (e) => {
        setEditedAuction({ ...editedAuction, FK_Estado: e.target.value });
    };

    // Función para guardar el cambio de estado
    const handleSave = async (id) => {
        // Comprueba si el estado editado es igual al estado original
        if (editedAuction.FK_Estado === originalAuctionState) {
            console.log("El estado no ha cambiado. No se realizará ninguna actualización.");
            setEditedAuctionId(null); // Resetea el estado de edición sin hacer nada
            return; // Sal de la función para no realizar el fetch
        }

        try {
            const response = await fetch(`http://localhost:3000/api/auctions/${id}/state`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedAuction),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setEditedAuctionId(null); // Resetea el estado de edición
        } catch (error) {
            console.error('Error updating auction state:', error);
        }
    };

    if (!auctions) {
        return <div>Cargando subastas...</div>;
    }

    return (
        <div className="aa-container">
            {auctions.map((auction) => (
                <div key={auction.id} className="aa-item">
                    <img src={auction.Product[0].imageUrl} alt={`Producto de la subasta ${auction.id}`} className="aa-image"/>
                    <div className='aa-info'>
                        <h3>Auction {auction.id}</h3>
                        <p className='aa-winner'>Current winner: {auction.Client && auction.Client[0] ? auction.Client[0].userclient : 'Sin ganador'}</p>
                        <p className='aa-price'>Current price: $ {auction.price}</p>
                        {editedAuctionId === auction.id ? (
                            <div>
                                <select value={editedAuction.FK_Estado} onChange={handleChangeState}>
                                    <option value="1">Activo</option>
                                    <option value="2">Finalizado</option>
                                </select>
                                <button onClick={() => handleSave(auction.id)}>Guardar</button>
                            </div>
                        ) : (
                            <div>
                                <p className='aa-state-p'>Estado: {auction.FK_Estado === 1 ? 'Activo' : 'Finalizado'}</p>
                                <button onClick={() => handleEdit(auction)}>Editar</button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
