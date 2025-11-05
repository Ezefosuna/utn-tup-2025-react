import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Simulación de credenciales válidas
const VALID_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Al cargar, verificar si hay un token guardado en localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Función de login que simula llamar al endpoint
  const login = async (username, password) => {
    try {
      setError(null);
      setLoading(true);

      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 800));

      // Validar credenciales
      if (username !== VALID_CREDENTIALS.username || password !== VALID_CREDENTIALS.password) {
        throw new Error('Usuario o contraseña incorrectos');
      }

      // Simular llamada al endpoint de login
      const response = await fetch('/src/data/login.json');
      
      if (!response.ok) {
        throw new Error('Error al conectar con el servidor');
      }

      const data = await response.json();

      if (data.success) {
        // Guardar token y usuario
        setToken(data.token);
        setUser(data.user);
        
        // Persistir en localStorage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('authUser', JSON.stringify(data.user));

        return { success: true, user: data.user };
      } else {
        throw new Error('Error en la autenticación');
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Función de logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  // Función para hacer peticiones a endpoints protegidos
  const fetchProtectedData = async () => {
    try {
      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 500));

      // En una aplicación real, aquí se enviaría el token en el header
      // headers: { 'Authorization': `Bearer ${token}` }
      const response = await fetch('/src/data/protected-data.json');

      if (!response.ok) {
        throw new Error('Error al obtener datos protegidos');
      }

      const data = await response.json();
      
      // Validar que el token esté presente (simulación)
      if (!token) {
        throw new Error('Token no válido o expirado');
      }

      return { success: true, data: data.data };
    } catch (err) {
      console.error('Error al obtener datos protegidos:', err);
      return { success: false, error: err.message };
    }
  };

  const value = {
    user,
    token,
    loading,
    error,
    login,
    logout,
    fetchProtectedData,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

