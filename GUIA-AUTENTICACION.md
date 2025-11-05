# Guía de Sistema de Autenticación con Context API

## 📋 Descripción General

Este sistema implementa un flujo completo de autenticación utilizando React Context API, simulando endpoints externos mediante archivos JSON locales. El sistema incluye:

- ✅ Login con usuario y contraseña
- ✅ Generación y uso de Bearer Token
- ✅ Protección de rutas
- ✅ Endpoint protegido que requiere autenticación
- ✅ Persistencia de sesión con localStorage
- ✅ Interfaz moderna con Material-UI

---

## 🗂️ Estructura de Archivos

```
src/
├── contexts/
│   └── AuthContext.jsx          # Context de autenticación
├── pages/
│   ├── login.jsx                # Página de login
│   └── dashboard.jsx            # Página protegida (dashboard)
├── data/
│   ├── login.json               # Mock endpoint de login
│   └── protected-data.json      # Mock endpoint protegido
└── main.jsx                     # Configuración del AuthProvider
```

---

## 🔐 Credenciales de Prueba

Para probar el sistema de autenticación, utiliza las siguientes credenciales:

- **Usuario:** `admin`
- **Contraseña:** `admin123`

---

## 📁 Archivos JSON (Mock Endpoints)

### 1. `/src/data/login.json`
Simula la respuesta de un endpoint de login:

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123456",
    "username": "admin",
    "email": "admin@example.com",
    "roles": ["admin", "user"]
  },
  "expiresIn": 3600
}
```

### 2. `/src/data/protected-data.json`
Simula la respuesta de un endpoint protegido:

```json
{
  "success": true,
  "message": "Acceso autorizado al recurso protegido",
  "data": {
    "userProfile": { ... },
    "stats": { ... },
    "recentActivity": [ ... ]
  }
}
```

---

## 🔧 AuthContext - Context Provider

### Ubicación: `/src/contexts/AuthContext.jsx`

### Funcionalidades Principales

#### 1. **Estado del Contexto**
```javascript
{
  user,              // Datos del usuario autenticado
  token,             // Bearer token
  loading,           // Estado de carga
  error,             // Mensajes de error
  isAuthenticated,   // Booleano de autenticación
  login,             // Función para iniciar sesión
  logout,            // Función para cerrar sesión
  fetchProtectedData // Función para llamar endpoints protegidos
}
```

#### 2. **Función `login(username, password)`**
Simula la llamada a un endpoint de login:

```javascript
const login = async (username, password) => {
  // 1. Valida credenciales
  // 2. Simula delay de red (800ms)
  // 3. Llama al mock endpoint /src/data/login.json
  // 4. Guarda token y usuario en estado y localStorage
  // 5. Retorna resultado { success, user } o { success, error }
}
```

**Proceso:**
1. ✅ Validación de credenciales contra constantes
2. ✅ Simulación de delay de red
3. ✅ Fetch al archivo JSON local
4. ✅ Almacenamiento en estado y localStorage
5. ✅ Manejo de errores

#### 3. **Función `logout()`**
Limpia la sesión:
```javascript
const logout = () => {
  setToken(null);
  setUser(null);
  localStorage.removeItem('authToken');
  localStorage.removeItem('authUser');
}
```

#### 4. **Función `fetchProtectedData()`**
Simula llamada a endpoint protegido con Bearer Token:

```javascript
const fetchProtectedData = async () => {
  // 1. Verifica que exista token
  // 2. Simula delay de red (500ms)
  // 3. Llama al mock endpoint /src/data/protected-data.json
  // 4. En producción, aquí se enviaría el token en el header:
  //    headers: { 'Authorization': `Bearer ${token}` }
  // 5. Retorna datos o error
}
```

#### 5. **Persistencia de Sesión**
Al cargar la aplicación, el contexto verifica si hay un token guardado:

```javascript
useEffect(() => {
  const storedToken = localStorage.getItem('authToken');
  const storedUser = localStorage.getItem('authUser');
  
  if (storedToken && storedUser) {
    setToken(storedToken);
    setUser(JSON.parse(storedUser));
  }
  setLoading(false);
}, []);
```

---

## 📄 Páginas

### 1. Login Page (`/src/pages/login.jsx`)

**Ruta:** `/login` o `/` (homepage)

**Características:**
- ✅ Formulario con campos de usuario y contraseña
- ✅ Validación de campos
- ✅ Mensajes de error
- ✅ Loading state durante autenticación
- ✅ Redirección automática al dashboard si ya está autenticado
- ✅ Interfaz moderna con Material-UI

**Flujo:**
1. Usuario ingresa credenciales
2. Al hacer submit, llama `login(username, password)`
3. Si es exitoso, redirige a `/dashboard`
4. Si falla, muestra mensaje de error

**Código clave:**
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  const result = await login(username, password);
  
  if (result.success) {
    navigate('/dashboard');
  } else {
    setLocalError(result.error);
  }
};
```

