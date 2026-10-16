import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Homepage } from './api/pages/Homepage';
import { TaskForm } from './api/pages/TaskForm';

export function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/nuevo" element={<TaskForm />} />
                    <Route path="/editar/:id" element={<TaskForm />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;