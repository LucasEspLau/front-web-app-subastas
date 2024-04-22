import { useEffect, useState } from "react";
import { useMain } from "../service/MainProvider";
import './src/ProductListAdm.css'
export function ProductListAdm() {
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({ name: '', imageUrl: '', newImage: null });
    const { updateCount } = useMain(); // Utiliza el hook useMain para acceder a updateCount

    // Definir fetchProducts en el ámbito superior para que sea accesible globalmente en este componente
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

    useEffect(() => {
        fetchProducts();
    }, [updateCount]);

    const handleEdit = (product) => {
        setEditingProductId(product.id);
        setEditedProduct({ name: product.name, imageUrl: product.imageUrl, newImage: null });
    };

    const handleChange = (e, field) => {
        setEditedProduct({ ...editedProduct, [field]: e.target.value });
    };

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            setEditedProduct({ ...editedProduct, newImage: e.target.files[0] });
        }
    };

    const handleSave = async (id) => {
        const formData = new FormData();
        formData.append('name', editedProduct.name);
        if (editedProduct.newImage) {
            formData.append('image', editedProduct.newImage); // Asegúrate de que 'image' sea el nombre esperado en el backend
        } else {
            // Si no hay una nueva imagen, incluye el imageUrl existente en el formData
            formData.append('imageUrl', editedProduct.imageUrl);
        }
    
        try {
            const response = await fetch(`http://localhost:3000/api/products/${id}`, {
                method: 'PUT',
                body: formData, // No necesitas especificar el 'Content-Type' cuando trabajas con FormData, el navegador lo hará por ti.
            });
    
            if (!response.ok) {
                throw new Error('Failed to update the product');
            }
    
            // Recargar los productos para reflejar los cambios
            
            await fetchProducts();
            console.log('Correct update')
            setEditingProductId(null); // Salir del modo de edición
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };
    

    return (
        <div>
            <h2>Product List</h2>
            <ul className="pla-ul">
                {products.map((product) => (
                    <li className="pla-li" key={product.id}>
                        {editingProductId === product.id ? (
                            <div className="pla-div-form">
                                <input
                                    className="pla-input-name"
                                    type="text"
                                    value={editedProduct.name}
                                    onChange={(e) => handleChange(e, 'name')}
                                />
                                <input
                                    className="pla-input-img"
                                    type="file"
                                    onChange={handleImageChange}
                                />
                                <button onClick={() => handleSave(product.id)}>Save</button>
                            </div>
                        ) : (
                            <div className="pla-div-show">
                                <h3>{product.name}</h3>
                                <div className="pla-div-show-sub">
                                    <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '100px' }} />
                                    <button onClick={() => handleEdit(product)}>Edit</button>
                                </div>
                                
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