### 2. Dashboard Page (`/src/pages/dashboard.jsx`)

**Ruta:** `/dashboard`

**Características:**
- ✅ Ruta protegida (requiere autenticación)
- ✅ Muestra datos del usuario autenticado
- ✅ Llama a endpoint protegido usando Bearer Token
- ✅ Muestra estadísticas y datos protegidos
- ✅ Botón de logout
- ✅ Botón para recargar datos del endpoint protegido

**Protección de Ruta:**
```javascript
useEffect(() => {
  if (!isAuthenticated) {
    navigate('/login');
  }
}, [isAuthenticated, navigate]);
```

**Carga de Datos Protegidos:**
```javascript
useEffect(() => {
  const loadProtectedData = async () => {
    const result = await fetchProtectedData();
    if (result.success) {
      setProtectedData(result.data);
    }
  };
  
  if (isAuthenticated) {
    loadProtectedData();
  }
}, [isAuthenticated, fetchProtectedData]);
```

---

## 🚀 Configuración en la Aplicación

### `/src/main.jsx`
El `AuthProvider` envuelve toda la aplicación:

```javascript
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
```

### `/src/App.jsx`
Utiliza el hook `useAuth()` para mostrar información del usuario:

```javascript
function App() {
  const { isAuthenticated, user } = useAuth();
  
  return (
    <Router>
      <nav>
        {/* Links de navegación */}
        {isAuthenticated && (
          <Link to="/dashboard">Dashboard</Link>
        )}
        {isAuthenticated && (
          <span>👤 {user?.username}</span>
        )}
      </nav>
      
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Otras rutas */}
      </Routes>
    </Router>
  );
}
```

---

## 🔄 Flujo Completo de Autenticación

### 1. **Login**
```
Usuario ingresa credenciales
         ↓
  login(username, password)
         ↓
Validación de credenciales
         ↓
  Fetch a /src/data/login.json
         ↓
Guardar token y user en estado
         ↓
Persistir en localStorage
         ↓
  Redirigir a /dashboard
```

### 2. **Acceso a Datos Protegidos**
```
Usuario autenticado en /dashboard
         ↓
  fetchProtectedData()
         ↓
Verificar que existe token
         ↓
Fetch a /src/data/protected-data.json
(En producción: headers: { Authorization: Bearer ${token} })
         ↓
Mostrar datos protegidos
```

### 3. **Logout**
```
Usuario hace click en "Cerrar Sesión"
         ↓
     logout()
         ↓
Limpiar estado (token, user)
         ↓
Remover de localStorage
         ↓
  Redirigir a /login
```

---

## 🛡️ Seguridad y Mejores Prácticas

### ✅ Implementadas:
1. **Validación de credenciales** antes de hacer fetch
2. **Persistencia segura** en localStorage
3. **Protección de rutas** con redirección automática
4. **Manejo de errores** completo
5. **Loading states** para mejor UX
6. **Limpieza de sesión** al cerrar sesión

### 🔧 Para Producción:
En un entorno real, deberías:

1. **Endpoints reales:**
```javascript
const response = await fetch('https://api.example.com/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password })
});
```

2. **Bearer Token en headers:**
```javascript
const response = await fetch('https://api.example.com/protected', {
  headers: { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

3. **Refresh Tokens:**
```javascript
// Implementar lógica para renovar token cuando expire
const refreshToken = async () => {
  // Llamar a endpoint de refresh
  // Actualizar token en estado y localStorage
};
```

4. **HTTPS:** Siempre usar HTTPS en producción
5. **No guardar contraseñas:** Nunca almacenar contraseñas en localStorage
6. **Validación del lado del servidor:** Siempre validar en el backend
7. **Token expiration:** Implementar lógica de expiración
8. **Protección CSRF:** Implementar tokens CSRF si es necesario

---

## 📝 Uso del Hook `useAuth`

En cualquier componente, puedes acceder al contexto de autenticación:

```javascript
import { useAuth } from '../contexts/AuthContext';

