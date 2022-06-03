import React from 'react';
import './App.css';
import AddAccount from './Pages/AddAccount';
import Dashboard from './Pages/Dashboard';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App() {

  return (

    <Router>
      <ToastContainer  theme='dark' position='bottom-right'/>
      <Routes>
        <Route path="/" element={<Dashboard selectedTab="portal" />} />
        <Route path="/add-account" element={<AddAccount />} />
        <Route path="/portal" element={<Dashboard selectedTab="portal" />} />
        <Route path="/auto-apply" element={<Dashboard selectedTab="auto-apply" />} />
      </Routes>
    </Router>

  );
}


