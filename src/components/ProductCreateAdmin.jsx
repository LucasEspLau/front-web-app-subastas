import React, { useState } from 'react';
import { useMain } from '../service/MainProvider';
import './src/ProductCreateAdmin.css'
export function ProductCreateAdmin() {
    const [productName, setProductName] = useState('');
    const [productImage, setProductImage] = useState(null);


    const handleNameChange = (e) => {
        setProductName(e.target.value);
    };

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            setProductImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', productName);
        if (productImage) {
            formData.append('image', productImage);
        }

        try {
            const response = await fetch('http://localhost:3000/api/product-create', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to create the product');
            }

            // Limpiar el formulario después de la creación exitosa
            setProductName('');
            setProductImage(null);

            // Opcionalmente, puedes recargar la lista de productos o hacer alguna otra acción aquí
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='pca-form'>
            <div>
                <label htmlFor="productName">Product Name:</label>
                <input
                    type="text"
                    id="productName"
                    value={productName}
                    onChange={handleNameChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="productImage">Product Image:</label>
                <input
                    type="file"
                    id="productImage"
                    onChange={handleImageChange}
                />
            </div>
            <button type="submit">Create Product</button>
        </form>
    );
}
