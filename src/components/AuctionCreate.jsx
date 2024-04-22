import React, { useState, useEffect } from 'react';
import './src/AuctionCreate.css';

export function AuctionCreate() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [initialPrice, setInitialPrice] = useState('');
    const boxAuctionId = 1; // Asumiendo que este valor es constante

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleProductChange = (e) => {
        setSelectedProduct(e.target.value);
    };

    const handlePriceChange = (e) => {
        setInitialPrice(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Producto seleccionado:', selectedProduct);
        console.log('Precio inicial:', initialPrice);

        // Construye el objeto de datos para la subasta
        const auctionData = {
            FK_Product: selectedProduct,
            initialPrice: initialPrice,
            FK_Box_Auction: boxAuctionId,
        };

        // Envía los datos al backend para crear la subasta
        try {
            const response = await fetch('http://localhost:3000/api/auction-create', { // Asegúrate de que esta URL sea la correcta para tu endpoint de creación de subastas
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(auctionData),
            });

            if (!response.ok) {
                throw new Error('Error creating auction');
            }

            const result = await response.json();
            console.log('Subasta creada con éxito:', result);
            // Aquí podrías redirigir al usuario o mostrar algún mensaje de éxito
        } catch (error) {
            console.error('Error creating auction:', error);
        }
    };

    return (
        <form className='acr-form' onSubmit={handleSubmit}>
            <div className='acr-div-product'>
                <label htmlFor="product">Producto:</label>
                <select className='acr-select-product' id="product" value={selectedProduct} onChange={handleProductChange}>
                    <option value="">Selecciona un producto</option>
                    {products.map((product) => (
                        <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                </select>
            </div>
            <div className='acr-div-price'>
                <label htmlFor="initialPrice">Precio inicial:</label>
                <input
                    type="number"
                    id="initialPrice"
                    value={initialPrice}
                    onChange={handlePriceChange}
                    required
                />
            </div>
            <button type="submit">Crear Subasta</button>
        </form>
    );
}
