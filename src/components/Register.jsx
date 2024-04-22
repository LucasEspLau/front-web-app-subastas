import { useState } from 'react';
import { Link } from 'react-router-dom'; // Ensure to import Link from 'react-router-dom'
import './src/Register.css'; // Ensure you have this CSS file in the same folder as your component

export function Register() {
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(registerData);
        // Here you would add logic to send registration data to your backend
    };

    return (
        <div className="rg-wrapper">
            <div className="rg-container">
                <h2 className='rg-title'>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="rg-form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={registerData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="rg-form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={registerData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="rg-form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={registerData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className='rg-btn' type="submit">Register</button>
                    {/* Add link to go to login */}
                    <div className="rg-login-link">
                        <p>Already have an account? <Link to="/">Log in here</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
