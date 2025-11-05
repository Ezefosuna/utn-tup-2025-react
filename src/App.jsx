import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import RecetaPage from './pages/receta'
import ObjectsPage from './pages/objects'
import LoginPage from './pages/login'
import DashboardPage from './pages/dashboard'
import { useAuth } from './contexts/AuthContext'

function App() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Router>
      <div>
        <nav style={{ 
          padding: '20px', 
          borderBottom: '1px solid #ccc',
          marginBottom: '20px',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <Link 
              to="/objects" 
              style={{ 
                marginRight: '20px', 
                textDecoration: 'none',
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                borderRadius: '4px'
              }}
            >
              Objects
            </Link>
            <Link 
              to="/receta"
              style={{ 
                marginRight: '20px',
                textDecoration: 'none',
                padding: '8px 16px',
                backgroundColor: '#28a745',
                color: 'white',
                borderRadius: '4px'
              }}
            >
              Receta
            </Link>
            <Link 
              to="/login"
              style={{ 
                marginRight: '20px',
                textDecoration: 'none',
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                borderRadius: '4px'
              }}
            >
              Login
            </Link>
            {isAuthenticated && (
              <Link 
                to="/dashboard"
                style={{ 
                  textDecoration: 'none',
                  padding: '8px 16px',
                  backgroundColor: '#ff9800',
                  color: 'white',
                  borderRadius: '4px'
                }}
              >
                Dashboard
              </Link>
            )}
          </div>
          {isAuthenticated && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '14px', color: '#333' }}>
                👤 {user?.username}
              </span>
            </div>
          )}
        </nav>
        
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/objects" element={<ObjectsPage />} />
          <Route path="/receta" element={<RecetaPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
