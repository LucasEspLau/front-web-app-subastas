import { useState } from 'react';
import { Link } from 'react-router-dom';
import './src/TopProduct.css';

export function TopProduct({ auction }) {
    if (!auction) {
        return <div>Cargando...</div>; // O alguna otra representación de "cargando" o "no disponible"
    }

    // Verificar si hay información del cliente disponible
    const hasClientInfo = auction.Client && auction.Client.length > 0;

    return (
        <div>
            <div className='tp-nav-title'>
                <h5>  <Link to="/" >Log In</Link></h5>
                <h1 className='tp-title'>{auction.Product[0].name}</h1>
            </div>
            
            <div className="tp-head">
                <h3 className='tp-bit'>
                    $ {auction.price}
                </h3>
                <h3 className='tp-user'>
                    {hasClientInfo ? auction.Client[0].userclient : "Sin apuestas"}
                </h3>
                {/* Si necesitas mostrar una hora o tiempo específico, asegúrate de tener esa información disponible */}
                <h3 className='tp-time'>
                    {/* Información del tiempo si está disponible */}
                </h3>
            </div>
            <div className='tp-product'>
                <img src={auction.Product[0].imageUrl} alt={auction.Product[0].name} />
                <h2>Cronología de Apuestas</h2>
                {/* Aquí podrías listar la cronología de apuestas si tienes esa información disponible */}
            </div>
        </div>
    );
}
