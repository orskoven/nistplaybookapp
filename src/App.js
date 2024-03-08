import React from 'react';
import './App.css';
import NavbarMain from './ui/NavbarMain';
import Overview from './ui/Overview'; // Adjust the import path as necessary
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <NavbarMain />
      <Routes>
        <Route path="/" element={<Overview />} />
        {/* Define additional routes here */}
      </Routes>
    </>
  );
}

export default App;
