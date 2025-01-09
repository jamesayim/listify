import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from '../server/authForm.js';
import MainApp from '../client/app.js';
import ProtectedRoute from './protectedRoute.js';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<AuthForm isLogin={true} />} />
                <Route path="/register" element={<AuthForm isLogin={false} />} />
                <Route
                    path="/app"
                    element={
                        <ProtectedRoute>
                            <MainApp />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
