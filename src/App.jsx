// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BoxAuction } from './components/BoxAuction';
import {Register} from'./components/Register';
import {Login} from './components/Login'
import { MainProvider } from './service/MainProvider';
import { AuctionProvider } from './service/AuctionProvide';
import './App.css';
import { AdminMain } from './components/AdminMain';
import { AdminAuction } from './components/AdminAuction';
import { AdminProduct } from './components/AdminProduct';

function App() {
    return (
        <MainProvider>
            <Router>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/auction" element={ <BoxAuction />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/adm-main" element={<AdminMain />} />
                    <Route path="/adm-auction" element={<AdminAuction />} />
                    <Route path="/adm-product" element={<AdminProduct />} />
                </Routes>
            </Router>
        </MainProvider>
    );
}

export default App;
