import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage'
import Dashboard from './components/Dashboard/Dashboard'; 
import { SpaceForm } from './components/space/SpaceForm'

function App() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/space" element={<SpaceForm />} /> 
      </Routes>
    </Router>
	)
}

export default App
