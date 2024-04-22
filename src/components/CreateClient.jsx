import './src/CreateClient.css'
import React, { useState } from 'react';

export function CreateClient() {
    const [clientData, setClientData] = useState({
        userclient: '',
        email: '',
        password: '',
        coins: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClientData({ ...clientData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Client data to register:', clientData);

        // Lógica para enviar los datos al backend
        try {
            const response = await fetch('http://localhost:3000/api/createclient', {
                method: 'POST', // Asegúrate de que el método HTTP coincida con el definido en tu backend
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clientData),
            });

            if (response.ok) {
                // Manejo de la respuesta exitosa
                console.log('Client registered successfully');
                // Opcionalmente, resetear el formulario o redirigir al usuario
                setClientData({ userclient: '', email: '', password: '', coins: '' });
            } else {
                // Manejo de errores
                console.error('Failed to register client');
            }
        } catch (error) {
            console.error('Error registering client:', error);
        }
    };

    return (
        <div className="cc-create-client-container">
            <h2>Registrar Cliente</h2>
            <form onSubmit={handleSubmit}>
                <div className="cc-form-group">
                    <label htmlFor="userclient">Nombre de Usuario</label>
                    <input
                        type="text"
                        id="userclient"
                        name="userclient"
                        value={clientData.userclient}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="cc-form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={clientData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="cc-form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={clientData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="cc-form-group">
                    <label htmlFor="coins">Monedas</label>
                    <input
                        type="number"
                        id="coins"
                        name="coins"
                        value={clientData.coins}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="cc-btn-register">Registrar</button>
            </form>
        </div>
    );
}