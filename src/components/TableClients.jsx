import React, { useState, useEffect } from 'react';
import './src/TableClients.css'; // Asegúrate de que la ruta sea correcta
import { useMain } from '../service/MainProvider'; // Asegúrate de que la ruta de importación sea correcta
export function TableClients() {
    const [clients, setClients] = useState([]); // Estado inicial vacío para los clientes
    const [editClientId, setEditClientId] = useState(null); // ID del cliente que se está editando
    const [editedClient, setEditedClient] = useState({}); // Datos del cliente que se está editando
    const { updateCount } = useMain(); // Utiliza el hook useMain para acceder a updateCount
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/clients');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setClients(data);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };
        fetchClients();
    }, [updateCount]);

    const handleEdit = (client) => {
        setEditClientId(client.id);
        setEditedClient({ ...client });
    };

    const handleSave = async (id) => {
        // Aquí deberías enviar una solicitud para actualizar los datos del cliente en tu backend
        try {
            const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
                method: 'PUT', // o 'PATCH' dependiendo de tu API
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedClient),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            // Actualiza el estado local de los clientes con los datos actualizados
            const updatedClients = clients.map(client => client.id === id ? editedClient : client);
            setClients(updatedClients);
            setEditClientId(null);
        } catch (error) {
            console.error('Error updating client:', error);
        }
    };

    const handleChange = (e, field) => {
        setEditedClient({ ...editedClient, [field]: e.target.value });
    };

    return (
        <table className="table-clients">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Coins</th>
                    <th>State</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {clients.map(client => (
                    <tr key={client.id}>
                        <td>{client.id}</td>
                        <td>
                            {editClientId === client.id ? (
                                <input type="text" value={editedClient.userclient} onChange={(e) => handleChange(e, 'userclient')} />
                            ) : (
                                client.userclient
                            )}
                        </td>
                        <td>
                            {editClientId === client.id ? (
                                <input type="email" value={editedClient.email} onChange={(e) => handleChange(e, 'email')} />
                            ) : (
                                client.email
                            )}
                        </td>
                        <td>
                            {editClientId === client.id ? (
                                <input type="number" value={editedClient.coins} onChange={(e) => handleChange(e, 'coins')} />
                            ) : (
                                client.coins
                            )}
                        </td>
                        <td>
                            {editClientId === client.id ? (
                                <select value={editedClient.state} onChange={(e) => handleChange(e, 'state')}>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            ) : (
                                client.state
                            )}
                        </td>
                        <td>
                            {editClientId === client.id ? (
                                <button onClick={() => handleSave(client.id)}>Save</button>
                            ) : (
                                <button onClick={() => handleEdit(client)}>Edit</button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
