import { createContext, useState, useCallback, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar sesión desde localStorage al montar
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('authUser');
    
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error('Error al cargar sesión guardada:', err);
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
      }
    }
    setLoading(false);
  }, []);

  // Simular login con usuarios locales
  const login = useCallback(async (username, password) => {
    setError(null);
    setLoading(true);
    
    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Importar datos de usuarios
      const usersData = [
        {
          id: 1,
          username: "usuario1",
          email: "usuario1@example.com",
          password: "password123",
          fullName: "Usuario Demo"
        },
        {
          id: 2,
          username: "chef",
          email: "chef@example.com",
          password: "chef123",
          fullName: "Chef Principal"
        },
        {
          id: 3,
          username: "admin",
          email: "admin@example.com",
          password: "admin123",
          fullName: "Administrador"
        }
      ];
      
      const foundUser = usersData.find(
        u => u.username === username && u.password === password
      );
      
      if (!foundUser) {
        throw new Error('Usuario o contraseña incorrectos');
      }
      
      // Generar Bearer Token simulado
      const generatedToken = `Bearer_${foundUser.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const userData = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        fullName: foundUser.fullName
      };
      
      // Guardar en state
      setToken(generatedToken);
      setUser(userData);
      
      // Persistir en localStorage
      localStorage.setItem('authToken', generatedToken);
      localStorage.setItem('authUser', JSON.stringify(userData));
      
      return { success: true, user: userData };
    } catch (err) {
      const errorMessage = err.message || 'Error al iniciar sesión';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setError(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  }, []);

  // Verificar si está autenticado
  const isAuthenticated = useCallback(() => {
    return !!token && !!user;
  }, [token, user]);

  // Obtener datos protegidos (simulado)
  const getProtectedData = useCallback(async () => {
    if (!token) {
      throw new Error('No autenticado');
    }
    
    setLoading(true);
    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Retornar datos protegidos
      return {
        message: `Datos protegidos para ${user.fullName}`,
        user: user,
        timestamp: new Date().toISOString(),
        data: {
          favoritos: 5,
          recetasGuardadas: 12,
          ultimaVisita: new Date().toISOString()
        }
      };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token, user]);

  const value = {
    user,
    token,
    loading,
    error,
    login,
    logout,
    isAuthenticated,
    getProtectedData,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
