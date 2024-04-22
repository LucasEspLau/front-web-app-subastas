import { useState,useEffect } from 'react';
import './src/BetClients.css';

// Acepta user y auction como props



export function BetClients({ user, auction }) {
    const [betAmount, setBetAmount] = useState('');
    const [isAutomatic, setIsAutomatic] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Si el modo automático está activado, actualiza automáticamente el monto de la apuesta
        if (isAutomatic && auction) {
            const updatedBetAmount = (parseFloat(auction.price) + 0.01).toFixed(2);
            setBetAmount(updatedBetAmount.toString());
        }
    }, [isAutomatic, auction]); // Dependencias: isAutomatic y auction

    const handleSetBetAmount = (amount) => {
        setBetAmount(amount);
        setErrorMessage('');
    };

    const handleBetSubmission = () => {
        const betAmountNumber = parseFloat(betAmount);
    
        // Verifica si el monto de la apuesta es válido
        if (isNaN(betAmountNumber) || betAmountNumber <= 0) {
            setErrorMessage('Por favor, ingrese un monto válido.');
            return;
        }
    
        // Verifica si el monto de la apuesta es menor al precio actual de la subasta
        if (auction && betAmountNumber < auction.price) {
            setErrorMessage('La apuesta no puede ser menor al precio actual de la subasta.');
            return;
        }
    
        // Verifica si el monto de la apuesta supera el saldo disponible del usuario
        if (betAmountNumber > user.coins) {
            setErrorMessage('No tiene saldo suficiente para realizar esta apuesta.');
            return;
        }
    
        // Construye el cuerpo de la solicitud con los datos de la apuesta
        const betData = {
            amount: betAmountNumber,
            FK_Client: user.id,
            FK_Auction: auction.id,
            modality: isAutomatic ? 2 : 1,
        };
    
        // Envía la apuesta a tu API
        fetch('http://localhost:3000/api/bets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(betData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('La apuesta no se pudo realizar');
            }
            return response.json();
        })
        .then(data => {
            console.log('Apuesta creada con éxito', data);
            // Limpia el monto de la apuesta después de enviar
            setBetAmount('');
        })
        .catch(error => {
            console.error('Error al crear la apuesta:', error);
        });
    };

    const toggleAutomaticMode = () => {
        setIsAutomatic(!isAutomatic);
    };

    return (
        <div className='bc-card'>
            <div className='bc-card-input'>
                <button
                    className={`bc-btn-bet-automatic ${isAutomatic ? 'active' : ''}`}
                    onClick={toggleAutomaticMode}
                >
                    Automático
                </button>
                <input

                    type="number"
                    value={betAmount}
                    onChange={(e) => handleSetBetAmount(e.target.value)}
                    placeholder="Monto a apostar"
                />
                <button className='bc-btn-bet' onClick={handleBetSubmission}>Apostar</button>
            </div>
            
            {errorMessage && <div className="bc-error-message">{errorMessage}</div>} {/* Muestra el mensaje de error si existe */}

            <div className='bc-sal-quick'>
                <div className='bc-saldo'>
                    <span>Balance: ${user.coins.toFixed(2)}</span>
                </div>
                
                <div className='bc-quick-bets'>
                    {[10, 20, 50, 100].map((amount) => (
                        <button key={amount} onClick={() => handleSetBetAmount(amount.toString())}>
                            ${amount}
                        </button>
                    ))}
                </div>
            </div>
            
        </div>
    );
    
}