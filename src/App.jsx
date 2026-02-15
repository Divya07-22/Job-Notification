import './styles.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Saved from './pages/Saved'
import Digest from './pages/Digest'
import Settings from './pages/Settings'
import Proof from './pages/Proof'

import TestChecklist from './pages/TestChecklist'
import Ship from './pages/Ship'

function App() {
    return (
        <BrowserRouter>
            <div className="page-container">
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/saved" element={<Saved />} />
                    <Route path="/digest" element={<Digest />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/proof" element={<Proof />} />
                    <Route path="/jt/07-test" element={<TestChecklist />} />
                    <Route path="/jt/08-ship" element={<Ship />} />
                    <Route path="/jt/proof" element={<Proof />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
