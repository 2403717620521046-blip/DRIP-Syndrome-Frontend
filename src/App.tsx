import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Dataset from './pages/Dataset';
import EDA from './pages/EDA';
import Predictions from './pages/Predictions';
import Models from './pages/Models';
import Clustering from './pages/Clustering';
import AssociationRules from './pages/AssociationRules';
import About from './pages/About';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page (Public Hero & Presentation) */}
        <Route path="/" element={<Home />} />

        {/* Application Workspace Routes (Sidebar + Navbar Shell) */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dataset" element={<Dataset />} />
          <Route path="/eda" element={<EDA />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/models" element={<Models />} />
          <Route path="/clustering" element={<Clustering />} />
          <Route path="/association-rules" element={<AssociationRules />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* Catch-all redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