function MiComponente() {
  const { 
    user,              // Datos del usuario
    token,             // Token JWT
    isAuthenticated,   // true/false
    login,             // Función login
    logout,            // Función logout
    fetchProtectedData,// Función para datos protegidos
    loading,           // Estado de carga
    error              // Mensajes de error
  } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Bienvenido, {user.username}</p>
      ) : (
        <p>Por favor, inicia sesión</p>
      )}
    </div>
  );
}
```

---

## 🎨 UI/UX Features

### Material-UI Components utilizados:
- ✅ `Container`, `Paper`, `Box` - Layout
- ✅ `TextField` - Inputs de formulario
- ✅ `Button` - Botones con loading states
- ✅ `Alert` - Mensajes de error
- ✅ `CircularProgress` - Indicadores de carga
- ✅ `Avatar`, `Chip` - Componentes de usuario
- ✅ `Card`, `Grid` - Tarjetas de estadísticas
- ✅ `List`, `ListItem` - Listas de actividad

### Características de UX:
- ✅ Loading states durante operaciones asíncronas
- ✅ Mensajes de error claros
- ✅ Validación de formularios
- ✅ Redirecciones automáticas
- ✅ Información de credenciales de prueba visible
- ✅ Confirmación visual de autenticación exitosa
- ✅ Diseño responsive

---

## 🧪 Cómo Probar

1. **Iniciar la aplicación:**
```bash
npm run dev
```

2. **Ir a `/login`** (o la homepage `/`)

3. **Ingresar credenciales:**
   - Usuario: `admin`
   - Contraseña: `admin123`

4. **Observar:**
   - Loading state durante login
   - Redirección a `/dashboard`
   - Datos protegidos cargados
   - Username en navbar
   - Link de "Dashboard" visible

5. **Probar endpoint protegido:**
   - Click en "Recargar Datos" en dashboard
   - Observar loading y actualización de datos

6. **Probar logout:**
   - Click en "Cerrar Sesión"
   - Observar redirección a `/login`
   - Verificar que el link "Dashboard" desaparece

7. **Probar persistencia:**
   - Hacer login
   - Recargar la página (F5)
   - Verificar que la sesión persiste

---

## 🔍 Depuración

### Verificar token en localStorage:
```javascript
// En la consola del navegador:
localStorage.getItem('authToken');
localStorage.getItem('authUser');
```

### Verificar estado del contexto:
```javascript
// Agregar en cualquier componente:
const auth = useAuth();
console.log('Auth State:', auth);
```

### Simular error de autenticación:
- Ingresa credenciales incorrectas
- Observa el mensaje de error

---

## 📚 Recursos Adicionales

- [React Context API](https://react.dev/reference/react/createContext)
- [React Router DOM](https://reactrouter.com/)
- [Material-UI](https://mui.com/)
- [JWT (JSON Web Tokens)](https://jwt.io/)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

## 🎯 Próximos Pasos (Mejoras Opcionales)

1. ✨ Agregar registro de usuarios
2. ✨ Implementar "Olvidé mi contraseña"
3. ✨ Agregar refresh tokens
4. ✨ Implementar roles y permisos más complejos
5. ✨ Agregar más rutas protegidas
6. ✨ Implementar interceptors de Axios para agregar token automáticamente
7. ✨ Agregar tests unitarios
8. ✨ Implementar 2FA (autenticación de dos factores)

---

## 🐛 Troubleshooting

### Problema: "useAuth debe ser usado dentro de un AuthProvider"
**Solución:** Verifica que `<AuthProvider>` esté envolviendo tu aplicación en `main.jsx`

### Problema: Los datos no persisten al recargar
**Solución:** Verifica que localStorage no esté bloqueado en tu navegador

### Problema: No se puede acceder a /dashboard sin login
**Solución:** Esto es correcto, es una ruta protegida. Debes hacer login primero.

### Problema: "Error al conectar con el servidor"
**Solución:** Verifica que los archivos JSON existan en `/src/data/`

---

¡Sistema de autenticación completo y funcional! 🎉

