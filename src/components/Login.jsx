import { useState } from 'react';
import { Link,useNavigate  } from 'react-router-dom'; // Ensure to import Link from 'react-router-dom'
import './src/Login.css'; // Ensure you have this CSS file in the same folder as your component

export function Login() {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate(); // Hook para navegar

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(loginData);

        if (loginData.username.toLowerCase().startsWith('admin')) {
            fetch('http://localhost:3000/api/admin-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            })
            .then(response => {
                if (!response.ok) {
                    // Si la respuesta no es OK, lanza un error que será capturado por .catch()
                    throw new Error('Login failed');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                // Aquí puedes añadir más validaciones según la estructura de tu respuesta
                if (data && data.admin) { // Asegúrate de que la respuesta contenga los datos esperados
                    console.log('Login successful', data);
                    navigate('/adm-main', { state: { adminData: data.admin } }); // Usa los datos reales del cliente
                } else {
                    // Si los datos del cliente no están presentes, maneja el caso como un error o inicio de sesión fallido
                    console.error('Login failed: No admin data');
                }
            })
            .catch(error => {
                console.error('Login failed', error);
                // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
            });
            
        }else{
            fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            })
            .then(response => {
                if (!response.ok) {
                    // Si la respuesta no es OK, lanza un error que será capturado por .catch()
                    throw new Error('Login failed');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                // Aquí puedes añadir más validaciones según la estructura de tu respuesta
                if (data && data.client) { // Asegúrate de que la respuesta contenga los datos esperados
                    console.log('Login successful', data);
                    navigate('/auction', { state: { clientData: data.client } }); // Usa los datos reales del cliente
                } else {
                    // Si los datos del cliente no están presentes, maneja el caso como un error o inicio de sesión fallido
                    console.error('Login failed: No client data');
                }
            })
            .catch(error => {
                console.error('Login failed', error);
                // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
            });

        }
    
        
    };
    
    return (
        <div className="lg-wrapper">
            <div className="lg-container">
                <h2 className='lg-title'>Log in</h2>
                <form onSubmit={handleSubmit}>
                    <div className="lg-form-group">
                        <label htmlFor="username">Username or Email</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={loginData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="lg-form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={loginData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className='lg-btn' type="submit">Login</button>
        
                    <div className="lg-register-link">
                        <p>Don't have an account? <Link to="/register">Register here</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
